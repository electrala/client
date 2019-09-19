import React from 'react';
import './App.css';
import './css/style.css';
import Layout from './components/common/Layout/Layout';
import Gallery from './components/Gallery/Gallery';
import Modal from '../Modal/Modal';

App() {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick = event => {
    console.log('Button clicked!');
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  return (
     <Layout>
       <Modal show={this.state.isOpen} onClose={this.handleClick}>
          Modal content
       </Modal>
       <Gallery />
     </Layout>
  );
}

export default App;
