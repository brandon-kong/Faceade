'use client';

// Custom components
import Textbox from '@/components/Input/Textbox'
import IconLabel from '@/components/Brand/IconLabel'
import Button from '@/components/Input/Button'
import OrSeperator from '@/components/OrSeperator';
import ProfileImage from '@/components/ProfileImage';
import Password from '@/components/Password';

// Client components
import { io } from 'socket.io-client';
import Socket from '@/client/Socket';

import React, { useState, useEffect } from 'react';
import Router, { } from 'next/router'
import { Inter, Albert_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

fetch('http://localhost:3000/api/socket')
const socket = io();

Socket.io = socket;

export default function Home() {

    const [page, setPage] = useState('home')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    var [code, setCode] = useState(null)
    const [game, setGame] = useState(null)
    const [inConfig, setInConfig] = useState(false)
    const [createdGame, setCreatedGame] = useState(false)
    const [password, setPassword] = useState(null)

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handlePlay (createGame) {
        code = Router.query['']

        Socket.io.emit('join-game', name, code, createGame, image, password, ({success, players, host_id, room_status, client_id, processedCode, isPrivate}) => {
            if (isPrivate) {
                setPage('password')
                return
            }
            if (success) {
                Socket.Game = {
                    code: processedCode,
                    host_id: host_id,
                    players: players,
                    status: room_status,
                    client_id: client_id,
                    words: [],
                    playerData: {
                        id: client_id,
                        name: name,
                        gameCode: processedCode,
                        score: 0,
                        picture: image,
                        videoOn: false,
                    }
                }

                Router.push('/game')
            }
        })        
    }

    function createGame () {
        setCreatedGame(true)
        handlePlay(true)
    }

    function cancelGame () {
        //Socket.io.emit('leave-game');
        setInConfig(false)
        setPage('home')
        setCreatedGame(false)
        setImage(null)
        setGame(null)
        setCode(null)
    }

    function onImageChange (file) {

        if (!file) {
            Socket.io.emit('update-picture', null)
            setImage(null)
            return
        }

        const blob = new Blob([file], {type: file.type})
        const url = URL.createObjectURL(blob)
        
        Socket.io.emit('update-picture', url)
        setImage(url)
    }

    function attemptToJoin () {
        code = Router.query['']

        Socket.io.emit('attempt-to-join', code, ({success, isPrivate}) => {
            if (isPrivate) {
                setPage('password')
                return
            }
            if (success) {
                setPage('config')
            }
        })
    }

    function passwordGuess (guess) {
        code = Router.query['']

        Socket.io.emit('guess-password', name, code, image, guess, ({success, players, host_id, room_status, client_id, processedCode}) => {
            if (success) {
                Socket.Game = {
                    code: processedCode,
                    host_id: host_id,
                    players: players,
                    status: room_status,
                    client_id: client_id,
                    words: [],
                    playerData: {
                        id: client_id,
                        name: name,
                        gameCode: processedCode,
                        score: 0,
                        picture: image,
                        videoOn: false,
                    }
                }

                Router.push('/game')
            }
            else {
                alert('Wrong password')
            }
        })
    }

    return (
        <>
            {
                page === 'config' ?
                    <ProfileImage 
                    onCancel={cancelGame}
                    onConfirm={() => handlePlay(createdGame)}
                    onChange={onImageChange}
                    />
                : null
            }

            {
                page === 'password' ?
                    <Password
                    onCancel={cancelGame}
                    onConfirm={passwordGuess}
                    onChange={onImageChange}
                    />
                : null

            }

            <main className="h-screen w-screen flex items-center justify-center">
                <div className="flex flex-col gap-5 items-center justify-center w-2/3 max-w-sm">
                    <IconLabel />
                    <Textbox name="name" onChange={handleNameChange} placeholder="Name" />
                    <Button value="Play" onClick={attemptToJoin} />
                    <OrSeperator />
                    <Button value="Create room" onClick={createGame} />
                </div>
            </main>
        </>
        
    )
}
