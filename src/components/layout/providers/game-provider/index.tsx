'use client';

import { Chat } from '@/types';
import React, { useState, useContext, createContext, useEffect } from 'react';

import { GameContext } from './context';

type GameProviderProps = {
    children?: React.ReactNode;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }: GameProviderProps) => {
    const [messages, setMessages] = useState<Chat[]>([]);

    const addMessage = (message: Chat) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <GameContext.Provider
            value={{
                messages,
                setMessages,
                addMessage,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
