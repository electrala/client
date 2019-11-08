import React from 'react';
import './App.css';
import '../css/style.css';
import '../components/Modal/Modal.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Gallery from './Gallery/Gallery';
import Navbar from './common/Navbar/Navbar';
import UploadCrit from './UploadCrit/UploadCrit';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import axios from 'axios';
import ProfilePage from './Profile/ProfilePage';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import jwt_decode from 'jwt-decode';
import ReactModal from "react-modal";
const MySwal = withReactContent(Swal);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrit: false,
      showLogin: false,
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

  loginSuccessAlert = event => {
    MySwal.fire({
      title: 'Successful Login!',
      icon: 'success',
      type: null,
      confirmButtonText: 'Close',
      text: 'You are all set to do amazing things',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
  };

  loginFailAlert = event => {
    MySwal.fire({
      title: 'Login Failed',
      icon: 'error',
      type: null,
      confirmButtonText: 'Close',
      text: 'Try again!',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
  };

  critiqueFailAlert = event => {
    MySwal.fire({
      title: 'Critique Failed to upload!',
      icon: 'error',
      type: null,
      confirmButtonText: 'Close',
      text: 'Try again!',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
  };

  critiqueSuccessAlert = event => {
    MySwal.fire({
      title: 'Critique has successfully uploaded!',
      icon: 'success',
      type: null,
      confirmButtonText: 'Close',
      text: 'Try again!',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
  };

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
    this.setState({
      showLogin: true
    });
    this.handleOpenModal();
  };

  closeLoginModal = event => {
    this.setState({
      showLogin: false
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
        "https://electra-la-2019.herokuapp.com/critiques/new",
        data
      );
      const crits = this.state.critiques;
      crits.push(new_crit);
      this.setState({
        critiques: crits
      });
      this.critiqueSuccessAlert();
      this.setState({ showCrit: false });
    } catch (error) {
      this.critiqueFailAlert();
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
      const new_user = await axios.post('https://electra-la-2019.herokuapp.com/users/register', data);
      const new_user_data = JSON.parse(new_user.config.data);
      console.log(new_user_data);
      this.closeLoginModal()
      this.setState({
        profilePic: true
      });
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
        "https://electra-la-2019.herokuapp.com/users/login",
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
      this.closeLoginModal();
      this.loginSuccessAlert();
      this.getUserById();

    } catch (err) {
      console.error(err);
      this.loginFailAlert();
    }
  };

  getUserById = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const decoded = jwt_decode(token);
      const { data } = await axios.get(
        `https://electra-la-2019.herokuapp.com/users/user/${decoded.id}`
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
    this.getUserById();
    if (localStorage.getItem("jwt") !== null) {
      this.setState({ profilePic: true });
    }
  }

  render() {
    return (
      <Router>
        <Navbar onSignup={this.showLoginModal} profilePic={this.state.profilePic} />
        <Switch>
          <Route exact path='/' component={Gallery} />
          <Route exact path='/profile' render={(props) => <ProfilePage userInfo={this.state.userInfo} logout={this.logout} toggleUploadButton={this.toggleUploadButton} />} />
        </Switch>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Universal Modal"
          onRequestClose={this.state.showCrit ? this.closeCritModal : this.state.showLogin ? this.closeLoginModal : ''}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(65, 159, 161, 0.85)"
            },
            content: {
              position: "absolute",
              top: "20%",
              left: "20%",
              right: "20%",
              bottom: "15%",
              border: "none",
              background: "var(--electra-white)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "20px",
              outline: "none",
              padding: 0,
              boxShadow: "0px 4px 7px 0px rgba(0, 0, 0, 0.34)"
            }
          }}
        >
          <div className="universal-modal">
            {this.state.showLogin ? <div className="rows">
              <Login loginUser={this.logIn} />
              <div className="line-container"></div>
              <Signup createUser={this.signUp} />
            </div> :
              this.state.showCrit ? <UploadCrit userInfo={this.state.userInfo} onUpload={this.uploadCrit} /> : <div></div>}
            <div className="modal-footer">
              <button onClick={this.state.showCrit ? this.closeCritModal : this.state.showLogin ? this.closeLoginModal : ''}>
                Close
            </button>
            </div>
          </div>
        </ReactModal>

        {!this.state.hideButton &&
          <div id="float-button">
            <img
              src={require("./custom-button.png")}
              onClick={this.showCritModal}
              alt="plus sign for upload"
            />
          </div>}
      </Router>

    );
  }
}

export default App;
