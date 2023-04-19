import React, { Component } from 'react';
import Button from '@/components/Input/Button';
import Textbox from '@/components/Input/Textbox';

import img from '@/assets/images/profile/avatar.png'
import styles from '@/styles/components/Input/ProfileImage/index.module.css'

import Socket from '@/client/Socket';

export default class Password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: ''
        };
    }

    onChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = () => {
        const password = this.state.password;
        this.props.onConfirm(password);
    }

    render () {
        return (
            <div className={'flex items-center justify-center flex-col absolute backdrop-blur-lg w-screen h-full ' + styles['bg']}>
                <div className="flex flex-col gap-5 items-center justify-center w-2/3 max-w-sm">
                    <Textbox onChange={this.onChange.bind(this)} value={this.props.value} placeholder="Enter your password" type="password" />
                    <Button onClick={this.onSubmit.bind(this)} value="Submit" />
                    <Button onClick={this.props.onCancel} color="bg-cancel" value="Go back" />
                </div>
            </div>
        )
    }
}