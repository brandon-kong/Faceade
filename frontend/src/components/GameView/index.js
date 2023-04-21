import React, { Component } from 'react';

// Element components


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
            <div className="h-screen">
                <h1>{Socket.Game && (Socket.Game.host_id == Socket.Game.client_id ? 'ur da host' : 'ur just a player')}</h1>
                <p>GAME SCREEN :d</p>
            </div>
        )
    }   
}