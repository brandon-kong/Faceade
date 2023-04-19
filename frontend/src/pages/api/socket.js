import { Server } from 'socket.io';
import { generateNewGameCode, getRandomGameCodeThatIsPublic, getRandomGameCode } from '../../util/game/Code';

import Room from '@/client/room';

const rooms = {};

const SocketHandler = (req, res) => {

    if (!res.socket.server.io) {
        console.log('Socket is initializing')

        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {
            console.log('New client connected')

            socket.on('attempt-to-join', (code, callback) => {
                if (socket.Room) {
                    socket.Room.removePlayer(socket);
                }

                const room = rooms[code];

                if (room && room.getIsPrivate()) {
                    callback({
                        success: false,
                        isPrivate: true,
                    })
                }
                else {
                    // join room
                    callback({
                        success: true,
                        isPrivate: false
                    })
                }
            })

            socket.on('password-guess', (code, guess, callback) => {
                if (socket.Room) {
                    socket.Room.removePlayer(socket);
                }

                const room = rooms[code];

                if (room && room.getPassword() === guess) {
                    // join room
                    room.addPlayer(socket, name, image)

                    socket.Room = room;

                    callback({
                        success: true,
                        processedCode: room.getCode(),
                        players: room.getSafePlayers(),
                        room_status: room.getStatus(),
                        host_id: room.getHost().id,
                        client_id: socket.id,
                        isPrivate: room.getIsPrivate(),
                    })
                }

                else {
                    callback({
                        success: false,
                        isPrivate: true
                    })
                }
            })

            socket.on('join-game', (name, code, createGame, image, password, callback) => {

                var gameCreated = false;

                if (!code) {
                    if (createGame === true) {
                        gameCreated = true;
                        code = generateNewGameCode(rooms);
                    }
                    else {
                        code = getRandomGameCodeThatIsPublic(rooms);
                    }
                }

                if (socket.Room) {
                    socket.Room.removePlayer(socket);
                }

                if (!rooms[code]) {
                    // create room if it doesn't exist
                    gameCreated = true;
                    rooms[code] = Room(code);
                }

                const room = rooms[code];
                room.addPlayer(socket, name, image)

                socket.Room = room;

                if (gameCreated) {
                    room.setHost(socket)
                }

                callback({
                    success: true,
                    processedCode: room.getCode(),
                    players: room.getSafePlayers(),
                    room_status: room.getStatus(),
                    host_id: room.getHost().id,
                    client_id: socket.id,
                    isPrivate: room.getIsPrivate(),
                })
            })

            socket.on('leave-game', () => {
                if (!socket.Room) {
                    return;
                }

                socket.Room.removePlayer(socket);

                // close room if empty
                if (socket.Room.getPlayerLength() === 0) {
                    delete rooms[socket.Room.getCode()];
                }

                socket.Room = null;
            })

            socket.on('change-password', (password) => {
                if (!socket.Room) {
                    return;
                }

                // check if the player is the host
                if (socket.id !== socket.Room.getHost().id) {
                    return;
                }

                socket.Room.setPassword(socket, password);
            })

            socket.on('guess-password', (name, code, image, password, callback) => {

                if (rooms[code] === undefined) {
                    callback({
                        success: false,
                        message: 'The room you are trying to join does not exist.'
                    });
                    return;
                }

                const room = rooms[code];

                if (room.getIsPrivate() === false) {
                    callback({
                        success: true,
                    });
                    return;
                }
                
                if (room.getPassword() === password) {
                    
                    room.addPlayer(socket, name, image)
                    socket.Room = room;

                    callback({
                        success: true,
                        processedCode: room.getCode(),
                        players: room.getSafePlayers(),
                        room_status: room.getStatus(),
                        host_id: room.getHost().id,
                        client_id: socket.id,
                        isPrivate: room.getIsPrivate(),
                    })
                }
                else {
                    callback({
                        success: false,
                        message: 'The password you entered is incorrect.'
                    })
                }
            })

            socket.on('change-private', (isPrivate) => {
                if (!socket.Room) {
                    return;
                }

                // check if the player is the host
                if (socket.id !== socket.Room.getHost().id) {
                    return;
                }

                socket.Room.setIsPrivate(socket, isPrivate);
            })

            socket.on('send-message', (message) => {
                if (!socket.Room) {
                    return;
                }

                socket.Room.sendMessage(socket, message);
            })

            socket.on('video-changed', (videoOn) => {
                if (!socket.Room) {
                    return;
                }

                socket.Room.setVideo(socket, videoOn);
            })

            socket.on('start-game', () => {
                if (!socket.Room) {
                    return;
                }

                // check if the player is the host
                if (socket.id !== socket.Room.getHost().id) {
                    return;
                }

                socket.Room.startGame(socket);
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected')

                if (!socket.Room) {
                    return;
                }

                socket.Room.removePlayer(socket);

                // close room if empty
                if (socket.Room.getPlayerLength() === 0) {
                    delete rooms[socket.Room.getCode()];
                }

                socket.Room = null;
            })
        })
    }

    res.end()
};

export default SocketHandler;
