export type DrawingAction = {
    type: 'line' | 'endLine';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
    color: string;
}