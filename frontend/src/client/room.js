import { getValidName, getCleanedString } from '@/util/StringUtil.js';

export default (code, host) => {
    let joinCode = code,
        gameHost = host,
        players = {},
        status = '',
        words = [],
        round = 0,
        rounds = 0,
        currentDrawer = null,
        currentWord = '',
        currentWordIndex = 0,
        currentWordLength = 0,
        currentWordGuesses = [],
        currentWordGuessesCorrect = []

    
    const getCode = () => joinCode;
    const getHost = () => gameHost;
    const getPlayers = () => players;
    const getStatus = () => status;
    const getWords = () => words;
    const getRound = () => round;
    const getRounds = () => rounds;
    const getCurrentDrawer = () => currentDrawer;
    const getCurrentWord = () => currentWord;
    const getCurrentWordIndex = () => currentWordIndex;
    const getCurrentWordLength = () => currentWordLength;
    const getCurrentWordGuesses = () => currentWordGuesses;
    const getCurrentWordGuessesCorrect = () => currentWordGuessesCorrect;

    function getSafePlayers () {
        const safePlayers = {};

        for (let player in players) {
            safePlayers[player] = {
                name: players[player].name,
                score: players[player].score,
                id: players[player].id,
                picture: players[player].picture
            };
        }

        return safePlayers;
    }

    function getPlayerLength () {
        return Object.keys(players).length;
    }

    function addPlayer(socket, name, picture) {
        players[socket.id] = {
            client: socket,
            name: getValidName(name, players),
            score: 0,
            id: socket.id,
            picture: null
        }

        for (let player in players) {
            players[player].client.emit('player-joined', name, socket.id, picture);
        }
    }

    function removePlayer(socket) {
        const name = players[socket.id].name;

        for (let player in players) {
            players[player].client.emit('player-left', name, socket.id);
        }

        delete players[socket.id];
    }

    function updatePlayer(socket, {picture}) {
        players[socket.id].picture = picture;

        for (let player in players) {
            players[player].client.emit('player-updated', socket.id, picture);
        }
    }

    function updatePlayerPicture(socket, picture) {
        players[socket.id].picture = picture;

        console.log('updated')
        for (let player in players) {
            players[player].client.emit('image-updated', socket.id, picture);
        }
    }

    function sendMessage(socket, message) {
        const name = players[socket.id].name;

        // Check if message is empty or only contains spaces
        if (message.length === 0 || getCleanedString(message).length === 0) {
            return;
        }

        for (let player in players) {
            players[player].client.emit('message-receive', name, message);
        }
    }

    function startGame() {
        status = 'playing';
        console.log("LETSS gOOO BOISSS");
    }

    return {
        getCode,
        getHost,
        getPlayers,
        getPlayerLength,
        getStatus,
        getWords,
        getRound,
        getRounds,
        getCurrentDrawer,
        getCurrentWord,
        getCurrentWordIndex,
        getCurrentWordLength,
        getCurrentWordGuesses,
        getCurrentWordGuessesCorrect,
        addPlayer,
        removePlayer,
        sendMessage,
        getSafePlayers,
        updatePlayerPicture,
        updatePlayer
    }
}