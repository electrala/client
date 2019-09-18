import React, { Component } from 'react';
import '../../../css/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Gallery from '../../Gallery/Gallery';
import Signup from '../../Signup/Signup';
import Login from '../../Login/Login';
import SignUp from '../'

import logo from './images/ElectraLogo.png';

export default class Navbar extends Component {
  render() {
    return (
    <Router>
      <div id="navbar-container">
         <header>
           <nav>
             <ul>
               <li id="logo">
                 <Link to="/"
                   ><img
                     id="logo-img"
                    src={logo}
                    alt="Electra Logo"
                /></Link>
              </li>
              <li id="critiques"><Link to="/" >Critiques</Link></li>
              <li id="gallery"><Link to="/">Gallery</Link></li>
              <li id="profile"><Link to="/signup">Signup</Link></li>
            </ul>
          </nav>
        </header>
      </div>

      <Route exact path="/" component={Gallery} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
  
      </Router>
    )
  }
}
