'use client';

import { useEffect } from "react";

export default function Canvas ()
{

    // allow drawing on canvas

    useEffect(() => {

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ctx = canvas.getContext('2d');

        let painting = false;

        function startPosition(e: MouseEvent) {
            painting = true;
            draw(e);
        }

        function finishedPosition() {
            if (!ctx) return;
            painting = false;
            ctx.beginPath();
        }

        function draw(e: MouseEvent) {
            if (!painting) return;
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
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        //canvas.addEventListener('mouseleave', finishedPosition)

        canvas.addEventListener('mousemove', draw);
        

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);

        resizeCanvas();

        return () => {
            canvas.removeEventListener('mousedown', startPosition);
            canvas.removeEventListener('mouseup', finishedPosition);
            canvas.removeEventListener('mouseleave', finishedPosition);

            canvas.removeEventListener('mousemove', draw);
            window.removeEventListener('resize', resizeCanvas);
        }
    }, []);

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