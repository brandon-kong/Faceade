'use client';

import React, { useState, useRef, useContext } from 'react';
import { SocketContext } from '@/client/SocketProvider';
import { PrimaryButton, ButtonWithoutScaling } from '@/components/Button';

import { io } from 'socket.io-client'
import { useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
    Container,
    Flex,
    SlideFade,
    Spinner,
    Input as ChakraInput,
    Image as ChakraImage,
    Heading,
    Avatar,
    Icon,
} from '@chakra-ui/react';
import Canvas from '@/components/Canvas';
import Input from '@/components/Input';
import Canvas3D from '@/components/3D/Canvas';
import ParticlesComponent from '@/components/particles';
import { EditIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { CreateGameCallbackType, Game, Player } from '@/types/Server';

export default function Home() {

    // Hooks
    const [name, setName] = useState<string>('')
    const [room, setRoom] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [pfpHover, setPfpHover] = useState<boolean>(false)
    const [view, setView] = useState<string>('home')
    const [image, setImage] = useState<string>('')

    // Refs
    const inputRef = useRef<HTMLInputElement>(null)

    // Router
    const router = useRouter()

    // Socket data
    const socketData = useContext(SocketContext)

    function triggerInput() {
        inputRef.current?.click()
    }

    function onFileChange(e: any) {
        const file = e.target.files[0];
        onImageChange(file)
        setPfpHover(false)
    }

    function onImageChange (file: any) {

        if (!file) {
            //Socket.io.emit('update-picture', null)
            setImage('')
            return
        }

        const blob = new Blob([file], {type: file.type})
        const url = URL.createObjectURL(blob)
        
        //Socket.io.emit('update-picture', url)
        setImage(url)
    }

    function createRoom () {
        setLoading(true);
        const socket = socketData.socket;

        socket?.emit('create-room', 
            name,
            image,
            (data: CreateGameCallbackType) => {
                setLoading(false);

                const game: Game = {
                    code: data.processedCode as string,
                    players: data.players as Player[],
                    host_id: data.host_id as string,
                    client_id: socket.id as string,
                    status: data.room_status as string,
                    private: data.isPrivate as boolean,
                    settings: data.settings as any,
                    words: [],

                    playerData: {
                        id: socket.id,
                        name: name,
                        image: image,
                        score: 0,
                        videoOn: false,

                    }
                }

                socketData.setGame(game);

                router.push(`/game`);
            }
        )

    }

    function joinGame () {
        setLoading(true);
        const socket = socketData.socket;

        socket?.emit('join-game', 
            name,
            room,
            image,
            (data: CreateGameCallbackType) => {
                if ( data.success === false ) {
                    setLoading(false);
                    return alert(data.message);
                }

                
                const game: Game = {
                    code: data.processedCode as string,
                    players: data.players as Player[],
                    host_id: data.host_id as string,
                    client_id: socket.id as string,
                    status: data.room_status as string,
                    private: data.isPrivate as boolean,
                    settings: data.settings as any,
                    words: [],

                    playerData: {
                        id: socket.id,
                        name: name,
                        image: image,
                        score: 0,
                        videoOn: false,

                    }
                }

                socketData.setGame(game);

                router.push(`/game`);
            }
        )
    }
        

    return (
        <Container
        as={Flex}
        h='100vh'
        justify={'center'}
        align={'center'}
        direction={'column'}
        gap={'3rem'}
        p={'32'}
        >
            <SlideFade
            in={true}
            >
                <Flex
                direction={'column'}
                align={'center'}
                zIndex={1000}
                p={'2rem'}
                gap={'2rem'}
                w='sm'
                bg={'white'}
                backdropFilter={'blur(10px)'}
                borderRadius={'2rem'}
                >
                    <Image
                    src='/faceade.svg'
                    alt='Faceade logo'
                    width={500}
                    height={500}
                    className={'logo-rotate'}
                    />

                    {
                        view === 'home' ? (
                             <Flex
                            direction={'column'}
                            gap={'2rem'}
                            >
                                <Input
                                placeholder={'Enter name'}
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                />
                                <Flex
                                w='full'
                                justify={'center'}
                                gap={'2rem'}
                                >
                                    <PrimaryButton 
                                    size={'lg'}
                                    onClick={() => setView('join')}
                                    >
                                        Join Room
                                    </PrimaryButton>
                                    <PrimaryButton
                                    onClick={() => setView('create')}
                                    size={'lg'}
                                    >
                                        Create Room
                                    </PrimaryButton>
                                </Flex>
                            </Flex>
                        ) :
                        (
                            <Flex
                            w={'full'}
                            direction={'column'}
                            gap={'2rem'}
                            justify={'center'}
                            align={'center'}
                            >
                                {
                                    view === 'join' ? (
                                        <Input
                                        placeholder={'Enter room code'}
                                        fontWeight={'bold'}
                                        value={room}
                                        onChange={(e: any) => setRoom(e.target.value)}
                                        />
                                    ) : null
                                }
                                
                                <Flex
                                align={'center'}
                                w='full'
                                justify={'space-around'}
                                >
                                    <Icon
                                    alignSelf={'flex-start'}
                                    as={ArrowBackIcon}
                                    w={12}
                                    h={12}
                                    p={'2'}
                                    rounded={'full'}
                                    transition={'all 0.2s ease-in-out'}
                                    _hover={{
                                        cursor: 'pointer',
                                        bg: 'gray.200',
                                    }}

                                    onClick={() => setView('home')}
                                    
                                    />
                                    <Heading
                                    size={'lg'}
                                    >
                                        Profile picture
                                    </Heading>
                                </Flex>
                                
                                <Flex
                                position={'relative'}
                                gap={'2rem'}
                                >
                                    <Avatar
                                    size={'2xl'}
                                    transition={'all 0.2s ease-in-out'}
                                    bg={'gray.400'}
                                    _hover={{
                                        cursor: 'pointer',
                                        opacity: 0.8,
                                        filter: 'brightness(0.8)',
                                    }}
                                    src={image}
                                    dropShadow={'md'}
                                    onClick={triggerInput}
                                    onMouseEnter={() => setPfpHover(true)}
                                    onMouseLeave={() => setPfpHover(false)}
                                    />

                                    <Flex
                                    pointerEvents={'none'}
                                    position={'absolute'}
                                    top={'0'}
                                    right={'0'}
                                    display={pfpHover ? 'flex' : 'none'}
                                    w={'full'}
                                    h={'full'}
                                    justify={'center'}
                                    align={'center'}
                                    >
                                        <Icon
                                        as={EditIcon}
                                        w={8}
                                        h={8}
                                        onClick={triggerInput}
                                        />
                                    </Flex>

                                </Flex>
                                {
                                    image !== '' && (
                                        <ButtonWithoutScaling
                                        bg={'red.500'}
                                        color={'white'}
                                        onClick={() => onImageChange(null)}
                                        >
                                            Remove image
                                        </ButtonWithoutScaling>
                                    )
                                }
                                <input
                                onChange={onFileChange}
                                className={'hidden'}
                                ref={inputRef}
                                type={'file'}
                                accept='image/*'
                                />
                                <ButtonWithoutScaling
                                w='full'
                                size={'lg'}
                                isLoading={loading}
                                onClick={
                                    view === 'join' ? (
                                        joinGame
                                    ) : (
                                        createRoom
                                    )
                                }
                                >
                                    {
                                        view === 'join' ? (
                                            'Join room'
                                        ) : (
                                            'Create room'
                                        )
                                    }
                                </ButtonWithoutScaling>
                            </Flex>
                        )
                    }
                   
                    
                </Flex>
                
            </SlideFade>
            
            <ParticlesComponent />
           
        </Container>
    )
}
