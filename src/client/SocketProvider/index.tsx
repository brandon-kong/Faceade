import React, { createContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { Game } from '@/types/Server';

type SocketContextProps = {
    socket: Socket | null;
    game?: Game | null;
    setGame: (newGame: any) => void;
}

export const SocketContext = createContext<SocketContextProps>({
    socket: null,
    game: null,
    setGame: () => {},
});

export const SocketProvider = ({ children }: any) => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);
    const [game, setGame] = useState<any>(null);

    socket.on('connect', () => {
        //alert('connected to server')
    });

    return (
        <SocketContext.Provider value={{
            socket,
            game: game,
            setGame: (newGame: Game) => setGame(newGame),
        }}>
            {children}
        </SocketContext.Provider>
    )
};