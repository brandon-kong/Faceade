import { CODE_LENGTH } from '@/util/constants';

const generateCode = () => {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}
    
// This method generates a new game code that does not exist in the game object
const generateNewGameCode = (gameObject) => {
    while (true) {
        const code = generateCode();
        if (!gameObject[code]) {
            return code;
        }
    }
}

// This method returns a random game from the game object
const getRandomGameCode = (gameObject) => {
    if (Object.keys(gameObject).length === 0) {
        // If there are no games, generate a new game code
        return generateNewGameCode(gameObject);
    }
    const keys = Object.keys(gameObject);
    return keys[keys.length * Math.random() << 0];
}

export { 
        generateCode,
        generateNewGameCode,
        getRandomGameCode
    }