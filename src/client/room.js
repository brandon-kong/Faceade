import { getValidName, getCleanedString } from '@/util/StringUtil.js';
import { WORDS, getRandomWordThatIsntInList } from '@/util/game/WordUtil.js';

import { MIN_PLAYERS, TIME_LIMIT } from '@/util/constants';

const room = (code) => {
    let joinCode = code,
        gameHost = null,
        isPrivate = false,
        totalPlayers = 0,
        password = '',
        players = {},
        playerOrder = [],
        authenticatedPlayers = [],
        status = 'waiting',
        words = [],
        drawingData = [],
        round = 0,
        rounds = 5,
        timeLeft = 0,
        currentDrawer = null,
        guessedCorrectly = {

            totalInterval: 0,
            allListener: function(val) {},
            set total(val) {
                this.totalInterval = val;
                this.allListener(val);
            },

            get total() {
                return this.totalInterval;
            },

            registerListener: function(listener) {
                this.allListener = listener;
            }
        },
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

    function getRandomPlayerThatIsntHost() {
        const playerIds = Object.keys(players);
        const randomIndex = Math.floor(Math.random() * playerIds.length);
        const randomPlayer = players[playerIds[randomIndex]];

        if (randomPlayer.id === gameHost.id) {
            return getRandomPlayerThatIsntHost();
        }

        return randomPlayer;
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
        authenticatedPlayers = [];

        for (let player in players) {
            players[player].client.emit('room-privacy-changed', value);
        }
    }

    function setPassword (socket, sp) {
        if (socket.id !== gameHost.id) {
            return;
        }

        password = sp;
        authenticatedPlayers = [];

        for (let player in players) {
            players[player].client.emit('room-password-changed', sp);
        }
        
    }

    function addPlayer(socket, name, picture) {
        const safeName = getValidName(name, players, totalPlayers);
        players[socket.id] = {
            client: socket,
            name: safeName,
            score: 0,
            id: socket.id,
            picture: picture,
            guessedCorrectly: false,
            videoOn: false
        }

        totalPlayers++;
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
        if (socket.id === gameHost.id) {
            if (getPlayerLength()-1 > 0) {
                // TODO: give host to the first player in the list, not first entry in dictionary
                const newHost = getRandomPlayerThatIsntHost();
                setHost(newHost);

                // update the host for all players
                for (let player in players) {
                    players[player].client.emit('host-changed', newHost.id);
                }

                players[newHost.id].client.emit('new-host', isPrivate, password);
            }
        }

        delete players[socket.id];
    }

    function sendMessage(socket, message) {
        const name = players[socket.id].name;

        // Check if message is empty or only contains spaces
        if (message.length === 0 || getCleanedString(message).length === 0 || message === null || message === undefined || getCleanedString(message).length > 100) {
            return;
        }

        for (let player in players) {
            players[player].client.emit('message-receive', name, socket.id, message);
        }
    }

    async function startRound() {
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

                console.log(timeLeft)
                let timeLeftInterval = setInterval(() => {
                    if (!thisRound)
                        return;

                    timeLeft--;

                    if (timeLeft <= 0) {
                        thisRound = false;
                        resolve();
                        return;
                    }

                    
                    // TODO: add logic to help the guessers with the word by displaying hints

                }, 1000);

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

                    thisRound = false

                    resolve(1)
                    //startRound();

                }

                // check if all players have guessed correctly
                guessedCorrectly.total = 0;
                guessedCorrectly.registerListener(function(val) {
                    if (val == (playerOrder.length - 1)) {
                        finishDrawing();
                    }
                })

                for (let player in players) {
                    players[player].guessedCorrectly = false;
                    players[player].client.emit('current-drawer', currentDrawer);
                    
                    if (player == currentDrawer) {
                        players[player].client.emit('draw-word', currentWord);
                        continue;
                    }

                    players[player].client.emit('guess-word', currentWord);
                }

                setTimeout(() => {
                    finishDrawing()
                }, TIME_LIMIT * 1000)

            });

            let drawingResult = await startDrawing

            if (i == (playerOrder.length - 1)) {
                if (round == rounds) {
                    console.log('Game ended!');

                    for (let player in players) {
                        players[player].client.emit('game-ended');
                    }

                    return;
                }
                console.log('round ended!');
                round ++;
                startRound()
            }

        }
    }

    function startGame() {

        // if the game is already running, don't start it again
        if (status === 'running') {
            return;
        }

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

    function authenticate(socket) {
        if (isPrivate) {
            authenticatedPlayers.push(socket.id);
        }
    }

    function isAuthenticated(socket) {
        if (isPrivate) {
            return authenticatedPlayers.includes(socket.id);
        }
        return true;
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
        authenticate,
        isAuthenticated
    }
}

export default room