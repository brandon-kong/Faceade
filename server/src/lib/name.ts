import type { Db } from 'mongodb';
import random_names from '../config/names.json';
import type { Socket } from 'socket.io';
import type { GameType } from '../game';

export const getRandomName = (): string =>
{
    return random_names[Math.floor(Math.random() * random_names.length)];
}

export const getNameFromSocket = (game: GameType, socket: Socket) => 
{
    const player = game.players.filter((player) => player.socket_id === socket.id)[0];

    if (!player) {
        return null;
    }

    return player.name;
}