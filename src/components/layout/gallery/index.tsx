import React, { useState } from 'react';

import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from '@/components/typography';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const pageVariants = {
    initial: { opacity: 0, x: '100vw', skew: '-0deg' },
    animate: { opacity: 1, x: 0, skew: '0deg', transition: { duration: 0.5 } },
    exit: { opacity: 0, x: '-100vw', skew: '0deg', transition: { duration: 0.5 } },
};

import { useGallery } from '../providers/gallery-provider';

export default function GalleryView({ isOpen }: { isOpen: boolean }) {
    const { closeGallery } = useGallery();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    id={'gallery'}
                    key="gallery"
                    className="bg-white p-24 absolute w-full h-full top-0 left-0 z-[100]"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="flex flex-col gap-6">
                        <div className={'w-full flex justify-between items-center'}>
                            <TypographyH1 className={''}>Gallery</TypographyH1>
                            <div className={'select-none'}>
                                <button
                                    className={
                                        'hover:scale-110 hover:opacity-50 transform transition-all duration-200 ease-in-out'
                                    }
                                    onClick={closeGallery}
                                >
                                    <Image src={'/icons/close.svg'} width={40} height={40} alt={'close'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
