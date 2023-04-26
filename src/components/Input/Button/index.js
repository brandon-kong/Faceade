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
                <input type="button" value={this.props.value || 'Button'} onClick={this.handleClick} className={"w-full rounded h-12 bg-primary button " + styles['input'] + ' ' + this.props.color || 'bg-primary'} />
            </div>
        )
    }
}