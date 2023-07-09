import { Player } from '@/types/Server'
import { useContext } from 'react'
import { SocketContext } from '@/client/SocketProvider'

import {
    Flex,
    Divider
} from '@chakra-ui/react'
import PlayerCard from '../PlayerCard'

type PlayerListProps = {
    players: Player[]
}

export default function PlayerList ({ players }: PlayerListProps) {
    const { socket, game } = useContext(SocketContext);

    console.log(game);
    
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
                player={game?.players[socket.id]}
                name={'You'}
                />
            </Flex>
            <Divider 
            bg={'gray.300'}
            />
            <>
                { socket?.id }
            </>
            <ul>
                {
                    players && Object.keys(players).map((playerId: string) => {
                        {
                            if (playerId == socket?.id) return;
                            else {
                                return (
                                    <>
                                    { playerId }
                                    { game?.playerData?.id }
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