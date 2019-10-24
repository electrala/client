import React, { Component } from 'react';
import '../../../css/style.css';
import './Navbar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from '../../Signup/Signup';
import Login from '../../Login/Login';
import logo from './images/ElectraLogo.png';

export default class Navbar extends Component {
  constructor (props) {
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
    this.props.onSignup();
  }

  render() {
    return (
      <Router>
        <header>
          <nav>
            <ul>
              <li id="logo">
                <Link to="/"><img id="logo-img" src={logo} alt="Electra Logo" /></Link>
              </li>
              <li id="critiques">
                <Link to="/" >Critiques</Link>
              </li>
              <li id="gallery">
                <Link to="/">Gallery</Link>
              </li>
              <li id="profile">
                <button className="signup-login" onClick={this.handleClick}>Signup | Login</button>
              </li>
            </ul>
          </nav>
        </header>
      </Router>
    )
  }
}
