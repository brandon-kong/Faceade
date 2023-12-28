import React from 'react';
import { cn } from '@/lib/utils';

import Image from 'next/image';

export function TypographyH1({
    children,
    className,
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <h1
            id={id}
            className={cn(
                'scroll-m-20 text-4xl leading-normal font-extrabold lg:text-6xl lg:leading-heading text-heading font-sans',
                `${className && className}`,
            )}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h2
            className={cn(
                'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-sans',
                `${className && className}`,
            )}
        >
            {children}
        </h2>
    );
}

export function TypographyH3({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', `${className && className}`)}>
            {children}
        </h3>
    );
}

export function TypographyH4({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', `${className && className}`)}>
            {children}
        </h4>
    );
}

export function TypographyP({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn('leading-2 font-mono', `${className && className}`)}>{children}</p>;
}

export function Logo({ className }: { className?: string }) {
    return (
        <Image
            src={'/logos/zwise/zwise-black.svg'}
            alt="Workflow"
            width={75}
            height={27}
            className={className && className}
        />
    );
}
