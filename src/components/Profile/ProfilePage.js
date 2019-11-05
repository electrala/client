import React, { Component } from 'react';
import Pic from './bank_profile.png'

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                firstName: 'first name',
                lastName: 'last name',
                userName: 'user name',
                pronouns: 'pronoun',
                location: 'location',
                email: 'email',
                token: "userToken"
            }
        }
    }


    componentDidMount() {
        this.props.toggleUploadButton();
    }

    componentWillUnmount() {
        this.props.toggleUploadButton();
    }

    render() {


    render() {
        return (
            <div className="user">
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="container">
                    <div>
                    <div className="grid-container">
                        <div className='img item1'>
                            <img className="profilePhoto" src={Pic} alt="profilepic"></img>
                        </div>   
                        <br/>
                        <br/>
                        <br/>
                        <div className="userInfo item3">
                            <h4 className="info">{this.state.userInfo.firstName} {this.state.userInfo.lastName}</h4>
                            <br/>

                            <p className="info">{this.state.userInfo.userName}</p>
                            <br />
                            <p className="info">{this.state.userInfo.pronouns}</p>
                            <br />
                            <p className="info">{this.state.userInfo.location}</p>
                            <br />
                            <p className="info">{this.state.userInfo.email}</p>      
                        </div>

                        <div className="left item2" >
                            <ul className="profileNav">
                                <li>About</li>
                                <li>Gallery</li>
                                <li>Collections</li>
                            </ul>
                            <div className="active"></div>
                            <div className="row">

                                <br />

                            </div>
                            <div className="stats row item4">
                                <div className="stat col-xs-4" >
                                    <p className="number-stat">3,619</p>
                                    <p className="desc-stat">Followers</p>
                                </div>
                                <div className="stat col-xs-4">
                                    <p className="number-stat">42</p>
                                    <p className="desc-stat">Following</p>
                                </div>
                                <div className="stat col-xs-4" >
                                    <p className="number-stat">38</p>
                                    <p className="desc-stat">Uploads</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}