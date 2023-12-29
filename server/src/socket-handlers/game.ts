import type { Socket } from "socket.io";
import { generateGameCode, generateGameId, getPhraseFromCode } from "../lib/cryptography";

import { type Db } from "mongodb";
import { Player } from "../game/players";

export const handleGameCreate = (socket: Socket, db: Db) => {
    socket.on("create-game", () => {

        // If the player is already in a game, don't let them create a new one

        if (socket.rooms.size > 1) {
            return;
        }

        console.log(`Creating game for ${socket.id}`);

        const game_id = generateGameId();

        // Ensure that the game code is unique
        
        let game_code = generateGameCode();

        const phrase = getPhraseFromCode(game_code);

        console.log(`Game code: ${game_code}`);
        console.log(`Game code phrase: ${phrase}`);

        socket.join(game_id);

        // Create a new player instance

        const host = new Player(socket);
        host.setGameId(game_id);

        const host_data = host.serialize();

        // Save an instance of the game in the database

        db.collection("games").insertOne({
            game_id: game_id,
            game_code,
            players: [host_data],
            state: {
                started: false,
                view: 'lobby',
                isEditing: true,
            },
            settings: {
                custom_words: [],
                time_limit: 60,
                rounds: 6,
                max_players: 10,
            },
            host: host_data,
        });

        socket.emit("game-created", {
            game_id,
            game_code,
        });
    });
}