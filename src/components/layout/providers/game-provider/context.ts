import { Chat } from '@/types';
import React, { useContext, createContext } from 'react';
import { DrawingAction } from '../../game/canvas';

export type GameContextType = {
    messages: Chat[];
    setMessages: React.Dispatch<React.SetStateAction<Chat[]>>;
   
    drawing: {
        actions: DrawingAction[];
    }

    // Methods
    addMessage: (message: Chat) => void;
    
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
});

export const useGame = () => useContext(GameContext);