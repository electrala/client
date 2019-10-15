import React, { Component } from "react";
<<<<<<< HEAD
import axios from "axios";
import "../../css/signup.css";
=======
>>>>>>> 4df4834cddbfa68b4bea6e9dc057e9ba8742915a

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
    const { password, confirmPassword } = this.state; 
    if (password !== confirmPassword) {
      alert("Passwords don't match"); 
    } else {
      event.preventDefault();
      this.props.createUser(this.state);
    }
  };

  render() {
    let h1 = {
      marginTop: "3rem",
      fontSize: "3rem"
    };
    return (
<<<<<<< HEAD
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
=======
      <div className="signUp-form">

      <form id="signUp-form" style={h1} onSubmit={this.handleSubmit}>
        <div className="header">
        <label id="signUp-title">Sign up, Gurl!</label>
        </div>
        <div className="signup-container">
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          id="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          id="userName"
          value={this.state.userName}
          onChange={this.handleChange}
          />

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
        <button id="signUpButton" type="submit">
          Sign Me Up, Gurl!
        </button>
        </div>
      
      
      </form>
      </div>

>>>>>>> 4df4834cddbfa68b4bea6e9dc057e9ba8742915a
    );
  }
}
