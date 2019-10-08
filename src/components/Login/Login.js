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
    this.props.loginUser(this.state);
  }; 

  
  render() {
    return (
      <div className="login-form">
        <form id="login-form">
      <div className="header">
        <label id="login-title">Login, Gurl!</label>
      </div>
      <div className="input-container"> 
      <input
      type="text"
      name="userName"
      id="userName"
      placeholder="username"
      />
      <input
      type="text"
      name="password"
      id="password"
      placeholder="password"
      />
      <button id="loginButton" type="button">
        Login, Gurl!
        </button>

        <p>Already have an account?</p>

      </div>



      <div className="footer">


      </div>

        </form>
      </div>
    ); 
  }
}
