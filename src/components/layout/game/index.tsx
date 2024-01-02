import Image from 'next/image';
import GameHUD from '../navigation/game';
import Canvas from './canvas';
import Chat from './chat';
import { TypographyH2 } from '@/components/typography';

export default function GameView() {
    return (
        <main className={'game-container h-full px-16 py-4'}>
            <div className={'game-logo'}>
                <Image
                    src={'/brand/faceade.svg'}
                    alt={'faceade'}
                    width={600}
                    height={40}
                    className={'select-none max-w-xs h-[90px]'}
                />
            </div>
            <div className={'game-bar relative flex justify-between items-center bg-white px-8'}>
                <div className={'select-none mb-8 relative'}>
                    <Image src={'/icons/clock.svg'} alt={'clock'} width={95} height={95} />

                    <TypographyH2
                        className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-5 ml-1'}
                    >
                        60
                    </TypographyH2>
                </div>

                <div>
                    <TypographyH2 className={'text-center pb-0'}>Waiting</TypographyH2>
                </div>

                <div>
                    <TypographyH2 className={'text-center pb-0'}>Round 1</TypographyH2>
                </div>
            </div>
            <div className={'game-canvas'}>
                <Canvas />
            </div>

            <div className={'game-chat w-[300px]'}>
                <Chat />
            </div>

            <div className={'game-toolbar'}>
                <GameHUD />
            </div>
        </main>
    );
}
