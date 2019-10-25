import React, { Component } from 'react';
import Pic from './bank_profile.png'
import axios from 'axios';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }

    }

    render() {
        return (
            <div className="user">
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="container">

                    <div className='img'>
                        <img className="photo" src={Pic} alt="profile pic" ></img>
                    </div>

                    <div className="row">

                        <div className="left col-lg-4">
                            <div >
                                <ul className="nav">
                                    <li>About</li>
                                    <li>Gallery</li>
                                    <li>Collections</li>

                                </ul>
                                <span className="follow">Follow</span>

                                <div className="active"></div>
                            </div>

                            <h4 className="name">{this.state.userInfo.firstName}</h4>
                            <br />
                            <p className="info">UI/UX Designer</p>
                            <br />
                            <p className="info">Los Angeles</p>

                            <div className="stats row">
                                <div className="stat col-xs-4" >
                                    <p className="number-stat">3,619</p>
                                    <p className="desc-stat">Followers</p>
                                </div>
                                <div className="stat col-xs-4">
                                    <p classNameName="number-stat">42</p>
                                    <p className="desc-stat">Following</p>
                                </div>
                                <div className="stat col-xs-4" >
                                    <p className="number-stat">38</p>
                                    <p className="desc-stat">Uploads</p>
                                </div>
                            </div>
                            <p className="desc">Hi ! My name is Ayana I'm a UI/UX Designer from LA</p>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
