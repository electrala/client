import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  handleChange = event => {
    event.preventDefault(); 
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  handleSubmit = event => {
    event.preventDefault(); 
    console.log(this.state);
    this.props.loginUser(this.state);
  }; 

  
  render() {
    return (
      <div className="login-form">
        <form id="login-form" onSubmit={this.handleSubmit}>
          <div className="header">
            <label id="login-title">Login, Gurl!</label>
          </div>
          <div className="input-container"> 
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="username"
              value={this.state.userName}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              />
              
            <button id="loginButton" type="submit">Login, Gurl!</button>
          </div>
          
        </form>
      </div>
    ); 
  }
}
