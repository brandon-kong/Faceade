import {
    Avatar,
    Flex,
    Text
} from '@chakra-ui/react';

export default function PlayerCard ( props: any ) {
    return (
        <Flex
        direction={'column'}
        align={'center'}
        gap={2}
        >
            <Avatar
            src={props.player?.image}
            size={'xl'}
            />
            <Text>
                {props.name || props.player?.name || 'Player'}
            </Text>
        </Flex>
    )
}