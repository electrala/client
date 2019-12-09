import React, { Component } from 'react';
import '../../../css/style.css';
import './Navbar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './images/ElectraLogo.png';
import ProfilePic from '../../Profile/ProfilePic';


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
  }

  /**
   * This handles clicking on the signup/login button, which toggles the signup/login modal.
   * @param {object} event This is the event triggered by clicking the button. 
   */
  handleClick = event => {
    event.preventDefault();
    this.props.showLoginModal(event);
  }

  render() {
    return (
      // From the header down, I changed the routing of the nav bar. We have the links here
      //but in the app is where the routes take place. 
      <header>
        <nav>
          <ul>


            <li id="logo">
              <Link to="/">
                <img id="logo-img" src={logo} alt="Electra Logo" />
              </Link>
            </li>

            {/* <li id="critiques"><Link to="/" >Critiques</Link></li>
            <li id="gallery"> <Link to="/">Gallery</Link> </li> */}
            {/* If the user is not signed in, show "user sign up", if user is signed in ""*/}

            {this.props.profilePic ?
              <li className="user-pic"> <ProfilePic userInfo={this.props.userInfo} showPic={this.props.profilePic} /> </li> :
              <div id="login-signup-container">
                <li>
                  <button id="login" className="signup" onClick={this.handleClick}>LogIn</button>
                </li>
                |
                <li>
                  <button id="signup" className="login" onClick={this.handleClick}>SignUp</button>
                </li>
              </div>
            }

          </ul>

        </nav>
      </header>
    )
  }
}
