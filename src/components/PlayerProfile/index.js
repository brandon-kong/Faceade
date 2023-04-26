import React, { Component, createRef } from 'react';

import Socket from '@/client/Socket';
import img from '@/assets/images/profile/avatar.png'

export default class PlayerProfile extends Component {
    constructor(props) {
        super();

        this.state = {
            image: props.image,
            name: props.name,
            id: props.id,
            videoOn: props.videoOn,
            Game: Socket.Game,
        }

        this.videoRef = createRef();

    }

    componentDidMount () {
        if (!Socket.Game) return;

        this.configureVideoState();
    }

    componentDidUpdate () {
        this.configureVideoState();
    }

    configureVideoState = () => {
        if (!Socket.Game) return;

        var localstream;

        if (Socket.Game.players[this.state.id].videoOn) {
            if (Socket.Game.client_id === this.state.id) {
                navigator.mediaDevices.getUserMedia({ video: {
                    width: { min: 500, ideal: 500, max: 1000 },
                    height: { min: 500, ideal: 500, max: 1000 }
                }, audio: true })
                .then(stream => {
                    const video = this.videoRef
                    if (video && video.current) {
                        video.current.srcObject = stream;
                        localstream = stream;
                    }

                    
                    
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else {
                // TODO: Get video stream from server
                    
            }
        }
        else {
            const video = document.querySelector('video');
            if (video) video.srcObject = null;
            if (localstream) localstream.getTracks().forEach(track => track.stop());
        }
    }

    render () {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">

                    {
                        Socket.Game && Socket.Game.players[this.state.id].videoOn ?
                        <video ref={this.videoRef} className="w-36 h-36 bg-primary drop-shadow-lg rounded-full" autoPlay muted></video>
                        :
                        <img src={this.state.image ? this.state.image : img.src} alt="Profile picture" className="w-36 h-36 bg-primary drop-shadow-lg rounded-full"/>
                    }

                    <h1 className="text-md">{this.state.name}</h1>
                </div>
            </div>
        )
    }
}