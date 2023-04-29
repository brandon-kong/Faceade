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
import Head from 'next/head';
import { PUBLIC_URL } from '@/util/constants';
import Router, { } from 'next/router'
import { Inter, Albert_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

fetch('/api/socket')
const socket = io(PUBLIC_URL, {
    transports: ['polling'],
});

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
    const [pickedImage, setPickedImage] = useState(false)
    const [joinWithUrl, setJoinWithUrl] = useState(true)

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleCodeChange(e) {
        setCode(e.target.value);
    }

    function handlePlay (createGame) {
        if (joinWithUrl) {
            code = Router.query['']
        }
        setPickedImage(true)

        Socket.io.emit('join-game', name, code, createGame, image, password, ({success, players, host_id, room_status, client_id, processedCode, isPrivate}) => {
            // authenticate user on server
            if (success) {
                Socket.Game = {
                    code: processedCode,
                    host_id: host_id,
                    players: players,
                    status: room_status,
                    client_id: client_id,
                    private: isPrivate,
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
                if (isPrivate) {
                    setPage('password')
                    return
                }
            }
        })        
    }

    function createGame () {
        setCreatedGame(true)
        setPage('config')
        //handlePlay(true)
    }

    function cancelGame () {
        //Socket.io.emit('leave-game');
        setInConfig(false)
        setPage('home')
        setCreatedGame(false)
        setImage(null)
        setGame(null)
        setCode(null)
        setPickedImage(false)
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
        if (joinWithUrl) {
            setCode(Router.query[''])
        }

        Socket.io.emit('guess-password', name, code, image, guess, ({success, players, host_id, room_status, client_id, processedCode}) => {
            // fix security/stuff
            // user is joining the room twice?
            if (success) {

                //Router.push('/game')
                if (pickedImage) {
                    handlePlay(false)
                }
                else setPage('config')
            }
            else {
                alert('Wrong password')
            }
        })
    }

    useEffect(() => {
        if (Socket.io !== null) { Socket.io.close(); Socket.Game = null; }
        fetch('/api/socket')
        const socket = io(PUBLIC_URL, {
            transports: ['polling'],
        });

        Socket.io = socket;
    }, [])

    
    return (
        <>
            <Head>
                <title>Home | Faceade</title>
            </Head>
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

                <main className="h-screen w-screen flex items-center justify-center bg">
                    <div className="bg-white dark:bg-gray-800 px-8 py-10 rounded-lg drop-shadow flex flex-col gap-5 items-center justify-center w-4/5 min-w-lg max-w-sm md:w-2/3">
                        <IconLabel />
                        <a onClick={() => setJoinWithUrl(!joinWithUrl)} className="hover:underline cursor-pointer">{joinWithUrl ? 'Join game with code instead' : 'Join game with URL instead'}</a>
                        {
                            !joinWithUrl ?
                            <Textbox name="joincode" onChange={handleCodeChange} placeholder="Join Code" />
                            :
                            null
                        }

                        <Textbox name="name" onChange={handleNameChange} placeholder="Name" />
                        <Button value="Play" onClick={attemptToJoin} />
                        <OrSeperator />
                        <Button value="Create room" onClick={createGame} />
                    </div>
                </main>
                <footer className="absolute block md:fixed md:bottom-0 md:right-0 bg-white rounded-lg drop-shadow m-4 dark:bg-gray-800">
                        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                        <span className="text-sm px-5 text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="px-1 hover:underline text-primary">Faceade</a>
                        </span>
                        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </footer>
        </>
        
    )
}
