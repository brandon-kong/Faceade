import type { Socket } from 'socket.io-client';

import { useSocket } from '@/components/layout/providers/socket-provider';

const registerEvents = (socket: Socket) => {
    socket.on('connect', () => {
        console.log(`connected to server with id ${socket.id}`);
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

export { registerEvents, createGame };
