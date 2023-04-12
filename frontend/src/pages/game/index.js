'use client';

import React, { Component } from 'react';

// Element components
import Button from '@/components/Input/Button';
import Chat from '@/components/Chat';
import PlayerList from '@/components/PlayerList';
import Redirect from '@/components/Redirect';
import GameViewComponent from '@/components/GameView';

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
        };

        Socket.io.on('game-start', this.onGameStarted.bind(this))
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

        Socket.Game.players[Socket.Game.client_id].videoOn = this.state.clientVideoOn;
        Socket.Game.playerData.videoOn = this.state.clientVideoOn;
    }

    render () {

        if (!Socket.Game) return <Redirect to="/" />

        if (Socket.Game.status == "running") {
            return <GameViewComponent />
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