import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';

export default ({ children }) => {
  return (
    <div id="layout-container">
      <Navbar />
      <div id="children">
        { children }
      </div>
    </div>
  )
}

