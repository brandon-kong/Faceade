const getCleanedString = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}

const getValidName = (str, players) => {
    const cleaned = getCleanedString(str);
    let name = cleaned;

    console.log(cleaned);

    if (cleaned.length === 0) {
        name = 'Player ' + (Object.keys(players).length + 1);
    }

    // TODO: make sure the name is appropriate

    return name;
}

export {
    getCleanedString,
    getValidName
}