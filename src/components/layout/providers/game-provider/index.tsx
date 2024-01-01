'use client';

import { Chat } from '@/types';
import React, { useState, useContext, createContext, useEffect } from 'react';

import { GameContext } from './context';
import { DrawingAction } from '../../game/canvas';

type GameProviderProps = {
    children?: React.ReactNode;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }: GameProviderProps) => {
    const [messages, setMessages] = useState<Chat[]>([]);
    const [drawingActions, setDrawingActions] = useState<DrawingAction[]>([]);

    const addMessage = (message: Chat) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <GameContext.Provider
            value={{
                messages,
                drawing: {
                    actions: drawingActions,
                },
                setMessages,
                addMessage,
                setDrawingActions,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
