import React, { Component } from 'react';

// Element components
import PlayerList from '@/components/PlayerList';
import Chat from '@/components/Chat';
import Canvas from '@/components/Canvas';
import GameInfo from '@/components/GameInfo';

// Client components

import Socket from '@/client/Socket';


import Router from 'next/router';


export default class GameView extends Component {
    constructor (props) {
        super();

        this.state = props.state
    }

    render () {
        return (
            <div className="h-screen flex items-center justify-center bg">
                <div className="game">
                    <GameInfo code={Socket.Game.code} />
                    <Canvas />
                    <PlayerList dir='col' />
                    <Chat />
                </div>
            </div>
        )
    }   
}