import LandingSection from '@/components/layout/landing';
import JoinCard from '@/components/layout/landing/join-card';
import Image from 'next/image';

export default function Home() {
    return (
        <main
        className={'bg-white min-h-screen relative pattern-paper pattern-blue-100 pattern-bg-transparent pattern-size-20 pattern-opacity-100'}
        >
            <LandingSection />
            <LandingSection />
        </main>
    )
}
