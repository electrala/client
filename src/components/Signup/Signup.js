import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      pronoun: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: ""
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
    this.createUser(this.state);
  };

  createUser = async userData => {
    axios.post("http://localhost:5000/users/register", userData);
  };

  render() {
    let h1 = {
      marginTop: "3rem",
      fontSize: "3rem"
    };
    return (
      <div className="signUp-form">

      <form id="signUp-form" style={h1} onSubmit={this.handleSubmit}>
        <div className="header">
        <label id="signUp-title">Sign up!</label>
        </div>
        <div className="input-container">
          <label id="firstName-title">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleChange}
          />
      <label id="lastName-title">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          id="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
          />
      <label id="userName-title">User Name</label>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          id="userName"
          value={this.state.userName}
          onChange={this.handleChange}
          />
       <label id="pronoun-title">Pronoun</label>

        <input
          type="text"
          name="pronoun"
          placeholder="Pronouns"
          id="pronoun"
          value={this.state.pronoun}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="location"
          placeholder="Location"
          id="location"
          value={this.state.location}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="email"
          placeholder="email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="password"
          placeholder="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="confirmPassword"
          placeholder="confirm password"
          id="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          />
        </div>
        <button type="submit">
          click me
        </button>
      <div className="footer"></div>
      
      </form>
      </div>

    );
  }
}
