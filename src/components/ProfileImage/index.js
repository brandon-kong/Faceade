import React, { Component } from 'react';
import Image from 'next/image'
import Button from '@/components/Input/Button';
import Container from '@/components/Container';

import img from '@/assets/images/profile/avatar.png'
import styles from '@/styles/components/Input/ProfileImage/index.module.css'

import Socket from '@/client/Socket';

export default class ProfileImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            game: null
        };
    }

    handleUploadClick = () => {
        const fileInput = document.querySelector('input[type="file"]');
        fileInput.click();
    }

    uploadImage = (e) => {
        const file = e.target.files[0];
       
        // TODO: Check that the file is an APPROPRIATE, non-NSFW image
        this.setState({ image: file });

        if (Socket.Game) {
            Socket.Game.playerData.picture = file;
        }

        if (this.props.onChange) {
            this.props.onChange(file);
        }
    }

    removeImage = () => {
        this.setState({ image: null });

        if (Socket.Game) {
            Socket.Game.playerData.picture = null;
        }

        if (this.props.onChange) {
            this.props.onChange(null);
        }
    }

    render () {
        return (
            <div className={'z-10 flex items-center justify-center flex-col absolute backdrop-blur-lg w-screen h-full ' + styles['bg']}>
                <div className="flex flex-col gap-5 items-center justify-center w-2/3 max-w-sm">
                    <input onChange={this.uploadImage.bind(this)} type="file" accept="image/jpeg, image/png, image/jpg" hidden/>
                    <div className="overflow-hidden flex items-center justify-center w-32 h-32 rounded-full bg-white">
                        <img className="h-full w-full" src={this.state.image ? URL.createObjectURL(this.state.image) : img.src} alt="Profile" />
                    </div>
                    {
                        this.state.image ? 
                            (
                                <>
                                    <Button onClick={this.removeImage.bind(this)} value="Remove image" />
                                </>
                            )
                        : null
                    }
                    <Button onClick={this.handleUploadClick.bind(this)} value="Upload" />
                    <Button onClick={this.props.onConfirm} color="bg-confirm" value={this.state.image ? "Continue with profile picture" : "Continue without profile picture"} />
                    <Button onClick={this.props.onCancel} color="bg-cancel" value="Go back" />
                </div>
            </div>
        )
    }
}