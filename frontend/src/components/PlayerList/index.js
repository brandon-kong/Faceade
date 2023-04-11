import React, { Component } from 'react';

import Socket from '@/client/Socket';
import PlayerProfile from '@/components/PlayerProfile';

// Util
import { arrayBufferToBase64 } from '@/util/game/Image';

export default class PlayerList extends Component {
    constructor() {
        super();

        this.state = {
            players: Socket.Game ? Socket.Game.players : {}
        }
    }

    componentDidMount() {
        if (!Socket.Game) return;
        Socket.io.on('player-joined', this.onPlayerJoined.bind(this))
        Socket.io.on('player-left', this.onPlayerLeave.bind(this))
        Socket.io.on('image-updated', this.onImageUpdated.bind(this))
    }

    onPlayerJoined = (name, id, picture) => {
        Socket.Game.players[id] = {
            name: name,
            id: id,
            picture: picture,
            score: 0,
        }

        console.log(Socket.Game.players)
        this.setState({
            players: Socket.Game.players
        })
    }

    onPlayerLeave = (name, id) => {
        delete Socket.Game.players[id]

        this.setState({
            players: Socket.Game.players
        })
    }

    onImageUpdated = (id, picture) => {
        Socket.Game.players[id].picture = picture

        this.setState({
            players: Socket.Game.players
        })
    }

    render () {
        let playersItems = Object.keys(this.state.players).map(key =>
            
            <PlayerProfile key={key} image={this.state.players[key].picture} name={this.state.players[key].name}/>
      
          )

        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Players</h1>
                <div className="flex flex-col items-center justify-center">
                    {playersItems}
                </div>
            </div>
        )
    }
}