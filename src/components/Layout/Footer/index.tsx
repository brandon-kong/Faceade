'use client';

import {
    Flex,
    Link as ChakraLink,
    Text
} from '@chakra-ui/react'

import Link from 'next/link';

export default function Footer () {
    return (
        <Flex
        position={'absolute'}
        bottom={0}
        left={0}
        bg={'white'}
        p={2}
        gap={4}
        roundedTopRight={{ base: '0', md: 'lg' }}
        fontSize={'sm'}
        
        w={{ base: '100%', md: 'auto' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        >
            <Text>
                Copyright &copy; 2023
            </Text>
            <ChakraLink
            as={Link}
            href={'/privacy'}
            >
                Privacy Policy
            </ChakraLink>
            <ChakraLink
            as={Link}
            href={'/terms'}
            >
                Terms of Service
            </ChakraLink>
        </Flex>
    )
}