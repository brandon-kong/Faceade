import { Game } from "@/types/Server";

export default class Socket {
    io: any = null;
    game: Game | null = null;
    static game: Game;

}