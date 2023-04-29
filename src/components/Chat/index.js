import React, { Component, createRef } from 'react';
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

        this.chatRef = createRef();
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
        e.preventDefault();
        if (!Socket.io) return;
        if (this.state.message.length > 100) return;
        Socket.io.emit('send-message', this.state.message);
        Socket.Game.lastMessage = this.state.message;
        this.setState({ message: '' });
    }

    onMessageReceive = (name, id, message) => {
        this.setState({ messages: [...this.state.messages, {name: name, message: message, id: id}] });

        setTimeout(() => this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight, 100)
    }

    render() {
        let chatAsArray = this.state.messages.map((message, index) => 
            <li key={index} className={['break-words flex items-center whitespace-normal p-5 py-3 w-full rounded-md mt-2', Socket.io.id == message.id ? 'bg-slate-300 dark:bg-slate-500' : 'bg-gray-100 dark:bg-gray-700'].join(' ')}>
                <span className="break-words overflow-y-auto">{message.name}: {message.message}</span>
            </li>
        )

        return (
            <div className={["flex flex-col rounded-md w-72 p-3 bg-gray-100 dark:bg-gray-800", styles.chat].join(' ')}>
                <h1 className="text-2xl pb-5">Chat</h1>
                <ul ref={this.chatRef} className="grow h-14 overflow-y-auto">
                    {chatAsArray}
                </ul>
                <form className="flex bottom-3 w-full pt-5" onSubmit={this.sendMessage.bind(this)}>
                    <Textbox name="message" value={this.state.message} onChange={this.handleInputChange}/>
                    <button className='px-5' onClick={this.sendMessage.bind(this)}>Send</button>
                </form>
                
            </div>
        )
    }
}