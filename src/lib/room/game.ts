import type { DrawingAction } from '@/types';
import type { Socket } from 'socket.io-client';

export const createGame = (socket: Socket | undefined) => {
    if (socket) {
        socket.emit('create-game');
    } else {
        // handle error
        console.log('socket is not defined');
    }
};

export const joinGame = (socket: Socket | undefined, gameCode: string) => {
    if (socket) {
        socket.emit('join-game', gameCode);
    } else {
        // handle error
        console.log('socket is not defined');
    }
}

export const addDrawingAction = (socket: Socket | undefined, action: DrawingAction) => {
    if (socket) {
        socket.emit('drawing-action', action);
    } else {
        // handle error
        console.log('socket is not defined');
    }
};