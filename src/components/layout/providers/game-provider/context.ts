import { Chat } from '@/types';
import React, { useContext, createContext } from 'react';
import type { DrawingAction } from '@/types';

export type GameContextType = {
    messages: Chat[];
    setMessages: React.Dispatch<React.SetStateAction<Chat[]>>;

    drawing: {
        actions: DrawingAction[];
    };

    isHost: boolean;

    // Methods
    addMessage: (message: Chat) => void;

    addDrawingAction: (action: DrawingAction) => void;
    setDrawingActions: React.Dispatch<React.SetStateAction<DrawingAction[]>>;

    setIsHost: (isHost: boolean) => void;
    // Properties

    // State
};

export const GameContext = createContext<GameContextType>({
    messages: [],
    drawing: {
        actions: [],
    },
    isHost: false,

    addMessage: () => undefined,
    setMessages: () => undefined,
    setDrawingActions: () => undefined,
    addDrawingAction: () => undefined,

    setIsHost: () => undefined,
});

export const useGame = () => useContext(GameContext);
