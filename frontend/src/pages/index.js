'use client';

// Custom components
import Textbox from '@/components/Input/Textbox'
import IconLabel from '@/components/Brand/IconLabel'
import Button from '@/components/Input/Button'
import OrSeperator from '@/components/OrSeperator';
import ProfileImage from '@/components/ProfileImage';
import axios from 'axios';

// Client components
import { io } from 'socket.io-client';
import Socket from '@/client/Socket';

import React, { useState, useEffect } from 'react';
import Router, { } from 'next/router'
import { Inter, Albert_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

fetch('/api/socket')
const socket = io();

Socket.io = socket;

export default function Home() {

    const [name, setName] = useState('')
    var [code, setCode] = useState(null)
    const [game, setGame] = useState(null)
    const [createdGame, setCreatedGame] = useState(false)

    function handleNameChange(e) {
        setName(e.target.value)
    }

    async function startClient() {
        await fetch('/api/socket')
        const socket = io();

        Socket.io = socket;
    }

    function handlePlay (createGame) {
        code = Router.query['']

        Socket.io.emit('join-game', name, code, createdGame, ({success, players, room_status, client_id}) => {
            if (success) {
                Socket.Game = {
                    code: code,
                    players: players,
                    status: room_status,
                    client_id: client_id,
                    words: [],
                    playerData: {
                        id: client_id,
                        name: name,
                        gameCode: code,
                        score: 0,
                        picture: null
                    }
                }

                setGame(Socket.Game)
                //Router.push('/game')
            }
        })        
    }

    function confirmGame () {
        //handlePlay()
        Router.push('/game')
    }

    function createGame () {
        setCreatedGame(true)
        handlePlay()
    }

    function cancelGame () {
        Socket.io.emit('leave-game');
        setCreatedGame(false)
        setGame(null)
        setCode(null)
    }

    function onImageChange (e) {
        if (e.target.files[0] === undefined) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                Socket.Game.playerData.picture = reader.result;
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        //startClient()
    }, [])

    return (
        <>
            {
                game ?
                    <ProfileImage 
                    onCancel={cancelGame}
                    onConfirm={confirmGame}
                    onChange={onImageChange}
                    />
                : null
            }

            <main className="h-screen w-screen flex items-center justify-center">
                <div className="flex flex-col gap-5 items-center justify-center w-2/3 max-w-sm">
                    <IconLabel />
                    <Textbox name="name" onChange={handleNameChange} placeholder="Name" />
                    <Button value="Play" onClick={handlePlay} />
                    <OrSeperator />
                    <Button value="Create room" onClick={createGame} />
                </div>
            </main>
        </>
        
    )
}
