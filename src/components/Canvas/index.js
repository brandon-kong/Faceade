import React, { Component } from 'react';

// Element components

// Client components

import styles from '@/styles/components/Canvas/index.module.css'

export default class Canvas extends Component {
    constructor (props) {
        super();

        this.state = {
            
        }
    }

    render () {
        return (
            <div className={[styles.canvas, 'relative rounded-md overflow-hidden h-fit w-full border-2 border-black'].join(' ')}>
                <canvas className={[styles['canvas-board'], 'w-full bg-white'].join(' ')} width="800" height="600" id="canvas"></canvas>
                <div className='text-black absolute top-0 left-0 z-10 bg-transparent w-full h-full'>asdf</div>
            </div>
        )
    }
}