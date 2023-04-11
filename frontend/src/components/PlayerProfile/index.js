import React, { Component } from 'react';

import img from '@/assets/images/profile/avatar.png'

export default class PlayerProfile extends Component {
    constructor(props) {
        super();

        this.state = {
            image: props.image,
            name: props.name,
        }
    }

    render () {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src={this.state.image ? this.state.image : img.src} alt="Profile picture" className="w-20 h-20 rounded-full"/>
                    <h1 className="text-2xl font-semibold">{this.state.name}</h1>
                </div>
            </div>
        )
    }
}