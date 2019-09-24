import React, { Component } from "react";
import axios from "axios";
import "../../css/signup.css";

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
      <div className="signup-container">
        <form className="signup-form" style={h1} onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="last name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="userName"
            placeholder="user name"
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="pronoun"
            placeholder="pronoun"
            value={this.state.pronoun}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="confirmPassword"
            placeholder="confirm password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          <button type="submit">click me</button>
        </form>
      </div>
    );
  }
}
