import type { Socket } from "socket.io";
import type { Db } from "mongodb";

export const handleSocketDisconnect = (socket: Socket, db: Db) => {
    socket.on("disconnect", () => {
        // Remove the player from any games they were in
            
        db.collection("games").updateOne({
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

        db.collection("games").updateOne({
            "host.socket_id": socket.id,
        }, {
            $pull: {
                players: {
                    socket_id: socket.id,
                },
            },
            $set: {
                host: null,
            },
        });

        // Remove any games that are empty

        db.collection("games").deleteMany({
            players: {
                $size: 0,
            },
        });
    });
}