import { Chat } from '@/types';
import React, { useContext, createContext } from 'react';
import type { DrawingAction } from '@/types';

export type GameContextType = {
    messages: Chat[];
    setMessages: React.Dispatch<React.SetStateAction<Chat[]>>;
   
    drawing: {
        actions: DrawingAction[];
    }

    // Methods
    addMessage: (message: Chat) => void;
    
    addDrawingAction: (action: DrawingAction) => void;
    setDrawingActions: React.Dispatch<React.SetStateAction<DrawingAction[]>>;

    // Properties

    // State
}

export const GameContext = createContext<GameContextType>({
    messages: [],
    drawing: {
        actions: [],
    },

    addMessage: () => undefined,
    setMessages: () => undefined,
    setDrawingActions: () => undefined,
    addDrawingAction: () => undefined,
});

export const useGame = () => useContext(GameContext);