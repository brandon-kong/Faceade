import { getValidName } from '@/util/StringUtil.js';

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

    function getPlayerLength () {
        return Object.keys(players).length;
    }

    function addPlayer(socket, name) {
        players[socket.id] = {
            client: socket,
            name: getValidName(name, players),
            score: 0,
            id: socket.id
        }

        for (let player in players) {
            players[player].client.emit('player-joined', name);
        }
    }

    function removePlayer(socket) {
        const name = players[socket.id].name;

        for (let player in players) {
            players[player].client.emit('player-left', name, socket.id);
        }

        delete players[socket.id];
    }

    function sendMessage(socket, message) {
        const name = players[socket.id].name;

        for (let player in players) {
            players[player].client.emit('message-receive', name, message);
        }
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
        sendMessage
    }
}