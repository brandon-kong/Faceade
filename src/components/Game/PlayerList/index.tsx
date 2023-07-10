import { Player } from '@/types/Server'
import Socket from '@/client/Socket'

import {
    Flex,
    Divider
} from '@chakra-ui/react'
import PlayerCard from '../PlayerCard'

type PlayerListProps = {
    players: { [key: string]: Player } | undefined
}

export default function PlayerList ({ players }: PlayerListProps) {
    const game = Socket.game;
    
    if (!players) return (<></>);

    const player = players[game?.client_id as string];
    
    return (
        <Flex
        direction={'column'}
        bg={'white'}
        rounded={'md'}
        p={8}
        w={'full'}
        h={'full'}
        gap={'6'}
        >
            <Flex
            justify={'center'}
            >
                <PlayerCard
                player={player}
                name={'You'}
                />
            </Flex>
            <Divider 
            bg={'gray.300'}
            />
            <ul>
                {
                    players && Object.keys(players).map((playerId: string) => {
                        {
                            if (playerId == game?.client_id) return;
                            else {
                                return (
                                    <>
                                    <PlayerCard
                                    key={playerId}
                                    player={players[playerId]}
                                    />
                                    </>
                                    
                                    
                                )
                            }
                        }
                        
                    })
                }
            </ul>
        </Flex>
    )
}