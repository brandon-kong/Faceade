'use client';

import React, { createContext, useContext, useState } from 'react';
import GalleryView from '../../gallery';

type GalleryContextType = {
    isOpen: boolean;

    // Methods
    openGallery: () => void;
    closeGallery: () => void;
};

const GalleryContext = createContext<GalleryContextType>({
    isOpen: false,
    openGallery: () => undefined,
    closeGallery: () => undefined,
});

export const useGallery = () => useContext(GalleryContext);

type GalleryProviderProps = {
    children?: React.ReactNode;
};

const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }: GalleryProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openGallery = () => setIsOpen(true);
    const closeGallery = () => setIsOpen(false);

    return (
        <GalleryContext.Provider
            value={{
                isOpen,
                openGallery,
                closeGallery,
            }}
        >
            {children}
            <GalleryView isOpen={isOpen} />
        </GalleryContext.Provider>
    );
};

export default GalleryProvider;
