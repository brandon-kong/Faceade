import React, { useMemo } from 'react';
import Image from 'next/image';

const sketchesPath = '/images/sketches';
const totalSketches = 6;

export default function MeteorShower({ active = true }: { active?: boolean }) {
    const meteors = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 4}s`,
            rotation: `${Math.random() * 360}deg`,
        }));
    }, []);

    if (!active) return null;

    return (
        <div className="absolute w-full h-full overflow-hidden -z-10">
            {meteors.map((style, i) => (
                <div key={i} className="absolute w-10 h-10 bg-transparent transform meteor" style={style}>
                    <Image
                        src={`${sketchesPath}/${Math.floor(Math.random() * totalSketches)}.png`}
                        alt={`Meteor ${i}`}
                        width={100}
                        height={100}
                        className={'opacity-30'}
                    />
                </div>
            ))}
        </div>
    );
}
