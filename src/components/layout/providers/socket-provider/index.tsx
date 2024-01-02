'use client';

import { registerEvents } from '@/lib/room/socket';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import type { Socket } from 'socket.io-client';
import { useLoading } from '../load-provider/context';
import { useGame } from '../game-provider/context';

import { Chat } from '@/types';
import type { DrawingAction } from '@/types';

type SocketContextType = {
    socket?: Socket;
    error?: string;
    isInRoom: boolean;

    // Methods
    connectSocket: () => Promise<Socket | undefined>;
    connectToSocket: (roomId: string) => void;
};

const SocketContext = createContext<SocketContextType>({
    isInRoom: false,
    connectSocket: () => new Promise<Socket | undefined>(() => undefined),
    connectToSocket: () => undefined,
});

export const useSocket = () => useContext(SocketContext);

type SocketProviderProps = {
    children?: React.ReactNode;
};

export type SocketEvents = {
    addMessage: (message: Chat) => void;
    setIsInRoom: (isInRoom: boolean) => void;
    setDrawingActions: (actions: DrawingAction[]) => void;
    addDrawingAction: (action: DrawingAction) => void;

    setIsHost: (isHost: boolean) => void;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }: SocketProviderProps) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [isInRoom, setIsInRoom] = useState<boolean>(false);

    const { addMessage, setDrawingActions, addDrawingAction, setIsHost } = useGame();

    // Only connect to the socket if we're on the client and they create/join a room

    const connectSocket = (): Promise<Socket | undefined> => {
        return new Promise<Socket | undefined>((resolve, reject) => {
            if (typeof window === 'undefined') return;

            if (socket) {
                resolve(socket);
                return;
            }

            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string, {
                forceNew: true,
                reconnection: true,
                reconnectionDelay: 5000,
                reconnectionAttempts: 10,
            });

            newSocket.on('connect_error', () => {
                setError('Failed to connect to socket. Retrying...');

                // After 5 seconds, try to reconnect until 10 attempts have been made

                let attempts = 0;

                const interval = setInterval(() => {
                    attempts++;

                    if (attempts > 10) {
                        clearInterval(interval);
                        setError('Failed to connect to socket. Please refresh the page.');

                        reject('Failed to connect to socket. Please refresh the page.');
                        return;
                    }

                    newSocket.connect();
                }, 5000);
            });

            setSocket(newSocket);

            // Pass utility functions to the socket to make it easier to use

            registerEvents(newSocket, {
                addMessage,
                setIsInRoom,
                setDrawingActions,
                addDrawingAction,
                setIsHost,
            });
            resolve(newSocket);
        });
    };

    const connectToSocket = (roomId: string) => {
        if (typeof window === 'undefined') return;

        setSocket(socket);
    };

    // Disconnect from the socket when the user leaves the page to prevent memory leaks

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                error,
                isInRoom,
                connectToSocket,
                connectSocket,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
