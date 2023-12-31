import type { Socket } from "socket.io";

import { type Db } from "mongodb";
import Player from "../game/players";

import Debug from "../lib/debug";
import Game, { GameType } from "../game";

export const handlePlayerChat = (socket: Socket, db: Db) => {
    socket.on("chat-send", (message: string) => {
        Debug.log(`Player ${socket.id} sent message: ${message}`);

        // Check if player is in a game

        if (socket.rooms.size === 1) {
            Debug.log(`Player ${socket.id} is not in a game`);
            
            socket.emit("chat-send-failed", {
                reason: "Not in a game",
            });

            return;
        }

        // Get the game_id from the socket's rooms

        const game_id = Array.from(socket.rooms)[1];

        if (!socket.rooms.has(game_id)) {
            Debug.log(`Player ${socket.id} is not in game ${game_id}`);
            
            socket.emit("chat-send-failed", {
                reason: "Not in this game",
            });

            return;
        }

        // Get the game from the database

        db.collection<GameType>("games").findOne({
            game_id,
        }).then((game) => {
            if (!game) {
                Debug.log(`Game ${game_id} not found`);
                return;
            }

            // Find the player in the game

            const player = game.players.find((player) => player.socket_id === socket.id);

            if (!player) {
                Debug.log(`Player ${socket.id} not found in game ${game_id}`);
                return;
            }

            Debug.log(`Player ${player.name} sent message: ${message}`);
            

            // Add the message to the game's chat

            game.chat.push({
                player,
                message,
            });

            // Update the game in the database

            db.collection<GameType>("games").updateOne({
                game_id,
            }, {
                $set: {
                    chat: game.chat,
                },
            }).then(() => {
                Debug.log(`Game ${game_id} updated`);
                
                const name = player.name;
                // Broadcast the message to all the players in the room
                socket.to(game_id).emit("player-chatted", {
                    name,
                    message,
                });
            }).catch((err) => {
                Debug.log(`Error updating game ${game_id}: ${err}`);

                socket.emit("chat-send-failed", {
                    reason: "Error updating game",
                });

                return;
            });

        }).catch((err) => {
            Debug.log(`Error finding game ${game_id}: ${err}`);

            socket.emit("chat-send-failed", {
                reason: "Error finding game",
            });
        });
    });
}