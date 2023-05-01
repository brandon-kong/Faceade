import React, { Component } from 'react';

// Element components
import { faUser, faClock, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Select } from '@chakra-ui/react'

import Dropdown from '@/components/Dropdown';

// Client components

import Socket from '@/client/Socket';
import styles from '@/styles/components/Canvas/index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Redirect from '@/components/Redirect';

export default class Canvas extends Component {
    constructor (props) {
        super();

        this.state = {
            inGame: props.inGame
        }
    }

    startGame = () => {
        Socket.io.emit('start-game');
    }

    changePlayerCount = (e) => {
        alert('ok')
        Socket.io.emit('change-player-count', e.target.value);
    }

    render () {
        if (Socket.Game === null) return <Redirect to='/'></Redirect>;
        return (
            <div className={['canvas relative rounded-md overflow-hidden h-fit border-2 border-black'].join(' ')}>
                <canvas className={[styles['canvas-board'], 'w-full bg-white'].join(' ')} width="800" height="600" id="canvas"></canvas>
                
                {
                    Socket.Game.status === 'running' ?
                    null
                    :
                    <div className={['absolute flex flex-col top-0 left-0 z-10 p-2 gap-2 bg-black opacity-80 w-full h-full'].join(' ')}>
                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faUser}></FontAwesomeIcon><span className='text-black dark:text-white'>Players</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Dropdown options={
                                    {
                                        '2': '2',
                                        '3': '3',
                                        '4': '4',
                                        '5': '5',
                                        '6': '6',
                                        '7': '7',
                                        '8': '8',
                                        '9': '9',
                                        '10': '10',
                                        '11': '11',
                                        '12': '12',
                                        '13': '13',
                                        '14': '14',
                                        '15': '15',
                                        '16': '16',
                                        '17': '17',
                                        '18': '18',
                                        '19': '19',
                                        '20': '20',
                                    }
                                }/>
                            </div>
                        </div>
                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faLanguage}></FontAwesomeIcon><span className='text-black dark:text-white'>Language</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Dropdown options={
                                    {
                                        'en': 'English',
                                    }
                                }/>
                            </div>
                        </div>

                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faClock}></FontAwesomeIcon><span className='text-black dark:text-white'>Round time</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Dropdown options={
                                    {
                                        '15': '15 seconds',
                                        '30': '30 seconds',
                                        '45': '45 seconds',
                                        '60': '60 seconds',
                                        '75': '75 seconds',
                                        '90': '90 seconds',
                                        '105': '105 seconds',
                                        '120': '120 seconds',
                                    }
                                }/>
                            </div>
                        </div>
                        <button className='text-red-200' onClick={this.startGame.bind(this)}>
                            Start
                        </button>
                    </div>
                }
            </div>
        )
    }
}