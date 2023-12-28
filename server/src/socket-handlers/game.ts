import type { Socket } from "socket.io";

export const handleGameCreate = (socket: Socket) => {
    socket.on("create-game", () => {
        console.log("create-game");
    });
}