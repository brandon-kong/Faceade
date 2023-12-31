import type { Socket } from "socket.io";
import { generateGameCode, generateGameId, getPhraseFromCode } from "../lib/cryptography";

import { type Db } from "mongodb";
import Player from "../game/players";

import Debug from "../lib/debug";
import Game, { GameType } from "../game";

export const handleGameCreate = (socket: Socket, db: Db) => {
    socket.on("create-game", () => {

        // If the player is already in a game, don't let them create a new one

        if (socket.rooms.size > 1) {
            socket.emit("game-create-failed", {
                reason: "Already in a game",
            });
        }

        Debug.log(`Creating game for ${socket.id}`);

        const game_id = generateGameId();

        // Ensure that the game code is unique
        
        let game_code = generateGameCode();

        const phrase = getPhraseFromCode(game_code);

        Debug.log(`Game code: ${game_code}`);
        Debug.log(`Game code phrase: ${phrase}`);

        socket.join(game_id);

        // Create a new player instance

        const host = new Player(socket.id, game_id, 0, true);
        const game = new Game(game_code, game_id, host, [host], new Date());
        
        const game_data = game.serialize();

        // Save an instance of the game in the database

        db.collection<GameType>("games").insertOne(game_data).then(() => {
            Debug.log(`Game ${game_id} created`);

            socket.emit("game-created", {
                game_id,
                game_code,
            });
        }).catch((err) => {
            Debug.log(`Error creating game: ${err}`);
            // Send an error message to the client

            socket.emit("game-create-failed", {
                reason: "Failed to create game",
            });
        });

        socket.emit("game-created", {
            game_id,
            game_code,
        });
    });
}

export const handleGameJoin = (socket: Socket, db: Db) => {
    socket.on("join-game", async (game_code: string) => {
            
        // If the player is already in a game, don't let them join a new one

        if (socket.rooms.size > 1) {
            socket.emit("game-join-failed", {
                reason: "Already in a game",
            });
            return;
        }

        // Find the game with the given code

        const game = await db.collection<GameType>("games").findOne({
            game_code,
        });

        if (!game) {
           // Create a new game with the given code

            Debug.log(`Game ${game_code} does not exist, creating...`);

            const game_id = generateGameId();

            const host = new Player(socket.id, game_id, 0, true);
            const game = new Game(game_code, game_id, host, [host], new Date());

            const game_data = game.serialize();

            // Save an instance of the game in the database

            db.collection<GameType>("games").insertOne(game_data).then(() => {
                Debug.log(`Game ${game_id} created`);

                socket.emit("game-created", {
                    game_id,
                    game_code,
                });
            }).catch((err) => {
                Debug.log(`Error creating game: ${err}`);
                // Send an error message to the client

                socket.emit("game-create-failed", {
                    reason: "Failed to create game",
                });
            });
        }
        else {

            // If the game code is empty, join a random game

            if (game_code === "") {
                Debug.log("Joining random game...");

                // Find any game
                // In the future, this should find a game with the fewest players that isn't private

                const game = await db.collection<GameType>("games").findOne({
                    "players.length": {
                        $size: {
                            $gt: 0,
                        },
                    },
                });

                if (!game) {
                    Debug.log("No games found");
                    socket.emit("game-join-failed", {
                        reason: "No games found",
                    });
                    return;
                }

                game_code = game.game_code;

                Debug.log(`Joining game ${game_code}`);

                // Join the game

                socket.join(game.game_id);

                // Create a new player instance

                const player = new Player(socket.id, game.game_id, 0, false);

                // Add the player to the game

                // Handle errors with database

                db.collection("games").updateOne({
                    game_id: game.game_id,
                }, {
                    $push: {
                        players: player.serialize(),
                    },
                }).then(() => {
                    Debug.log(`Player ${socket.id} joined game ${game.game_id}`);
                }).catch((err) => {
                    Debug.log(`Error joining game: ${err}`);
                    // Send an error message to the client

                    socket.emit("game-join-failed", {
                        reason: "Failed to join game",
                    });
                    
                    // Force the client to leave the game
                    socket.leave(game.game_id);

                    return;
                });

                socket.emit("game-joined", {
                    game_id: game.game_id,
                });
            }

            // Join the game

            socket.join(game.game_id);

            // Create a new player instance

            const player = new Player(socket.id, game.game_id, 0, false);
            const player_data = player.serialize();

            // Add the player to the game

            // Handle errors with database
            db.collection("games").updateOne({
                game_id: game.game_id,
            }, {
                $push: {
                    players: player_data,
                },
            }).then(() => {
                Debug.log(`Player ${socket.id} joined game ${game.game_id}`);
            }).catch((err) => {
                Debug.log(`Error joining game: ${err}`);
                // Send an error message to the client

                socket.emit("game-join-failed", {
                    reason: "Failed to join game",
                });
                
                // Force the client to leave the game
                socket.leave(game.game_id);

                return;
            });

            socket.emit("game-joined", {
                game_id: game.game_id,
            });
        }
    });
}

export default function registerGameEvents(socket: Socket, db: Db) {
    handleGameCreate(socket, db);
    handleGameJoin(socket, db);
}