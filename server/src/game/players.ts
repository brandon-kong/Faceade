import { getRandomName } from "../lib/name";

export type PlayerType = {
    socket_id: string;
    name: string;
    game_id: string;
    score: number;
    is_host: boolean;
}

export default class Player
{
    socket_id: string;
    name: string;
    game_id: string;
    score: number;
    is_host: boolean;

    constructor(socket_id: string, game_id: string, score: number, is_host: boolean, name: string = getRandomName())
    {
        this.socket_id = socket_id;
        this.game_id = game_id;
        this.score = score;
        this.is_host = is_host;
        this.name = name;
    }

    serialize(): PlayerType
    {
        return {
            socket_id: this.socket_id,
            name: this.name,
            game_id: this.game_id,
            score: this.score,
            is_host: this.is_host,
        };
    }
}
