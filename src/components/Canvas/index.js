import React, { Component } from 'react';

// Element components
import { faUser, faClock, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Select } from '@chakra-ui/react'

// Client components

import Socket from '@/client/Socket';
import styles from '@/styles/components/Canvas/index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    render () {
        return (
            <div className={['canvas relative rounded-md overflow-hidden h-fit border-2 border-black'].join(' ')}>
                <canvas className={[styles['canvas-board'], 'w-full bg-white'].join(' ')} width="800" height="600" id="canvas"></canvas>
                
                {
                    this.state.inGame ?
                    null
                    :
                    <div className={['absolute flex flex-col top-0 left-0 z-10 p-2 gap-2 bg-black opacity-80 w-full h-full'].join(' ')}>
                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faUser}></FontAwesomeIcon><span className='text-black dark:text-white'>Players</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Select className='' size="sm" placeholder='Select option' filled>
                                    
                                </Select>
                            </div>
                        </div>
                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faLanguage}></FontAwesomeIcon><span className='text-black dark:text-white'>Language</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Select className='' size="sm" placeholder='Select option' filled>
                                    
                                </Select>
                            </div>
                        </div>

                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faClock}></FontAwesomeIcon><span className='text-black dark:text-white'>Round time</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Select size="sm" placeholder='Select option' filled>
                                    
                                </Select>
                            </div>
                        </div>
                        <button onClick={this.startGame.bind(this)}>
                            Start
                        </button>
                    </div>
                }
            </div>
        )
    }
}