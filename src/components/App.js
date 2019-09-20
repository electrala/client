import React from 'react';
import './App.css';
import '../css/style.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Layout from './common/Layout/Layout';
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';
import Navbar from './common/Navbar/Navbar';
import UploadCrit from './UploadCrit/UploadCrit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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

  render() {
    return (
      <Router>
        <Navbar />
        <Modal show={this.state.show} onClose={this.closeModal}>
          <UploadCrit/>
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
