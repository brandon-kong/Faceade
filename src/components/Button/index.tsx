import {
    Button as ChakraButton,
} from '@chakra-ui/react';

export const PrimaryButton = ({ children, ...props }: any) => {
    return (
        <ChakraButton
            rounded={'full'}
            bg={'gray.200'}
            color={'gray.800'}
            boxShadow={'sm'}
            _hover={{ boxShadow: 'md', transform: 'translateY(-2px) scale(1.2)' }}

            _active={{
                boxShadow: 'lg',
                transform: 'translateY(0px) scale(1.1)',
            }}

            {...props}
        >
            { children }
        </ChakraButton>
    )
}

export const ButtonWithoutScaling = ({ children, ...props }: any) => {
    return (
        <ChakraButton
            rounded={'full'}
            bg={'gray.200'}
            color={'gray.800'}
            boxShadow={'sm'}
            _hover={{ boxShadow: 'md' }}

            _active={{
                boxShadow: 'lg',
            }}

            {...props}
        >
            { children }
        </ChakraButton>
    )
}