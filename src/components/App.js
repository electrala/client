import React from 'react';
import './App.css';
import '../css/style.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';
import Navbar from './common/Navbar/Navbar';
import UploadCrit from './UploadCrit/UploadCrit';
import Signup from './Signup/Signup';
import Login from './Login/Login'; 
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrit: false,
      showUser: false,
      showLogin: false,
      critiques: [],
    };
  }

  showCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: true,
    });
  }

  closeCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: false,
    })
  }

  showUserModal = event => {
    this.setState({
      showUser: true,
    });
  }


  closeUserModal = event => {
    this.setState({
      showUser: false,
    });
  }

  showLoginModal = event => {
    this.setState({
      showLogin: true, 
    });
  }

  closeLoginModal = event => {
    this.setState({
      showLogin: false,
    }); 
  }


  uploadCrit = async data => {
    const new_crit = await axios.post('http://localhost:5000/critiques/new', data);
    const crits = this.state.critiques;
    crits.push(new_crit);
    this.setState({
      critiques: crits,
    })
  }

  signUp = async data => {
    const new_user = await axios.post('http://localhost:5000/users/register', data);
    const new_user_data = JSON.parse(new_user.config.data);
    this.logIn(new_user_data);
  }

  logIn = async data => {
    const result = await axios.post('http://localhost:5000/users/login', data);
    const token = result.data.token;
    localStorage.setItem('jwt', token);
    this.setToken(token);
  }

  setToken = (token = null) => {
    let tempToken = token;
    if (tempToken !== null) tempToken = localStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = `Bearer ${tempToken}`;
  };

  render() {
    return (
      <Router>
        <Navbar onSignup={this.showLoginModal}/>
        <Modal show={this.state.showCrit} onClose={this.closeCritModal}>
          <UploadCrit onUpload={this.uploadCrit} />
        </Modal>
        <Modal show={this.state.showUser} onClose={this.closeUserModal}>
          <Signup createUser={this.signUp}/>
        </Modal>
        <Modal show={this.state.showLogin} onClose={this.closeLoginModal}>
          <Login loginUser={this.logIn}/>
          {/* <div className="line-container"></div> */}
          <Signup createUser={this.signUp}/>
        </Modal>

        
        <div id="float-button">
          <button onClick={this.showCritModal}>
            <img src={require('./plusSign.png')} alt="plus sign for upload" />
          </button>
        </div>
        <Route path="/" exact component={Gallery} />
      </Router>
    );
  }
}

export default App;
