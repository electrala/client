import React, { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);



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
    this.baseState = this.state;
  }

  /**
   * This updates the state when users are filling out the form.
   * @param {object} event This is the event triggered by inputting information
   *                       into the form.
   */
  passwordFailFunction = event => {
    MySwal.fire({
      title: 'And I oops!', 
      icon: 'error',
      type :  null,
      confirmButtonText: "Close",
      text: 'The passwords do not match',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false, 
      confirmButtonColor: "var(--electra-cool)"
     }
    );
  };

  signUpSuccessFunction = event => {
    MySwal.fire({
      title: `You're all signed up!`, 
      icon: 'Success',
      type :  null,
      confirmButtonText: "Close",
      text: 'Go ahead and login :)',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false, 
      confirmButtonColor: "var(--electra-cool)"
     }
    );
  };
  
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
    event.preventDefault();
    if (password !== confirmPassword) {
      this.passwordFailFunction();
    } else {
      console.log(`your mom!:: CJ's code`);
      this.props.createUser(this.state);
      this.signUpSuccessFunction();
      this.setState(this.baseState);
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