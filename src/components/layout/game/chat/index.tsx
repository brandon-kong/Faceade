'use client';

import { FormEvent, useState } from "react"; 
import { TypographyH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/room/chat";
import { useSocket } from "../../providers/socket-provider";
import { Chat } from "@/types";

import { useGame } from "../../providers/game-provider/context";

export default function Chat()
{
    const { socket } = useSocket();
    const { messages, addMessage } = useGame();

    const [message, setMessage] = useState<string>('');

    const handleSend = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!socket) return;
        if (!message) return;

        sendMessage(socket, message);

        addMessage({
            name: 'You',
            message,
        });

        setMessage('');
    }

    return (
        <div
        className={'h-full bg-white shadow-md rounded-lg flex flex-col'}>
            <TypographyH2 className={'p-4 border-b border-neutral-200'}>
                Chat
            </TypographyH2>
            <div className={'flex flex-col flex-1 p-2 max-h-[600px] overflow-y-auto'}>
                {
                    messages.map((message: Chat, index: number) => (
                        <div
                        key={index}
                        className={'p-2'}>
                            <TypographyH2 className={'text-neutral-500 text-2xl pb-0'}>
                                {message.name}
                            </TypographyH2>
                            <TypographyH2>
                                {message.message}
                            </TypographyH2>
                        </div>
                    ))
                }
            </div>

            <form
            onSubmit={handleSend}
            className={'flex p-2'}>
                <Input
                className={'bg-gray-100 rounded-l-lg rounded-r-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'}
                placeholder={'Type your answer here'}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />  
                <Button
                type={'submit'}
                className={'rounded-r-lg rounded-l-none'}
                >
                    Send
                </Button>
            </form>
        </div>
    )
}