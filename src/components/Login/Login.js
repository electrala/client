import React, { Component } from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
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
   * This handle submitting the login form.
   * It sends the form data to the App component, where it will be sent to the
   * back end.
   * @param {object} event This is the event triggered by the login button.
   */
  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.loginUser(this.state);
  };

  render() {
    return (
      <div className="login-form">
        <form id="login-form" onSubmit={this.handleSubmit}>
          <div className="header">
            <label id="login-title">Login</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              value={this.state.userName}
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <button id="loginButton" type="submit">Let's Go!</button>
          </div>
        </form>
      </div>
    );
  }
}