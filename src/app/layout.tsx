import type { Metadata } from 'next';
import { Inter, Bubblegum_Sans, Poppins } from 'next/font/google';
import './globals.css';

import { SocketProvider } from '../components/layout/providers/socket-provider';
import Brand from '@/components/layout/navigation/brand';

import { cn } from '@/lib/utils';
import Footer from '@/components/layout/navigation/footer';
import GalleryProvider from '@/components/layout/providers/gallery-provider';
import LoadProvider from '@/components/layout/providers/load-provider';
import GameHUD from '@/components/layout/navigation/game';
import { GameProvider } from '@/components/layout/providers/game-provider';

const bubblegum_sans = Bubblegum_Sans({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-bubblegum-sans',
});

const inter = Inter({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-inter-mono',
});

const poppins = Poppins({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-poppins-mono',
});

export const metadata: Metadata = {
    title: 'Faceade',
    description: 'Faceade is a game where you can play with others in a virtual drawing room, where you can draw using your body movements.',
    icons: {
        icon: '/icon.png'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(`${bubblegum_sans.variable} ${poppins.variable} font-mono`)}>
               <LoadProvider>
                <GameProvider>
                    <SocketProvider>
                        

                            <GalleryProvider>
                                
                                {
                                    /*
                                    <Brand />
                                    */

                                }
                                
                                {children}
                                <Footer />
                                

                            </GalleryProvider>
                        
                        </SocketProvider>
                    </GameProvider>
                </LoadProvider>
            </body>
        </html>
    );
}
