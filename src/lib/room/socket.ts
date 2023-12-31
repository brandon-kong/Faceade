import type { Socket } from 'socket.io-client';

import { useSocket } from '@/components/layout/providers/socket-provider';

type ErrorType = {
    reason: string;
}

const registerEvents = (socket: Socket) => {
    socket.on('connect', () => {
        console.log(`connected to server with id ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('disconnected from server');
    });

    // Error events

    socket.on('game-join-failed', (error: ErrorType) => {
        alert(error.reason);
    });

    socket.on('game-create-failed', (error: ErrorType) => {
        alert(error.reason);
    });
};

const createGame = (socket: Socket | undefined) => {
    if (socket) {
        socket.emit('create-game');
    } else {
        // handle error
        console.log('socket is not defined');
    }
};

const joinGame = (socket: Socket | undefined, gameCode: string) => {
    if (socket) {
        socket.emit('join-game', gameCode);
    } else {
        // handle error
        console.log('socket is not defined');
    }
}

export { registerEvents, createGame, joinGame };
