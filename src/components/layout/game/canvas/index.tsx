'use client';

import { addDrawingAction } from "@/lib/room/game";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { useSocket } from "../../providers/socket-provider";
import { useGame } from "../../providers/game-provider/context";

export type DrawingAction = 
| {
    type: 'line' | 'endLine' | 'startLine';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
    color: string;
} | {
    type: 'point';
    x: number;
    y: number;
    radius: number;
    color: string;
}

export default function Canvas ()
{
    // allow drawing on canvas
    const [painting, setPainting] = useState<boolean>(false);
    const [lastX, setLastX] = useState<number>(0);
    const [lastY, setLastY] = useState<number>(0);

    const { socket } = useSocket();
    const { drawing, setDrawingActions } = useGame();

    const draw = useCallback((e: MouseEvent) => {
        if (!painting) return;

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const action: DrawingAction = {
            type: 'line',
            x1: lastX / canvas.width,
            y1: lastY / canvas.height,
            x2: x / canvas.width,
            y2: y / canvas.height,
            radius: 5,
            color: 'black',
        };

        setDrawingActions(prev => [
            ...prev,
            action,
        ]);      

        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        addDrawingAction(socket, action);
        
        setLastX(x);
        setLastY(y);
    }
    , [lastX, lastY, painting, socket, setDrawingActions]);

    const redraw = useCallback(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const actions = drawing.actions;
        actions.forEach((action, index) => {
            switch (action.type) {
                case 'startLine':
                    ctx.beginPath();
                case 'line':
                    ctx.moveTo(action.x1 * canvas.width, action.y1 * canvas.height);
                    ctx.lineWidth = action.radius * 2;
                    ctx.lineTo(action.x2 * canvas.width, action.y2 * canvas.height);
                    ctx.stroke();
                    break;
                case 'endLine':
                    ctx.closePath();
                    break;
            }
        });
    }, [drawing.actions]);

    useEffect(() => {

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        

        const ctx = canvas.getContext('2d');
        
        ctx && ctx.scale(dpr, dpr);

        function startPosition(e: MouseEvent) {
            setPainting(true);
            draw(e);

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setLastX(x);
            setLastY(y);

            const action: DrawingAction = {
                type: 'startLine',
                x1: x / canvas.width,
                y1: y / canvas.height,
                x2: 0,
                y2: 0,
                radius: 5,
                color: 'black',
            };

            addDrawingAction(socket, action);
        }

        function finishedPosition() {
            if (!ctx) return;
            setPainting(false);
            ctx.beginPath();

            const action: DrawingAction = {
                type: 'endLine',
                x1: lastX / canvas.width,
                y1: lastY / canvas.height,
                x2: 0,
                y2: 0,
                radius: 5,
                color: 'black',
            };

            addDrawingAction(socket, action);
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);

        canvas.addEventListener('mousemove', draw);
        

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx && ctx.scale(dpr, dpr);
            
            redraw();
        }
        
        window.addEventListener('resize', resizeCanvas);

        resizeCanvas();

        return () => {
            canvas.removeEventListener('mousedown', startPosition);
            canvas.removeEventListener('mouseup', finishedPosition);
            canvas.removeEventListener('mouseleave', finishedPosition);

            canvas.removeEventListener('mousemove', draw);
            window.removeEventListener('resize', resizeCanvas);
        }
    }, [draw, redraw]);

    return (
        <div
        className={'w-full rounded-lg shadow-md bg-white relative overflow-hidden'}
        >
            <canvas 
            width={800}
            height={600}
            id={'canvas'}
            className={'w-full h-auto bg-white aspect-[4/3]'}
            />
        </div>
    )
}