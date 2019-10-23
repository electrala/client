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

  handleClick = event => {
    event.preventDefault(); 
    this.props.onSignup();
  }

  handleLoginClick = event => {
    this.props.onLogin(); 
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
                <button className="signup-login" onClick={this.handleClick}>Login/SignUp</button>
              </li>
  
            </ul>
          </nav>
        </header>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Router>
    )
  }
}
