import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Pic from './bank_profile.png';
import header from './elect-banner.png';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }
    redirectLogout = () => {
        this.props.logout();
        this.setRedirect();
    }
    componentDidMount() {
        this.props.toggleUploadButton();
    }
    componentWillUnmount() {
        this.props.toggleUploadButton();
    }

    //  scrollFunction() {
    //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //       document.getElementById("header").style.fontSize = "30px";
    //     } else {
    //       document.getElementById("header").style.fontSize = "90px";
    //     }
    //   }

    render() {
        const { firstname, lastname, username, pronoun, location, email } = this.props.userInfo;
        return (
            <div className="user">
                <img className='wrapper-img' src={header} alt="Electra Header" />


                <div className="user-container">
                    <img className="profilePhoto" src={Pic} alt="profilepic"></img>

                    <h4 className="userName"> {firstname} {lastname}</h4>
                    <p className="userPronoun"> {pronoun}</p>
                    <p className="userLocation">{location}</p>

                    <button className="editButton">
                        Edit Profile
</button>
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
                        <div>
                            {this.renderRedirect()}
                            <button onClick={this.redirectLogout}>logout</button>
                        </div>
                    </div>
                </div>

            </div>




        )
    }
}