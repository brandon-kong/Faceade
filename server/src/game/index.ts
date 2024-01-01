import { ObjectId } from "mongodb";
import Player, { PlayerType } from "./players";
import { DrawingAction } from "./drawing";

type GameState = {
    started: boolean;
    view: string;
    isEditing: boolean;
}

export type Chat = {
    player: PlayerType;
    message: string;
}

export type GameType = {
    _id: ObjectId;
    game_code: string;
    game_id: string;
    host: PlayerType;
    players: PlayerType[];
    last_updated: Date;

    chat: Chat[];
    drawing: {
        actions: DrawingAction[];
    }
}

export default class Game
{
    _id: ObjectId;
    game_code: string;
    game_id: string;
    host: Player;
    players: Player[];
    last_updated: Date;

    state: GameState;

    chat: Chat[];
    drawing: {
        actions: DrawingAction[];
    };

    constructor(game_code: string, game_id: string, host: Player, players: Player[], last_updated: Date)
    {

        this._id = new ObjectId();
        this.game_code = game_code;
        this.game_id = game_id;
        this.host = host;
        this.players = players;
        this.last_updated = last_updated;

        this.state = {
            started: false,
            view: 'lobby',
            isEditing: true,
        };

        this.chat = [];
        this.drawing = {
            actions: [],
        };
    }

    serialize(): GameType
    {
        return {
            _id: this._id,
            game_code: this.game_code,
            game_id: this.game_id,
            host: this.host.serialize(),
            players: this.players.map(player => player.serialize()),
            last_updated: this.last_updated,
            chat: this.chat,
            drawing: {
                actions: [],
            },
        };
    }
}