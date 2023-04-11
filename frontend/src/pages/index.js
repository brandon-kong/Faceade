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
    const [image, setImage] = useState(null)
    var [code, setCode] = useState(null)
    const [game, setGame] = useState(null)
    const [createdGame, setCreatedGame] = useState(false)

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handlePlay (createGame) {
        code = Router.query['']

        Socket.io.emit('join-game', name, code, createdGame, ({success, players, room_status, client_id, processedCode}) => {
            if (success) {
                Socket.Game = {
                    code: processedCode,
                    players: players,
                    status: room_status,
                    client_id: client_id,
                    words: [],
                    playerData: {
                        id: client_id,
                        name: name,
                        gameCode: processedCode,
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
        Router.push('/game')
    }

    function createGame () {
        setCreatedGame(true)
        handlePlay(true)
    }

    function cancelGame () {
        Socket.io.emit('leave-game');
        setCreatedGame(false)
        setImage(null)
        setGame(null)
        setCode(null)
    }

    function onImageChange (file) {
        console.log(file)
        Socket.Game.players[Socket.Game.client_id].picture = file

        
        Socket.io.emit('update-picture', file)
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
