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
        Socket.io.on('announcement-receive', this.onAnnouncementReceive.bind(this))        
    }

    componentWillUnmount() {
        if (!Socket.io) return;
        Socket.io.removeAllListeners('message-receive')
        Socket.io.removeAllListeners('announcement-receive')
    }

    handleInputChange = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMessage = (e) => {
        e.preventDefault();
        if (!Socket.io) return;

        Socket.io.emit('send-message', this.state.message);
        Socket.Game.lastMessage = this.state.message;
        this.setState({ message: '' });
    }

    onMessageReceive = (name, id, message) => {
        this.setState({ messages: [...this.state.messages, {name: name, message: message, id: id}] });

        setTimeout(() => this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight, 100)
    }

    onAnnouncementReceive = (message, error_id) => {
        this.setState({ messages: [...this.state.messages, {message: message, isAnnouncement: true, id: error_id}] });

        setTimeout(() => this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight, 100)
    }

    render() {

        const codeColors = {
            '0': 'bg-teal-300 dark:bg-teal-800 text-black dark:text-white', // player joined
            '1': 'bg-orange-400 dark:bg-orange-800 text-black dark:text-white', // player left
            '200': 'bg-green-300 dark:bg-green-800 text-black dark:text-white', // success message
            '403': 'bg-red-400 dark:bg-red-800 text-black dark:text-white', // error message
        }

        let chatAsArray = this.state.messages.map((message, index) => 
            <li key={index} className={['transition-opacity chat-anim break-words flex items-center whitespace-normal p-3 py-2 w-full rounded-md mt-2', !message.isAnnouncement && Socket.io.id == message.id ? 'bg-slate-300 dark:bg-slate-500' : !message.isAnnouncement ?'bg-gray-200 dark:bg-gray-700' : codeColors[message.id]].join(' ')}>
                <span className="text-sm break-words overflow-y-auto"> 
                {message.isAnnouncement ? null : <strong>{message.name}:</strong>} {message.message}
                </span>
            </li>
        )

        return (
            <div className={["flex dark:bg-scroll flex-col rounded-md w-full lg:w-72 p-3 bg-gray-100 dark:bg-gray-800 chat"].join(' ')}>
                <h1 className="text-2xl pb-2">Chat</h1>
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