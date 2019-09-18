import React from 'react';
import './App.css';
import './css/style.css';
import Layout from './components/common/Layout/Layout';
import Gallery from './components/Gallery/Gallery';
import {Route} from 'react-router-dom';

function App() {
  
  return (
    <Layout>
    <Gallery />
  </Layout>
      
  )
}

export default App;
