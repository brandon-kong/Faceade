import React, { Component } from 'react';

import styles from '@/styles/components/Input/Button/index.module.css'

export default class Button extends Component {
    constructor (props) {
        super();
        this.state = {
            value: ''
        }
    }

    handleClick = (e) => {
        if (this.props.onClick) this.props.onClick(e)
    }

    render () {
        return (
            <div className="flex items-center justify-center w-full">
                <input type="button" value={this.props.value || 'Button'} onClick={this.handleClick} className={"cursor-pointer transition-colors duration-200 w-full rounded h-12 bg-gray-200 hover:bg-gray-300 active:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-600" + ' ' + this.props.color || 'bg-primary'} />
            </div>
        )
    }
}