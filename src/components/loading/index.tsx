import Image from 'next/image';

export default function Loading() {
    return (
        <div className={'flex gap-4 items-center select-none'}>
            <Image
                src={'/icons/loading/1.svg'}
                width={24}
                height={24}
                alt={'loading'}
                className={'animate-bounce delay-300'}
            />
            <Image
                src={'/icons/loading/2.svg'}
                width={24}
                height={24}
                alt={'loading'}
                className={'animate-bounce delay-500'}
            />
            <Image
                src={'/icons/loading/3.svg'}
                width={24}
                height={24}
                alt={'loading'}
                className={'animate-bounce delay-700'}
            />
        </div>
    );
}
