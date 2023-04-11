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

    onPlayerJoined = (name, id, image) => {
        Socket.Game.players[id] = {
            name: name,
            id: id,
            picture: image,
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

        console.log(Socket.Game.playerData.id, id, picture)
        Socket.Game.players[id].picture = picture
        this.setState({
            players: Socket.Game.players
        })

        this.forceUpdate()
    }

    getUpdatedPlayerProfile = (id, picture) => {
        return <PlayerProfile key={id} image={picture} name={Socket.Game.playerData.id == id ? Socket.Game.players[id].name + ' (YOU)': Socket.Game.players[id].name}/>
    }

    render () {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Players</h1>
                <div className="flex flex-row items-center justify-center">
                    {
                        Object.keys(this.state.players).map(key =>
                            this.getUpdatedPlayerProfile(key, this.state.players[key].picture)
                          )
                    }
                </div>
            </div>
        )
    }
}