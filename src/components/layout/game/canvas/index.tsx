'use client';

import { addDrawingAction } from "@/lib/room/game";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { useSocket } from "../../providers/socket-provider";
import { useGame } from "../../providers/game-provider/context";

import { Point, DrawingAction } from "@/types";

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
            from: {
                x: lastX / canvas.width,
                y: lastY / canvas.height,
            },
            to: {
                x: x / canvas.width,
                y: y / canvas.height,
            },
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
        let lastAction: DrawingAction | null = null;

        actions.forEach((action, index) => {
            switch (action.type) {
                case 'startLine':
                    ctx.beginPath();
                    ctx.moveTo(action.from.x * canvas.width, action.from.y * canvas.height);
                    break;
                case 'line':
                    ctx.moveTo(action.from.x * canvas.width, action.from.y * canvas.height);
                    ctx.lineWidth = action.radius * 2;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = action.color;
                    ctx.lineTo(action.to.x * canvas.width, action.to.y * canvas.height);
                    ctx.stroke();
                    break;
                case 'endLine':
                    ctx.closePath();
                    break;
            }

            lastAction = action;
        });

        ctx.stroke();
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
                from: {
                    x: x / canvas.width,
                    y: y / canvas.height,
                },
            };

            addDrawingAction(socket, action);
        }

        function finishedPosition() {
            if (!ctx) return;
            setPainting(false);
            ctx.beginPath();

            const action: DrawingAction = {
                type: 'endLine',
                from: {
                    x: lastX / canvas.width,
                    y: lastY / canvas.height,
                }
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