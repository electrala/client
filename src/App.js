import React from 'react';
import './App.css';
import './css/style.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './components/common/Layout/Layout';
import Gallery from './components/Gallery/Gallery';
import UploadCrit from './components/Critques/UploadCrit';

class App extends React.Component{
  render(){
    return(
      <Router>
        <Layout/>
      </Router>
    )
  }
  
}

export default App;
