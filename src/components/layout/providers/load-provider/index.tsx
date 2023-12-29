'use client';

import React, { useEffect, useState } from 'react';
import Loading from '@/components/loading';

import { AnimatePresence, motion } from 'framer-motion';

import { LoadContext } from './context';
import { TypographyH4 } from '@/components/typography';

type LoadProviderProps = {
    children?: React.ReactNode;
};

const pageVariants = {
    initial: { opacity: 1, x: '100vw', skew: '-15deg' },
    animate: { opacity: 1, x: 0, skew: '0deg', transition: { duration: 0.5 } },
    exit: { opacity: 0, x: '-100vw', skew: '45deg', transition: { duration: 0.5 } },
};

export default function LoadProvider({ children }: LoadProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);

    // Disable scrolling when loading

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [loading]);

    return (
        <LoadContext.Provider
            value={{
                loading,
                setLoading,
            }}
        >
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key={'loading'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={'fixed w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-[100]'}
                    >
                        <div
                        className={'flex flex-col gap-4 items-center text-center'}
                        >
                            <Loading />
                        </div>
                        
                    </motion.div>
                )}
            </AnimatePresence>
            
            {children}
        </LoadContext.Provider>
    );
};

