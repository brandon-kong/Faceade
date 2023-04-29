import React, { Component } from 'react';

import styles from '@/styles/components/Input/Textbox/index.module.css'

export default class Textbox extends Component {
    constructor (props) {
        super();
        this.state = {
            value: props.value || ''
        }
    }

    handleChange = (e) => {
        if (this.props.onChange) this.props.onChange(e)
        this.setState({ value: e.target.value })
    }

    render () {
        return (
            <div className="flex items-center justify-center w-full">
                <input type="text" name={this.props.name || 'value'} placeholder={this.props.placeholder || "Text"} value={this.props.value} onChange={this.handleChange} className="transition-colors duration-200 w-full rounded h-12 p-5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600" autoComplete='off' />
            </div>
        )
    }
}