import type { Socket } from 'socket.io-client';

export const sendMessage = (socket: Socket | undefined, message: string) => {
    if (socket) {
        socket.emit('chat-send', message);
    } else {
        // handle error
        console.log('socket is not defined');
    }
};
