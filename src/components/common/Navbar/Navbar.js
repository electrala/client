import React, { Component } from 'react';
import '../../../css/style.css';
import logo from './images/ElectraLogo.png';

export default class Navbar extends Component {
  render() {
    return (
      <div id="navbar-container">
        <header>
          <nav>
            <ul>
              <li id="logo">
                <a href="/"
                  ><img
                    id="logo-img"
                    src={logo}
                    alt="Electra Logo"
                /></a>
              </li>
              <li id="critiques"><a href="/">Critiques</a></li>
              <li id="gallery"><a href="/">Gallery</a></li>
              <li id="profile"><a href="pages/userSignup.html">Signup</a></li>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}
