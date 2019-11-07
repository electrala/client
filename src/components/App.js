import React from 'react';
import './App.css';
import '../css/style.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';
import Navbar from './common/Navbar/Navbar';
import UploadCrit from './UploadCrit/UploadCrit';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import axios from 'axios';
import ProfilePage from './Profile/ProfilePage';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import jwt_decode from 'jwt-decode';
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
      hideButton: false
    };
  }

  loginSuccessFunction = event => {
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
  };

  closeCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: false
    });
  };

  /**
   * The following 2 function toggle the signup/login modal.
   * @param {object} event This is the event triggered by clicking the signup/login button
   */
  showLoginModal = event => {
    this.setState({
      showLogin: true
    });
  };

  closeLoginModal = event => {
    this.setState({
      showLogin: false
    });
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
      window.alert(`You're critique has been uploaded!`);
      this.setState({ showCrit: false });
    } catch (error) {
      alert('Critique upload failed!');
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
      this.loginSuccessFunction();
      this.getUserById();
    
    } catch (err) {
      window.alert(`Couldn't login!!!`);
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
        this.setState({userInfo:data});
      } catch(err) {
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
      this.setState({profilePic: true});
    }
  }

  render() {
    return (
      <Router>
        <Navbar onSignup={this.showLoginModal} profilePic={this.state.profilePic} />
        <Modal show={this.state.showCrit} onClose={this.closeCritModal}>
          <UploadCrit onUpload={this.uploadCrit} />
        </Modal>

        <Switch>
          <Route exact path='/' component={Gallery} />
          <Route exact path='/profile' render={(props) => <ProfilePage userInfo={this.state.userInfo} logout={this.logout} toggleUploadButton={this.toggleUploadButton} />} />
        </Switch>

        <Modal show={this.state.showLogin} onClose={this.closeLoginModal}>
          <div className="rows">
            <Login loginUser={this.logIn} />
            <div className="line-container"></div>
            <Signup createUser={this.signUp} />
          </div>
        </Modal>
        
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
