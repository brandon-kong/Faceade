export default class Socket {
    io = null;
    Game = {
        code: null,
        players: [],
        host: null,
        started: false,
        round: 0,
        rounds: 0,
        turn: 0,
    }
}