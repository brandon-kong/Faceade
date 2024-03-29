import type { DrawingAction } from '@/types';
import { SocketEvents } from '@/components/layout/providers/socket-provider';
import { Chat } from '@/types';
import type { Socket } from 'socket.io-client';

type ErrorType = {
    reason: string;
};

const registerEvents = (socket: Socket, utility: SocketEvents) => {
    socket.on('connect', () => {
        console.log(`connected to server with id ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('disconnected from server');
    });

    // Server events

    socket.on('server-announcement', (data: { message: string }) => {
        utility.addMessage({
            name: 'Server',
            message: data.message,
        });
    });

    // Game events

    socket.on('game-joined', () => {
        utility.setIsInRoom(true);
    });

    socket.on('host-status', (isHost: boolean) => {
        utility.setIsHost(isHost);
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

    socket.on('drawing-action-added', (action: DrawingAction) => {
        utility.addDrawingAction(action);
        // Draw on canvas
    });

    socket.on('replicate-drawing-actions', (actions: DrawingAction[]) => {
        utility.setDrawingActions(actions);
    });
};

export { registerEvents };
