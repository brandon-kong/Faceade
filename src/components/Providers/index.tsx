'use client';

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from "@chakra-ui/react";
import { SocketProvider } from '@/client/SocketProvider';
import Theme from '@/theme'

export default function Providers ({ children }: any) {
    return (
        <CacheProvider>
            <ChakraProvider theme={Theme}>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}