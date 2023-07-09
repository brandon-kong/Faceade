'use client';

import Socket from '@/client/Socket';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { SocketContext } from '@/client/SocketProvider';

import {
    Box,
    Text,
    Flex,
    Grid,
    GridItem,
} from '@chakra-ui/react';

import { PrimaryButton } from '@/components/Button';
import PlayerList from '@/components/Game/PlayerList';
import GameInfo from '@/components/Game/GameInfo';
import Canvas from '@/components/Canvas';

export default function GameView () {
    const router = useRouter();

    const socketData = useContext(SocketContext);
    const game = Socket.game;
    const players = game?.players;

    console.log(players);


    useEffect(() => {
        if (game === undefined) {
            return router.push('/');
        }
    });

    return (
        <Grid
        w={'100%'}
        h={'100vh'}
        bg={'black'}

        p={'4'}
        pb={'12'}

        templateRows={'1fr 2fr 2fr'}
        templateColumns={'1fr 1fr 1fr'}
        templateAreas={
            `"playerlist gameinfo gameinfo"
            "playerlist canvas canvas"
            "playerlist canvas canvas"`
        }

        gap={4}
        >
            <GridItem
            gridArea={'playerlist'}
            w='full'
            h='full'
            >
                <PlayerList players={players} />
            </GridItem>
            
            <GridItem
            gridArea={'gameinfo'}
            >
                <GameInfo />
            </GridItem>
            <GridItem
            gridArea={'canvas'}
            >
                <Canvas />
            </GridItem>
        </Grid>
    )
}