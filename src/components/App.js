import React from 'react';
import './App.css';
import '../css/style.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './common/Layout/Layout';
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick = event => {
    event.preventDefault();
    console.log('Button clicked!');
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
       <Layout>
         <Modal show={this.state.isOpen} onClick={this.handleClick}>
            Modal content
         </Modal>
         <div id="float-button">
          <button onClick={this.handleClick}>
            <img src={require('./plusSign.png')} alt="plus sign for upload" />
          </button>
         </div>
         <Gallery />
       </Layout>
    );
  }
}

export default App;
