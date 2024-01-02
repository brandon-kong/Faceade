export type PlayerType = {
    socket_id: string;
    name: string;
    game_id: string;
    score: number;
    is_host: boolean;
};

export type Chat = {
    name: string;
    message: string;
};

export type Point = {
    x: number;
    y: number;
};

export type DrawingAction =
    | {
          type: 'line';
          from: Point;
          to: Point;
          radius: number;
          color: string;
      }
    | {
          type: 'startLine' | 'endLine';
          from: Point;
      };
