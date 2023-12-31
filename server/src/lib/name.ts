import random_names from '../config/names.json';

export const getRandomName = (): string =>
{
    return random_names[Math.floor(Math.random() * random_names.length)];
}