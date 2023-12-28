import JoinCard from "./join-card";
import Image from 'next/image';

export default function LandingSection()
{
    return (
        <section
        className={'w-full h-full min-h-screen block md:flex'}
        >
            <div
            className={'flex flex-[3] h-screen items-center justify-center'}
            >
                <JoinCard />
            </div>

            <div
            className={'flex-[2] h-screen items-center justify-center hidden lg:flex'}
            >
                <Image src={'/images/face.svg'} width={100} height={100} alt={'face'}
                className={'w-full lg:max-h-screen'}
                />
            </div>
        </section>
    );
}