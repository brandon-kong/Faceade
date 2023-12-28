import type { Socket } from "socket.io";

export const handleSocketDisconnect = (socket: Socket) => {
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
}