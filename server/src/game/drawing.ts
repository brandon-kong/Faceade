export type Point = {
    x: number;
    y: number;
}

export type DrawingAction = 
| {
    type: 'line';
    from: Point;
    to: Point;
    radius: number;
    color: string;
} | {
    type: 'point';
    x: number;
    y: number;
    radius: number;
    color: string;
} | {
    type: 'startLine' | 'endLine';
    from: Point;
}