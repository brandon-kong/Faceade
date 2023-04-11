'use client';

import React, { Component } from 'react';

// Element components
import Button from '@/components/Input/Button';
import Chat from '@/components/Chat';
import PlayerProfile from '@/components/PlayerProfile';
import PlayerList from '@/components/PlayerList';

// Client components
import Socket from '@/client/Socket';

import Router from 'next/router'

export default class GameView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: '',
            isInWaitingRoom: true,
            game: Socket.Game
        };
    }

    componentDidMount() {
        if (!Socket.Game) {
            Router.push('/');
        }
    }

    startGame = () => {
        Socket.io.emit('start-game', Socket.Game.code, ({success, status}) => {
            if (success) {
                this.setState({
                    status: status
                })
            }
        })
    }

    render () {

        return (
            <div className="bg-primary-light">
                {
                    this.state.game ?
                    (
                        <>
                            http://localhost:3000/?={Socket.Game.code}
                        </>
                        
                    )
                    :
                    null
                }
                {this.state.isInWaitingRoom ? <h1>Waiting room</h1> : null}
                <h1>GameView</h1>
                <Chat />
                <Button onClick={this.startGame.bind(this)} value="START GAME"/>
                <PlayerList />
            </div>
        )
    }
}