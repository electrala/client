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
                    <div id="profile-img-nav" style={{ border: "2px solid var(--electra-cool)", height: "40px", width: "40px", borderRadius: "50%", margin: ".6em" }}>
                        <img id='profileImg' style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "50%" }} src={this.props.userInfo.userimages3location} alt='pic'>
                        </img>
                    </div>
                </Link>
            </div>
        )
    }
}