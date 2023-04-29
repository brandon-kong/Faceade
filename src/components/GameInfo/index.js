import React, { Component } from 'react';

import Socket from '@/client/Socket';
import styles from '@/styles/components/GameInfo/index.module.css'

export default class GameInfo extends Component {
    constructor (props) {
        super();

        this.state = {
            
        }
    }

    render () {
        return (
            <div className={['game-info bg-gray-100 dark:bg-gray-800 rounded-md'].join(' ')}>
                <h1>Game Code: {this.props.code}</h1>
                <br />
                { Socket.io.id }
            </div>
        )
    }
}