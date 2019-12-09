// Components
import Gallery from './Gallery/Gallery';
import Navbar from './common/Navbar/Navbar';
import UploadCrit from './UploadCrit/UploadCrit';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import axios from 'axios';

import ProfilePage from './Profile/ProfilePage';

// Styles
import './App.css';
import '../css/style.css';
import '../components/Modal/Modal.css';

// Libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import ReactModal from "react-modal";
import ReactGA from 'react-ga';

// Functions
import getLoggedInAlert from './lib/getLoggedInAlert';
import loginSuccessAlert from './lib/loginSuccessAlert';
import loginFailAlert from './lib/loginFailAlert';
import critiqueFailAlert from './lib/critiqueFailAlert';
import critiqueSuccessAlert from './lib/critiqueSuccessAlert';
import signUp from './lib/signUp';

// Analytics
ReactGA.initialize('UA-151580479-1');
ReactGA.pageview('/homepage');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrit: false,
      showLogin: false,
      showSignup: false,
      critiques: [],
      profilePic: false,
      userInfo: {},
      hideButton: false,
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  toggleUploadButton = () => {
    const { hideButton } = this.state
    this.setState({ hideButton: !hideButton })
  }

  /**
   * This function shows the profile pic displayed on nav
   * @param {object} event This is the event triggered after successfully logging in or signing up
   */
  showProfilePic = event => {
    event.preventDefault();
    this.setState({
      profilePic: true
    });
  };

  /**
   * The following 2 functions toggle the critique upload modal.
   * @param {object} event This is the event triggered by clicking the plus sign button
   */
  showCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: true
    });
    this.handleOpenModal();
  };

  closeCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: false
    });
    this.handleCloseModal();
  };

  /**
   * The following 2 function toggle the signup/login modal.
   * @param {object} event This is the event triggered by clicking the signup/login button
   */
  showLoginModal = event => {
    console.log(event.target.id);
    event.target.id === "login" ?
      this.setState({
        showLogin: true,
        showSignup: false,
      })
      :
      this.setState({
        showSignup: true,
        showLogin: false,
      })
      ;
    this.handleOpenModal();
  };

  closeLoginModal = event => {
    this.setState({
      showLogin: false,
      showSignup: false,
    });
    this.handleCloseModal();
  };

  /**
   * Uploads a critique to our critiques table on postgres.
   * Pushes the new critiques to the critiques array. (This array isn't currently
   * being used, but it might be useful for rendering critiques.)
   * @param {object} data This is the data from the critique upload form
   */
  uploadCrit = async data => {
    try {
      const new_crit = await axios.post(
        "https://electra-la-development.herokuapp.com/critiques/new",
        // "http://localhost:5000/critiques/new",
        data
      );
      const parsedCrit = JSON.parse(new_crit.config.data);
      // const crits = this.state.critiques;
      // crits.push(new_crit);
      this.setState({
        critiques: [...this.state.critiques, parsedCrit]
      });
      critiqueSuccessAlert();
      this.setState({ showCrit: false, showModal: false });

    } catch (error) {
      critiqueFailAlert();
    }
  };

  /**
   * Adds a user to our users table on postgres.
   * Logs a user in.
   * @param {object} data This is the data from the sign up form
   * Added a try catch, when user signs in, modal closes, when error, alert
   * Once user is signed in, change to photo on navbar.
   */
  signUp = async data => {
    try {
      const new_user = await axios.post('https://electra-la-development.herokuapp.com/users/register', data);
      const new_user_data = JSON.parse(new_user.config.data);
      console.log(new_user_data);
    } catch {
      alert("error");
    }
  }

  logout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      userInfo: {},
      profilePic: false
    });
  }

  /**
   * Checks to see if a user is in our users table and the passwords match.
   * If both are true, then the JWT is stored in local storage.
   * @param {object} data This is the data from the log in form
   */
  logIn = async data => {
    try {
      const result = await axios.post(
        "https://electra-la-development.herokuapp.com/users/login",
        // "http://localhost:5000/users/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("jwt", token);
      this.setToken(token);
      console.log(token);
      // Close the modal when you successfully login
      this.setState({
        profilePic: true
      });
      this.getUserById();
      this.closeLoginModal();
      loginSuccessAlert();

    } catch (err) {
      console.error(err);
      loginFailAlert();
    }
  };

  getUserById = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const decoded = jwt_decode(token);
      const current_time = new Date().getTime() / 1000;
      if (current_time > decoded.exp) {
        console.log(`token expired`);
      }
      const { data } = await axios.get(
        `https://electra-la-development.herokuapp.com/users/user/${decoded.id}`
        // `http://localhost:5000/users/user/${decoded.id}`
      );
      delete data.password;
      this.setState({ userInfo: data });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Sets the Authorization header to the JWT. This header will be used for
   * validation on the back end.
   * @param {string} token This is the JSON Web Token
   */
  setToken = (token = null) => {
    let tempToken = token;
    if (tempToken !== null) tempToken = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${tempToken}`;
  };

  componentDidMount() {
    // Get the current time to compare with the expiration of the jwt token
    const current_time = new Date().getTime() / 1000;
    // console.log("hello ", localStorage.getItem("jwt"));
    const token = localStorage.getItem("jwt");
    // if the token doesn't exist, skip the step
    if (token === null) {
      this.setState({ profilePic: false });
    } else {
      // decrypt the jwt token
      const decoded = jwt_decode(token);
      // if token is expired, don't let user use ANYTHING
      if (current_time > decoded.exp) {
        this.setState({ profilePic: false });
      } else {
        this.getUserById();
        this.setState({ profilePic: true });
      }
    }
  }

  render() {
    return (
      <Router>
        <Navbar showLoginModal={this.showLoginModal} profilePic={this.state.profilePic} userInfo={this.state.userInfo} />
        <Switch>
          <Route exact path='/' render={(props) => <Gallery userInfo={this.state.userInfo} />} />
          <Route exact path='/profile' render={(props) => <ProfilePage userInfo={this.state.userInfo} logout={this.logout} toggleUploadButton={this.toggleUploadButton} refreshUser={this.getUserById} />} />
        </Switch>
        <ReactModal
          className="um-component"
          overlayClassName="um-overlay"
          isOpen={this.state.showModal}
          contentLabel="Universal Modal"
          onRequestClose={this.state.showCrit ? this.closeCritModal : this.state.showLogin ? this.closeLoginModal : ''}
        >
          <div className="universal-modal">
            {this.state.showLogin ?
              <Login loginUser={this.logIn} />
              :
              this.state.showSignup ?
                <Signup createUser={this.signUp} />
                :
                this.state.showCrit ? <UploadCrit userInfo={this.state.userInfo} onUpload={this.uploadCrit} /> : <div></div>}
            <div className="modal-footer">
              <button onClick={this.state.showCrit ? this.closeCritModal : this.state.showLogin ? this.closeLoginModal : this.state.showSignup ? this.closeLoginModal : ''}>
                Close
            </button>
            </div>
          </div>
        </ReactModal>
        {!this.state.hideButton &&
          <div id="float-button">
            <img
              src={require("../img/custom-button.png")}
              onClick={!this.state.profilePic ? getLoggedInAlert : this.showCritModal}
              alt="plus sign for upload"
            />
          </div>
        }
      </Router>
    );
  }
}

export default App;