import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Socket from '@/client/Socket';

export default class Vid extends Component {
    constructor(props) {
        super();

        this.state = {
            clientVideoOn : Socket.Game.players[Socket.Game.client_id].videoOn,
        }
    }

    toggleVideo = () => {
        Socket.io.emit('video-changed', !this.state.clientVideoOn)
        this.setState({
            clientVideoOn: !this.state.clientVideoOn
        })
    }

    render () {
        return (
            <div className='text-xl bg-gray-100 dark:bg-gray-800 rounded-md w-full h-32 vid'>
                video: {this.state.clientVideoOn ? 'on' : 'off'}
                <button onClick={this.toggleVideo.bind(this)}>
                    <FontAwesomeIcon icon={this.state.clientVideoOn ? faVideo : faVideoSlash} className='dark:hover:text-red-500' />
                </button>
            </div>
        )
    }
        
}