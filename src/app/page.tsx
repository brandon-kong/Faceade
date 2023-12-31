import MeteorShower from '@/components/effects/meteor-shower';
import GameView from '@/components/layout/game';
import LandingSection from '@/components/layout/landing';
import HowToPlaySection from '@/components/layout/landing/how-to-play';

export default function Home() {
    return (
        <main
            className={
                'min-h-screen relative pattern-paper pattern-blue-100 pattern-bg-transparent pattern-size-20 pattern-opacity-100'
            }
        >
            
            {
                /*
                <>
                
                <MeteorShower />
                <LandingSection />
                <HowToPlaySection />
                
                </>
                */
            }
            
              <GameView />  
            
            
        </main>
    );
}
