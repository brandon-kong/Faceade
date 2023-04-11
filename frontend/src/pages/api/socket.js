import { Server } from 'socket.io';
import { generateNewGameCode, getRandomGameCode } from '../../util/game/Code';

import Room from '@/client/room';

const rooms = {};

const SocketHandler = (req, res) => {

    if (!res.socket.server.io) {
        console.log('Socket is initializing')

        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {
            console.log('New client connected')

            socket.on('join-game', (name, code, createGame, callback) => {

                if (!code) {
                    if (createGame === true) {
                        code = generateNewGameCode(rooms);
                    }
                    else {
                        code = getRandomGameCode(rooms);
                    }
                }

                if (socket.Room) {
                    socket.Room.removePlayer(socket);
                }

                if (!rooms[code]) {
                    rooms[code] = Room(code, socket);
                }

                const room = rooms[code];
                room.addPlayer(socket, name)

                socket.Room = room;

                callback({
                    success: true,
                    //players: room.getPlayers(),
                    room_status: room.getStatus(),
                    client_id: socket.id
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

            socket.on('send-message', (message) => {
                if (!socket.Room) {
                    return;
                }

                socket.Room.sendMessage(socket, message);
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
