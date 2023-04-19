'use client';

import React, { Component } from 'react';

// Element components
import Button from '@/components/Input/Button';
import Chat from '@/components/Chat';
import PlayerList from '@/components/PlayerList';
import Redirect from '@/components/Redirect';
import GameViewComponent from '@/components/GameView';
import Textbox from '@/components/Input/Textbox';

// Client components
import Socket from '@/client/Socket';

import Router from 'next/router';

export default class GameView extends Component {

    constructor(props) {
        super(props);

        if (Socket.Game === undefined) {
            return
        }

        this.state = {
            status: Socket.Game.status,
            isInWaitingRoom: true,
            game: Socket.Game,
            clientVideoOn: false,
            private: Socket.Game.private,
            password: Socket.Game.password,
        };

        Socket.io.on('game-start', this.onGameStarted.bind(this))
        Socket.io.on('host-changed', this.hostChanged.bind(this))
        Socket.io.on('', this.onGameEnded.bind(this))
    }

    componentDidMount() {
        this.setState({
            game: Socket.Game
        })
    }

    startGame = () => {
        Socket.io.emit('start-game', Socket.Game.code)
    }

    onGameStarted = (rounds, time) => {
        if (Socket.Game.status == "running") {
            // no need to change state if game is already running
            return;
        }

        Socket.Game.status = "running";
        Socket.Game.round = 1;
        Socket.Game.rounds = rounds;
        Socket.Game.roundTime = time;

        this.setState({
            status: Socket.Game.status,
            isInWaitingRoom: false,
        });

        console.log('Game started!');
    }

    onGameEnded = () => {

    }

    toggleVideo = () => {
        this.setState({
            clientVideoOn: !this.state.clientVideoOn
        })

        Socket.io.emit('video-changed', this.state.clientVideoOn)
        Socket.Game.players[Socket.Game.client_id].videoOn = this.state.clientVideoOn;
        Socket.Game.playerData.videoOn = this.state.clientVideoOn;
    }

    hostChanged = (host_id) => {
        Socket.Game.host_id = host_id;
        this.setState({
            game: Socket.Game
        })

        
    }

    render () {

        if (!Socket.Game) return <Redirect to="/" />

        if (Socket.Game.status == "running") {
            return <GameViewComponent state={this.state} />
        }
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

                {
                    (Socket.Game && Socket.Game.host_id == Socket.Game.client_id) ? (
                        <>
                            <input type="checkbox" checked={this.state.private} onChange={(e) => {
                                this.setState({
                                    private: e.target.checked
                                })
            
                                Socket.io.emit('change-private', e.target.checked)
                            }} />
                            <label htmlFor="private">Private</label>

                            {
                                this.state.private ?
                                <Textbox value={this.state.password} onChange={(e) => {Socket.io.emit('change-password', e.target.value)} } placeholder="Password" type="password" />
                                :
                                null
                            }
                        </>
                    )
                    :
                    null
                }
                
                <br />
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