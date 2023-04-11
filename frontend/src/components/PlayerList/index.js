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

        this.setState({
            players: Socket.Game.players
        })
    }

    onPlayerJoined = (name, id, picture) => {
        Socket.Game.players[id] = {
            name: name,
            id: id,
            picture: picture,
            score: 0,
        }

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
        console.log(picture)
        // TODO: DOESNT WORK
        //const blob = new Blob(picture, {type: 'image/png'})
        //console.log(blob)
        Socket.Game.players[id].picture = picture

        this.setState({
            players: Socket.Game.players
        })
    }

    render () {
        console.log(this.state.players)
        let playersItems = Object.keys(this.state.players).map(key =>
            
            <PlayerProfile key={key} image={this.state.players[key].picture} name={Socket.Game.playerData.id == key ? this.state.players[key].name + ' (YOU)': this.state.players[key].name}/>
      
          )

        Object.keys(this.state.players).map(key => {
            
            const picture = this.state.players[key].picture
            const b = new Blob([picture], {type: 'image/jpeg'})

            const url = URL.createObjectURL(b)
            this.state.players[key].picture = url
            //console.log(picture.src)
        })

        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Players</h1>
                <div className="flex flex-row items-center justify-center">
                    {playersItems}
                </div>
            </div>
        )
    }
}