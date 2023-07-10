import React, { createContext, useState } from 'react';
import { io, Socket as IoClient } from 'socket.io-client';
import Socket from '../Socket';

import type { Game } from '@/types/Server';

type SocketContextProps = {}

export const SocketContext = createContext<SocketContextProps>({});

export const SocketProvider = ({ children }: any) => {

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    )
};