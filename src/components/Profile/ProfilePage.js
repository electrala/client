import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Pic from './bank_profile.png';

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

    

    render() {
        const { firstname, lastname, username, pronoun, location, email } = this.props.userInfo;
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
                            <h4 className="info">name: {firstname} {lastname}</h4>
                            <br/>
                            <p className="info">username: {username}</p>
                            <br />
                            <p className="info">pronoun: {pronoun}</p>
                            <br />
                            <p className="info">location: {location}</p>
                            <br />
                            <p className="info">email: {email}</p>      
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
                </div>
                </div>
            </div>
        )
    }
}