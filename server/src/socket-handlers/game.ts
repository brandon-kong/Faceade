import type { Socket } from "socket.io";
import { generateGameCode, generateGameId, getPhraseFromCode } from "../lib/cryptography";

export const handleGameCreate = (socket: Socket) => {
    socket.on("create-game", () => {
        console.log(`Creating game for ${socket.id}`);

        const game_id = generateGameId();
        const game_code = generateGameCode();

        const phrase = getPhraseFromCode(game_code);

        console.log(`Game code: ${game_code}`);
        console.log(`Game code phrase: ${phrase}`);

        socket.join(game_id);

        socket.emit("game-created", {
            game_id,
            game_code,
        });
    });
}