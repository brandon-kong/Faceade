import { Chat } from '@/types';
import React, { useContext, createContext } from 'react';

export type GameContextType = {
    messages: Chat[];
    setMessages: React.Dispatch<React.SetStateAction<Chat[]>>;
   

    // Methods
    addMessage: (message: Chat) => void;

    // Properties

    // State
}

export const GameContext = createContext<GameContextType>({
    messages: [],
    addMessage: () => undefined,
    setMessages: () => undefined,
});

export const useGame = () => useContext(GameContext);