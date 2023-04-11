import React, { Component } from 'react';
import Image from 'next/image'

export default function IconLabel() {
    return (
        <div className="flex flex-row gap-5 items-center justify-center w-full max-w-xs">
            <Image src="/faceade.png" alt="Logo" width={100} height={100} />
            <h1 className="text-2xl font-bold">Faceade</h1>
        </div>
    )
}