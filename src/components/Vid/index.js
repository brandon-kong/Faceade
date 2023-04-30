import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faCameraRotate } from '@fortawesome/free-solid-svg-icons';

import Socket from '@/client/Socket';

export default class Vid extends Component {
    constructor(props) {
        super();

        this.state = {
            clientVideoOn : Socket.Game.players[Socket.Game.client_id].videoOn,
            cameraFlipped: false
        }
    }

    toggleVideo = () => {
        Socket.io.emit('video-changed', !this.state.clientVideoOn)
        this.setState({
            clientVideoOn: !this.state.clientVideoOn
        })
    }

    flipCamera = () => {
        Socket.io.emit('flip-camera', !this.state.cameraFlipped)
        this.setState({
            cameraFlipped: !this.state.cameraFlipped
        })
    }

    render () {
        return (
            <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md w-full h-32 vid'>
                <div className='flex flex-row gap-5'>
                    <button onClick={this.toggleVideo.bind(this)}>
                        <FontAwesomeIcon icon={this.state.clientVideoOn ? faVideo : faVideoSlash} className='w-8 dark:hover:text-red-500' />
                    </button>
                    <button onClick={this.flipCamera.bind(this)}>
                        <FontAwesomeIcon icon={faCameraRotate} className='w-8 dark:hover:text-red-500' />
                    </button>
                </div>
                
            </div>
        )
    }
        
}