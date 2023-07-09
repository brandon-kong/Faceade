export type Player = {
    id: string,
    name: string,
    score: number,
    image: string,
    videoOn: boolean,
}

export type Game = {
    code: string,
    host_id: string,
    players: { [key: string]: Player },
    status: string,
    client_id: string,
    private: boolean,
    settings: {
        rounds: number,
    },
    words: string[],
    playerData?: Player
}

export type CreateGameCallbackType = {
    success: boolean,
    processedCode: string,
    players: { [key: string]: any },
    room_status: string,
    host_id: string,
    client_id: string,
    isPrivate: boolean,
    settings: any,
    message?: string,
}