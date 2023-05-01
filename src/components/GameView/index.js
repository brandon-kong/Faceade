import React, { Component } from 'react';

// Element components
import PlayerList from '@/components/PlayerList';
import Chat from '@/components/Chat';
import Canvas from '@/components/Canvas';
import GameInfo from '@/components/GameInfo';
import Vid from '@/components/Vid';
import IconLabel from '@/components/Brand/IconLabel';
import GameIcon from '@/components/Brand/GameIcon';

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
            <div className="w-full min-h-screen h-fit p-5 flex items-center justify-center bg">
                <div className="game">
                    <GameInfo code={Socket.Game.code} />
                    <Canvas inGame={Socket.Game.status === 'running'}/>
                    <PlayerList dir='col' />
                    <Chat />
                    <Vid />
                    <GameIcon />
                </div>
            </div>
        )
    }   
}