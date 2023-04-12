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
            game: Socket.Game,
            clientVideoOn: false,
        };
    }

    componentDidMount() {
        if (!Socket.Game) {
            Router.push('/');
        }
        this.setState({
            game: Socket.Game
        })
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

    toggleVideo = () => {
        this.setState({
            clientVideoOn: !this.state.clientVideoOn
        })

        Socket.Game.players[Socket.Game.client_id].videoOn = this.state.clientVideoOn;
        Socket.Game.playerData.videoOn = this.state.clientVideoOn;
    }

    render () {

        return (
            <div className="bg-primary-light h-screen p-20">
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

                <button onClick={this.toggleVideo.bind(this)} >Video: {Socket.Game && Socket.Game.playerData.videoOn ? "on" : "off"}</button>
                <Chat />
                {
                    (Socket.Game && Socket.Game.host_id == Socket.Game.client_id) ? (
                        <Button onClick={this.startGame.bind(this)} value="START GAME"/>
                    )
                    :
                    null
                }
                <PlayerList />
            </div>
        )
    }
}