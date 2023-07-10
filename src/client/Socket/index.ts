import { Game } from "@/types/Server";
import { Socket as SocketType} from "socket.io-client";
import { Player } from "@/types/Server";

export default class Socket {
    static io: SocketType | null = null;
    static Game: Game | null = {
        code: null,
        players: {},
        host_id: null,
        round: 0,
        status: "waiting",
        client_id: null,
        private: false,
        settings: {},
        words: []
    }
}