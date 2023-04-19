import { getValidName, getCleanedString } from '@/util/StringUtil.js';
import { WORDS, getRandomWordThatIsntInList } from '@/util/game/WordUtil.js';

import { MIN_PLAYERS, TIME_LIMIT } from '@/util/constants';

export default (code) => {
    let joinCode = code,
        gameHost = null,
        isPrivate = false,
        password = '',
        players = {},
        playerOrder = [],
        status = '',
        words = [],
        drawingData = [],
        round = 0,
        rounds = 0,
        timeLeft = 0,
        currentDrawer = null,
        currentWord = '',
        currentWordIndex = 0,
        currentWordLength = 0,
        usedWords = [],
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
    const getIsPrivate = () => isPrivate;
    const getPassword = () => password;

    function getSafePlayers () {
        const safePlayers = {};

        for (let player in players) {
            safePlayers[player] = {
                name: players[player].name,
                score: players[player].score,
                id: players[player].id,
                picture: players[player].picture,
                videoOn: players[player].videoOn
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

    function setIsPrivate(socket, value) {
        // added layer of security
        if (socket.id !== gameHost.id) {
            return;
        }   

        isPrivate = value;
    }

    function setPassword (socket, sp) {
        if (socket.id !== gameHost.id) {
            return;
        }

        password = sp;
    }

    function addPlayer(socket, name, picture) {
        const safeName = getValidName(name, players);
        players[socket.id] = {
            client: socket,
            name: safeName,
            score: 0,
            id: socket.id,
            picture: picture,
            guessedCorrectly: false,
            videoOn: false
        }

        playerOrder.push(socket.id);

        for (let player in players) {
            players[player].client.emit('player-joined', safeName, socket.id, picture);
        }
    }

    function removePlayer(socket) {
        const name = players[socket.id].name;

        for (let player in players) {
            players[player].client.emit('player-left', name, socket.id);
        }

        // TODO: add logic to check if the player is the host and give host to someone else

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
        console.log('round started')

        for (let player in players) {
            players[player].client.emit('round-number-changed', round);
        }

        if (round > rounds) {
            console.log('game over')
            return;
        }

        for (let i = 0; i < getPlayerLength(); i++) {
            if (getPlayerLength() === 0) {
                // no players left, the game shouldn't exist
                return;
            }

            // reinitialize variables

            // TODO: add logic to have drawer pick a word
            currentDrawer = playerOrder[i];
            currentWord = getRandomWordThatIsntInList(usedWords);
            drawingData = [];

            // push the word to the used words list so it can't be used again
            usedWords.push(currentWord);

          console.log(currentWord);  

            console.log(currentDrawer + ' is drawing');

            for (let player in players) {
                players[player].client.emit('receive-drawing-data', drawingData);
            }

            let startDrawing = new Promise((resolve, reject) => {
                let thisRound = true;
                // TIME_LIMIT is in seconds, so we need to multiply by 1000
                timeLeft = TIME_LIMIT;

                let timeLeftInterval = setInterval(() => {
                    if (!thisRound)
                        return;

                    timeLeft--;

                    
                    // TODO: add logic to help the guessers with the word by displaying hints

                }, 1000);


            });

            const finishDrawing = () => {
                if (getPlayerLength() == 0) {
                    // no players left, the game shouldn't exist
                    return;
                }

                clearInterval(timeLeftInterval);

                let drawerPoints = 0;

                // TODO: add logic to calculate points for the drawer

                for (let player in players) {
                    if (players[player].guessedCorrectly) {
                        players[player].score += 10;
                    }
                }

                // TODO: add logic to calculate points for the guessers

                if (players[currentDrawer] === undefined) {
                    return;
                }

                players[currentDrawer].score += drawerPoints;

                for (let player in players) {
                    players[player].client.emit('player-score-changed', currentDrawer, players[player].score);
                }

                
            }
        }
    }

    function startGame() {

        // when in development, we can just start the game, otherwise USE MIN_PLAYERS
        if (getPlayerLength() < 0) {
            console.log('not enough players!')
            return;
        }

        status = 'running'

        for (let player in players) {
            players[player].client.emit('game-start');
            players[player].client.emit('status-change', status);
        }

        startRound();
    }

    function setVideo(socket, toggle) {
        players[socket.id].videoOn = toggle;

        for (let player in players) {
            players[player].client.emit('toggle-camera', socket.id, toggle);
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
        sendMessage,
        getSafePlayers,
        startGame,
        setHost,
        setVideo,
        getIsPrivate,
        getPassword,
        setPassword,
        setIsPrivate,
    }
}