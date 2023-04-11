import React, { Component } from 'react';

import styles from '@/styles/components/Input/Textbox/index.module.css'

export default class Textbox extends Component {
    constructor (props) {
        super();
        this.state = {
            value: ''
        }
    }

    handleChange = (e) => {
        if (this.props.onChange) this.props.onChange(e)
        this.setState({ value: e.target.value })
    }

    render () {
        return (
            <div className="flex items-center justify-center w-full">
                <input type="text" name={this.props.name || 'value'} placeholder={this.props.placeholder || "Text"} value={this.state.value} onChange={this.handleChange} className={"w-full rounded h-12 p-5 " + styles['input']} />
            </div>
        )
    }
}