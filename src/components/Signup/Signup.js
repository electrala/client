import React, { Component } from "react";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Ayana Test",
      lastName: "Hawk ",
      userName: "Ayana",
      pronoun: "She",
      location: "LA ",
      email: "ayanahawk11@gmail.com",
      password: "m",
      confirmPassword: "m"
    };
  }

  /**
   * This updates the state when users are filling out the form.
   * @param {object} event This is the event triggered by inputting information
   *                       into the form.
   */
  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  /**
   * This handles submitting the signup form.
   * Checks to see if the user retyped their password correctly. If they did,
   * it will send the form data to the App component, where the it will be
   * sent to the back end.
   * @param {object} event This is the event triggered by the signup button
   */
  handleSubmit = event => {
    const { password, confirmPassword } = this.state; 
    if (password !== confirmPassword) {
      alert("Passwords don't match"); 
    } else {
      console.log('your mom!')
      event.preventDefault();
     this.props.signUp(this.state);
    }
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
        <label id="signUp-title">Sign Up</label>
        </div>
        <div className="input-container">
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
          placeholder="Email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="password"
          placeholder="Password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
          />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Confirm Password"
          id="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          />
        <button id="signUpButton" type="submit">
          Sign Up
        </button>
        </div>
      </form>

      </div>
    );
  }
}