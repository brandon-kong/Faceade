import type { Socket } from "socket.io";

export class Player {
    public socket: Socket;
    public socket_id: string;

    public game_id: string | null;

    constructor(socket: Socket) {
        this.socket = socket;
        this.socket_id = socket.id;

        this.game_id = null;    
    }

    public setGameId(game_id: string) {
        this.game_id = game_id;
    }

    public serialize() {
        return {
            socket_id: this.socket_id,
            game_id: this.game_id,
        }
    }
}