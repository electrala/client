import React, { Component } from 'react';
import Pic from './bank_profile.png'
import { Link } from 'react-router-dom';
import './Profile.css';


export default class ProfilePc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userData: false,
        }
    }

    render() {
        return (
            <div id="picture">
                <Link to='/profile'>
                    <img id='profileImg' src={this.props.userInfo.userimages3location} style={{ border: "2px solid var(--electra-cool)", maxHeight: "40px", borderRadius: "50%", margin: ".6em" }} alt='pic'>
                    </img>
                </Link>
            </div>
        )
    }
}