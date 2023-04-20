const getCleanedString = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}

const getValidName = (str, players, totalPlayers) => {
    const cleaned = getCleanedString(str);
    let name = cleaned;

    if (cleaned.length === 0) {
        name = 'Player ' + (totalPlayers + 1);
    }

    // TODO: make sure the name is appropriate

    return name;
}

export {
    getCleanedString,
    getValidName
}