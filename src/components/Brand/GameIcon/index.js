import React, { Component } from 'react';
import Image from 'next/image'

export default function GameIcon() {
    return (
        <div className="flex flex-row gap-5 items-center justify-center w-full max-w-xs p-5">
            <Image priority={true} src="/faceade.svg" alt="Logo" width={500} height={150} />
        </div>
    )
}