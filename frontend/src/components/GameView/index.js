import React, { Component } from 'react';

// Element components


// Client components


import Router from 'next/router';


export default class GameView extends Component {
    constructor (props) {
        super();

        this.state = props.state
    }

    render () {
        return (
            <div className="h-screen">
                <p>GAME SCREEN :d</p>
            </div>
        )
    }   
}