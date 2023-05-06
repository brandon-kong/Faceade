import React, { Component } from 'react';

// Element components
import { faUser, faClock, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Select, Button } from '@chakra-ui/react'

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

            isDrawing: false,
            prevPos: { offsetX: 0, offsetY: 0 },
            strokeStyle: '#000',
            tool: 'pencil',
            backgroundColor: '#fff',
            displayColorPicker: false,
            displayBackgroundColorPicker: false,
            word: '',
            isPlayerDrawing: false,
            round: Socket.Game.round,
            timeLeft: (Socket.Game.timeout / 1000),
            gameEnded: false,
      
            settings : Socket.Game.settings
        }

        this.onMouseDown = this.onMouseDown.bind(this)
        //this.onMouseMove = this.onMouseMove.bind(this)
        //this.stopDrawing = this.stopDrawing.bind(this)
        //this.reDrawOnCanvas = this.reDrawOnCanvas.bind(this)
        //this.clearCanvas = this.clearCanvas.bind(this)
        //this.handleDrawingData = this.handleDrawingData.bind(this)

        Socket.io.on('settings-changed', this.onSettingServerChange.bind(this))
    }

    onMouseDown (e) {
        const { offsetX, offsetY } = e.nativeEvent
        this.setState({ isDrawing: true, prevPos: { offsetX, offsetY } })
    }

    startGame = () => {
        Socket.io.emit('start-game');
    }

    changePlayerCount = (e) => {
        Socket.io.emit('change-player-count', e.target.value);
    }

    onSettingsChange = (e) => {
        Socket.io.emit('change-setting', e.target.name, e.target.value);
    }

    onSettingServerChange = (settings) => {
        Socket.Game.settings = settings;
        this.setState({settings: settings})
    }


    render () {
        if (Socket.Game === null) return <Redirect to='/'></Redirect>;
        return (
            <div className={['canvas relative rounded-md overflow-hidden h-full'].join(' ')}>
                <canvas className={[styles['canvas-board'], 'w-full bg-white '].join(' ')} width="800" height="600" id="canvas"></canvas>
                
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
                                <Dropdown disabled={!(Socket.Game.host_id === Socket.io.id)} onChange={this.onSettingsChange} value={this.state.settings.playerLimit} name='playerLimit' options={
                                    [...Array(20).keys()].map((i) => i+1).splice(1  ).reduce((obj, item) => {
                                        obj[item] = item;
                                        return obj;
                                    }, {
                                        0: 'Unlimited'

                                    })
                                }/>
                            </div>
                        </div>
                        <div className='flex items-center justify-between px-20 text-2xl bg-gray-100 dark:bg-gray-900 rounded-md h-14 text-black     font-bold'>
                            <div className='flex items-center justify-center text-xl'>
                                <FontAwesomeIcon className='text-black dark:text-white w-7 pr-2' icon={faLanguage}></FontAwesomeIcon><span className='text-black dark:text-white'>Language</span>
                            </div>
                            <div className='text-lg text-black dark:text-white'>
                                <Dropdown disabled={!(Socket.Game.host_id === Socket.io.id)} name='language' options={
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
                                <Dropdown disabled={!(Socket.Game.host_id === Socket.io.id)} name='timeLimit' onChange={this.onSettingsChange} value={this.state.settings.timeLimit} options={
                                    {
                                        15: '15 seconds',
                                        30: '30 seconds',
                                        45: '45 seconds',
                                        60: '60 seconds',
                                        75: '75 seconds',
                                        90: '90 seconds',
                                        105: '105 seconds',
                                        120: '120 seconds',
                                    }
                                }/>
                            </div>
                        </div>
                        {Socket.Game.host_id === Socket.io.id ? <Button onClick={this.startGame.bind(this)} h='14' size='lg' colorScheme='green'>Start</Button> : null}
                    </div>
                    
                }
            </div>
        )
    }
}