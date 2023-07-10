import { Game } from "@/types/Server";

export default class Socket {
    io: any = null;
    static game: Game | null = null;

}