import { getRandomValues } from 'crypto';

function getRandomIntInclusive(min: number, max: number): number {
    const randomBuffer = new Uint32Array(1);

    getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}

function generateGameCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(getRandomIntInclusive(0, characters.length - 1));
    }
    return result;
}

export { generateGameCode };
