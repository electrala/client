import React from 'react';
import './App.css';
import '../css/style.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';
import Navbar from './common/Navbar/Navbar';
import UploadCrit from './UploadCrit/UploadCrit';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      critiques: [],
    };
  }

  showModal = event => {
    event.preventDefault();
    this.setState({
      show: true,
    });
  }

  closeModal = event => {
    event.preventDefault();
    this.setState({
      show: false,
    })
  }

  showModal = event => {
    event.preventDefault();
    this.setState({
      show: true,
    });
  }

  closeSignUpModal = event => {
    event.preventDefault();
    this.setState({
      show: false,
    })
  }
  uploadCrit = async data => {
    console.log(data);
    const new_crit = await axios.post('http://localhost:5000/critiques/new', data);
    const crits = this.state.critiques;
    crits.push(new_crit);
    this.setState({
      critiques: crits,
    })
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Modal show={this.state.show} onClose={this.closeModal}>
          <UploadCrit onUpload={this.uploadCrit}/>
        </Modal>
        
        <div id="float-button">
          <button onClick={this.showModal}>
            <img src={require('./plusSign.png')} alt="plus sign for upload" />
          </button>
        </div>
        <Route path="/" exact component={Gallery} />
      </Router>
    );
  }
}

export default App;
