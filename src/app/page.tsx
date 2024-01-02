'use client';

import MeteorShower from '@/components/effects/meteor-shower';
import GameView from '@/components/layout/game';
import LandingSection from '@/components/layout/landing';
import HowToPlaySection from '@/components/layout/landing/how-to-play';
import { useSocket } from '@/components/layout/providers/socket-provider';

export default function Home() {
    const { isInRoom } = useSocket();

    return (
        <main
            className={
                'min-h-screen relative pattern-paper pattern-blue-100 pattern-bg-transparent pattern-size-20 pattern-opacity-100'
            }
        >
            {/*
                <>
                
                <MeteorShower />
                
                <HowToPlaySection />
                
                </>
                */}

            {isInRoom ? (
                <GameView />
            ) : (
                <>
                    <MeteorShower />
                    <HowToPlaySection />
                    <LandingSection />
                </>
            )}
        </main>
    );
}
