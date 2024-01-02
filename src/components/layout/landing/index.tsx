'use client';

import JoinCard from './join-card';
import Image from 'next/image';

import { useGallery } from '../providers/gallery-provider';

export default function LandingSection() {
    // Handle pressing the chevron button, which will take the client to the galleries page overlay
    const { openGallery } = useGallery();

    const handleChevronClick = () => {
        openGallery();
    };

    return (
        <section className={'w-full h-full min-h-screen block md:flex'}>
            <div className={'flex flex-[3] h-screen items-center justify-center'}>
                <JoinCard />
            </div>

            <div className={'flex-[2] h-screen items-center justify-center p-12 hidden lg:flex'}>
                <div className={'w-full h-full items-center justify-center flex bg-white shadow-lg relative'}>
                    <div
                        onClick={handleChevronClick}
                        className={
                            'absolute -left-8 rounded-full bg-white shadow-lg flex items-center justify-center w-16 h-16 hover:scale-110 transition-transform cursor-pointer'
                        }
                    >
                        <Image src={'/icons/chevron-left.svg'} width={20} height={20} alt={'chevron'} />
                    </div>
                    <Image
                        src={'/images/face.svg'}
                        width={100}
                        height={100}
                        alt={'face'}
                        className={'w-full h-full lg:max-h-screen'}
                    />
                </div>
            </div>
        </section>
    );
}
