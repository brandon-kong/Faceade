const IS_DEV = process.env.NODE_ENV === 'development'
const PUBLIC_URL = process.env.NODE_SERVER_URL || 'asdf'
const CODE_LENGTH = 6

const MIN_PLAYERS = 2
const MAX_PLAYERS = 20

const MIN_ROUNDS = 1
const MAX_ROUNDS = 10

const TIME_LIMIT = 25

export { PUBLIC_URL, 
        CODE_LENGTH,
        MIN_PLAYERS,
        MAX_PLAYERS,
        MIN_ROUNDS,
        MAX_ROUNDS,
        TIME_LIMIT
    }