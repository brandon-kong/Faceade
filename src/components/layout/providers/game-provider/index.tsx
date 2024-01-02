'use client';

import { Chat } from '@/types';
import React, { useState, useContext, createContext, useEffect } from 'react';

import { GameContext } from './context';
import type { DrawingAction } from '@/types';

type GameProviderProps = {
    children?: React.ReactNode;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }: GameProviderProps) => {
    const [messages, setMessages] = useState<Chat[]>([]);
    const [isHost, setIsHost] = useState<boolean>(false);
    const [drawingActions, setDrawingActions] = useState<DrawingAction[]>([]);

    const addMessage = (message: Chat) => {
        setMessages(prev => [...prev, message]);
    };

    const addDrawingAction = (action: DrawingAction) => {
        setDrawingActions(prev => [...prev, action]);
    };

    return (
        <GameContext.Provider
            value={{
                messages,
                drawing: {
                    actions: drawingActions,
                },
                isHost,

                setMessages,
                addMessage,
                setDrawingActions,
                addDrawingAction,

                setIsHost,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
