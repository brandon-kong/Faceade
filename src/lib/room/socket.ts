import { DrawingAction } from '@/components/layout/game/canvas';
import { SocketEvents } from '@/components/layout/providers/socket-provider';
import { Chat } from '@/types';
import type { Socket } from 'socket.io-client';

type ErrorType = {
    reason: string;
}

const registerEvents = (socket: Socket, utility: SocketEvents) => {
    socket.on('connect', () => {
        console.log(`connected to server with id ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('disconnected from server');
    });

    // Error events
    /* Game */

    socket.on('game-join-failed', (error: ErrorType) => {
        alert(error.reason);
    });

    socket.on('game-create-failed', (error: ErrorType) => {
        alert(error.reason);
    });

    /* Chat */
    socket.on('chat-send-failed', (error: ErrorType) => {
        alert(error.reason);
    });

    // Chat

    socket.on('player-chatted', (chat: Chat) => {
        utility.addMessage(chat);
    });

    // Drawing

    socket.on('drawing-action-added', (actions: DrawingAction[]) => {
        utility.setDrawingActions(actions);

        // Draw on canvas
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        // Clear canvas

        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw actions

        let isDrawing = false;
        let lastAction: DrawingAction | null = null;

        actions.forEach((action) => {
            switch (action.type) {
                case 'line':
                    if (lastAction && lastAction.type === 'line') {
                        ctx.beginPath();
                        ctx.moveTo(lastAction.x2 * canvas.width, lastAction.y2 * canvas.height);
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(action.x1 * canvas.width, action.y1 * canvas.height);
                    }
                    ctx.lineWidth = action.radius * 2;
                    ctx.lineTo(action.x2 * canvas.width, action.y2 * canvas.height);
                    ctx.stroke();
                    lastAction = action;
                    break;
                case 'point':
                    ctx.beginPath();
                    ctx.arc(action.x * canvas.width, action.y * canvas.height, action.radius, 0, 2 * Math.PI);
                    ctx.fill();
                    lastAction = action;
                    break;
                case 'endLine':
                    ctx.closePath();
                    lastAction = null;
                    break;
            }
        });
    });
};



export { registerEvents };
