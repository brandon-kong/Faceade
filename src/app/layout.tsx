import type { Metadata } from 'next';
import { Inter, Bubblegum_Sans, Poppins } from 'next/font/google';
import './globals.css';

import { SocketProvider } from '../components/layout/providers/socket-provider';
import Brand from '@/components/layout/navigation/brand';

import { cn } from '@/lib/utils';
import Footer from '@/components/layout/navigation/footer';

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
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(`${bubblegum_sans.variable} ${poppins.variable} font-mono`)}>
                <SocketProvider>
                    <Brand />
                    {children}

                    <Footer />
                </SocketProvider>
            </body>
        </html>
    );
}