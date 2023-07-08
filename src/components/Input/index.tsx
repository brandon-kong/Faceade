import {
    Input as ChakraInput,
}  from '@chakra-ui/react';

export default function Input ( props: any ) {
    return (
        <ChakraInput
        variant={'filled'}
        bg={'gray.200'}
        rounded={'full'}
        textAlign={'center'}
        color={'gray.800'}
        size={'lg'}

        _hover={{}}

        _placeholder={{
            color: 'gray.400',
        }}

        {...props}
        />
    )
}