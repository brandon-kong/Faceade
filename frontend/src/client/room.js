import { getValidName, getCleanedString } from '@/util/StringUtil.js';

export default (code) => {
    let joinCode = code,
        gameHost = null,
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

    function setHost(socket) {
        gameHost = socket;
    }

    function addPlayer(socket, name, picture) {
        const safeName = getValidName(name, players);
        players[socket.id] = {
            client: socket,
            name: safeName,
            score: 0,
            id: socket.id,
            picture: picture
        }

        for (let player in players) {
            players[player].client.emit('player-joined', safeName, socket.id, picture);
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

        // Check if message is empty or only contains spaces
        if (message.length === 0 || getCleanedString(message).length === 0) {
            return;
        }

        for (let player in players) {
            players[player].client.emit('message-receive', name, message);
        }
    }

    function startRound() {

    }

    function startGame() {
        // TODO: add logic to start the game

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
        startGame,
        setHost
    }
}