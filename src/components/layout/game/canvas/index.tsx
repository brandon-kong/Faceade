'use client';

import { useState, useCallback } from "react";
import { useEffect } from "react";

type DrawingAction = {
    type: 'line';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
    color: string;
}

export default function Canvas ()
{
    const [drawingActions, setDrawingActions] = useState<DrawingAction[]>([]);
    // allow drawing on canvas
    const [painting, setPainting] = useState<boolean>(false);
    const [lastX, setLastX] = useState<number>(0);
    const [lastY, setLastY] = useState<number>(0);

    const draw = useCallback((e: MouseEvent) => {
        if (!painting) return;

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        setDrawingActions(prev => [
            ...prev,
            {
                type: 'line',
                x1: lastX / canvas.width,
                y1: lastY / canvas.height,
                x2: (e.clientX - rect.left) / canvas.width,
                y2: (e.clientY - rect.top) / canvas.height,
                radius: 10,
                color: 'black',
            }
        ]);      
        
        setLastX(x);
        setLastY(y);
    }
    , [lastY, lastX, painting]);

    const redraw = useCallback(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let action of drawingActions) {
            if (action.type === 'line') {
                ctx.beginPath();
                ctx.lineWidth = action.radius * 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = action.color;
                ctx.moveTo(action.x1 * canvas.width, action.y1 * canvas.height);
                ctx.lineTo(action.x2 * canvas.width, action.y2 * canvas.height);
                ctx.stroke();
            }
        }
    }, [drawingActions]);

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
        }

        function finishedPosition() {
            if (!ctx) return;
            setPainting(false);
            ctx.beginPath();
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