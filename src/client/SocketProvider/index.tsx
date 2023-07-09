import React, { createContext, useState } from 'react';
import { io, Socket as IoClient } from 'socket.io-client';
import Socket from '../Socket';

import type { Game } from '@/types/Server';

type SocketContextProps = {
    socket: IoClient | null;
    game?: Game | null;
}

export const SocketContext = createContext<SocketContextProps>({
    socket: null,
    game: null,
});

export const SocketProvider = ({ children }: any) => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
    const game = Socket.game;

    socket.on('connect', () => {
        //alert('connected to server')
    });

    return (
        <SocketContext.Provider value={{
            socket,
            game: game,
        }}>
            {children}
        </SocketContext.Provider>
    )
};