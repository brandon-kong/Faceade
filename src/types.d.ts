export type PlayerType = {
    socket_id: string;
    name: string;
    game_id: string;
    score: number;
    is_host: boolean;
}

export type Chat = {
    name: string;
    message: string;
}