'use client';

import { createContext, useContext } from 'react';

export type LoadContextType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const LoadContext = createContext<LoadContextType>({
    loading: false,
    setLoading: () => undefined,
});

const useLoading = () => useContext(LoadContext);

export { LoadContext, useLoading };