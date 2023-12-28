import Image from "next/image";

export default function Brand()
{
    return (
        <nav
        className={'absolute top-0 left-0 z-50 p-hud-screen-spacing'}
        >
            <div
            className={'bg-white rounded-lg shadow-md py-2 px-4 border-2 border-neutral-100'}
            >
                <Image src={'/brand/faceade.svg'} width={200} height={100} alt={'face'}
                className={''}
                />
            </div>
            
        </nav>
    );
}