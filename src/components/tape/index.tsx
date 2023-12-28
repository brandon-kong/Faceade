import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Tape({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <Image src={'/images/tape-cross.png'} width={60} height={60} alt={'tape'} className={''} />
        </div>
    );
}
