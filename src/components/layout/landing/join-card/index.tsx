'use client';

import { useState } from 'react';

import Tape from '@/components/tape';
import { Input } from '@/components/ui/input';

import { TypographyH1, TypographyP } from '@/components/typography';
import { Button } from '@/components/ui/button';

import { useSocket } from '@/components/layout/providers/socket-provider';
import { createGame, joinGame } from '@/lib/room/socket';

import { useLoading } from '../../providers/load-provider/context';

export default function JoinCard() {
    const { connectSocket } = useSocket();
    const { setLoading } = useLoading();

    const [code, setCode] = useState<string>('');

    const handleCreateGame = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const socket = await connectSocket();

        if (!socket) return;

        createGame(socket);

    };

    const handleJoinGame = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const socket = await connectSocket();

        if (!socket) return;

        joinGame(socket, code);

    }

    return (
        <section
            className={'bg-white rounded-lg shadow-md px-8 py-12 relative border border-neutral-200 w-full max-w-md'}
        >
            {/* Tape */}
            <Tape className={'absolute -left-6 -top-0 z-0 -rotate-45'} />
            <Tape className={'absolute -right-7 -bottom-0 z-0 -rotate-[225deg]'} />

            <div className={'flex flex-col gap-6'}>
                <div className={'space-y-2'}>
                    <TypographyH1 className={''}>Join a game</TypographyH1>
                    <TypographyP className={'text-muted-foreground/80'}>
                        Enter a game code to join an existing game.
                    </TypographyP>
                </div>

                <div>
                    <form onSubmit={e => e.preventDefault()} className={'w-full flex flex-col gap-4'}>
                        <Input placeholder={'Enter game code'} value={code} onChange={(e) => setCode(e.target.value)}/>
                        <Button className={''}
                        type={'submit'}
                        onClick={handleJoinGame}
                        >Join</Button>

                        <Button variant={'opaque'} onClick={handleCreateGame}>
                            Create a new game
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
