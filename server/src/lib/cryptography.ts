import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

import { getRandomValues } from 'crypto';

import { adjectives, subjects, verbs, subject_two, numbers } from '../config/code.json';

// Use uuidv4 to generate a random game id
const generateGameId = () => {
    return uuidv4();
}

// Use createHash to generate a random game password
const generateGamePassword = () => {
    return createHash('sha256').update(uuidv4()).digest('hex');
}

// Use crypto to generate a random game code
// First character is always a number, the next 4 are letters
const generateGameCode = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const code = [];

    for (let i = 0; i < 4; i++) {
        let randomIndex;
        do {
            randomIndex = getRandomValues(new Uint32Array(1))[0];
        } while (randomIndex >= Math.floor(0x100000000 / alphabet.length) * alphabet.length);
        randomIndex %= alphabet.length;

        code.push(alphabet[randomIndex]);
    }

    code.unshift(getRandomInt(10).toString());
    return code.join('');
}

const getRandomInt = (max: number) => {
    let rand = new Uint32Array(1);
    getRandomValues(rand);
    return rand[0] % max;
}

const getPhraseFromCode = (code: string) => {
    const phrase = [];
    const num = code[0];

    let number = numbers[num as keyof typeof numbers];
    let adjective = adjectives[code[1] as keyof typeof adjectives];
    let subject = subjects[code[2] as keyof typeof subjects];
    let verb = verbs[code[3] as keyof typeof verbs];
    let subject_two_ = subject_two[code[4] as keyof typeof subject_two];

    if (number) {
        phrase.push(number);
    }

    phrase.push(adjective);

    if (num !== '1') {
        phrase.push(subject.plural)
    }
    else {
        phrase.push(subject.singular)
    }

    if (num !== '1') {
        phrase.push(verb);
    }

    subject_two_ += 's';
    phrase.push(subject_two_);

    return phrase.join(' ');
};

export {
    generateGameId,
    generateGamePassword,
    generateGameCode,
    getPhraseFromCode,
};