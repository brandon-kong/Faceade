import { Game } from "@/types/Server";
import { Socket as SocketType } from "socket.io-client";

export default class Socket {
    static io: SocketType | null = null;
    static game: Game | null = null;

}