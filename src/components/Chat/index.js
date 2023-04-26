import React, { Component } from 'react';
import Socket from '@/client/Socket';
import Textbox from '@/components/Input/Textbox';
import Button from '@/components/Input/Button';

import styles from '@/styles/components/Chat/index.module.css'

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
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMessage = (e) => {
        if (!Socket.io) return;
        e.preventDefault();
        Socket.io.emit('send-message', this.state.message);
        Socket.Game.lastMessage = this.state.message;
        this.setState({ message: '' });
    }

    onMessageReceive = (name, message) => {
        this.setState({ messages: [...this.state.messages, {name: name, message: message}] });
    }

    render() {
        let chatAsArray = this.state.messages.map((message, index) => 
            <li key={index} className='flex items-center p-5 w-full h-8 bg-slate-50 rounded-md mt-2'>
                <span>{message.name}: {message.message}</span>
            </li>
        )

        return (
            <div className={["bg-white rounded-md drop-shadow w-72 p-3", styles.chat].join(' ')}>
                <h1 className="text-2xl">Chat</h1>
                <ul>
                    {chatAsArray}
                </ul>
                <form className="fixed flex bottom-3" onSubmit={this.sendMessage.bind(this)}>
                    <Textbox name="message" value={this.state.message} onChange={this.handleInputChange}/>
                    <button className='px-5' onClick={this.sendMessage.bind(this)}>Send</button>
                </form>
                
            </div>
        )
    }
}