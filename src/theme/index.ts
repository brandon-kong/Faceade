import { extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const theme = extendTheme({ config,
    styles: {
        global: {
            body: {
                bg: 'black',
                color: 'black',
            }
        }
    } 
});

export default theme;