'use client';

import React, { Component } from 'react';
import Chat from '@/components/Chat';
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

    render () {
        console.log(Socket.Game)
        return (
            <div className="bg-primary-light">
                {Socket.Game.code}
                {this.state.isInWaitingRoom ? <h1>Waiting room</h1> : null}
                <h1>GameView</h1>
                <Chat />
            </div>
        )
    }
}