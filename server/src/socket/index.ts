import type { Socket } from "socket.io";
import type { Db } from "mongodb";
import { removeInactiveGames } from "../lib/cleanup";
import { GameType } from "../game";

export const handleSocketDisconnect = (socket: Socket, db: Db) => {
    socket.on("disconnect", () => {
        // Remove the player from any games they were in
            
        db.collection<GameType>("games").updateOne({
            "players": {
                $elemMatch: {
                    socket_id: socket.id,
                },
            }
        }, {
            $pull: {
                players: {
                    socket_id: socket.id,
                },
            },
        });

        // Remove player from any games they were hosting, and replace them with a new host

        removeInactiveGames(db);
        
    });
}