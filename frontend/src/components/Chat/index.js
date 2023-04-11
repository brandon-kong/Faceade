import React, { Component } from 'react';
import Socket from '@/client/Socket';


export default class Chat extends Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            message: '',
        }
    }

    componentDidMount() {
        if (!Socket.io) return;
        Socket.io.on('message-receive', this.onMessageReceive.bind(this))
    }

    componentWillUnmount() {
        if (!Socket.io) return;
        Socket.io.removeAllListeners('message-receive')
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMessage = () => {
        if (!Socket.io) return;
        Socket.io.emit('send-message', this.state.message);
        Socket.Game.lastMessage = this.state.message;
        this.setState({ message: '' });
    }

    onMessageReceive = (name, message) => {
        this.setState({ messages: [...this.state.messages, {name: name, message: message}] });
    }

    render() {
        let chatAsArray = this.state.messages.map((message, index) => 
            <li key={index}>
                <span>{message.name}: {message.message}</span>
            </li>
        )

        return (
            <div className="bg-primary-light">
                <h1>Chat</h1>
                <ul>
                    {chatAsArray}
                </ul>
                <input value={this.state.message} name="message" onChange={this.handleInputChange.bind(this)} type="text" placeholder="Type message" />
                <button onClick={this.sendMessage.bind(this)}>Send message</button>
            </div>
        )
    }
}