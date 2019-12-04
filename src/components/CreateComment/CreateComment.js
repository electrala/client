import React, { Component } from 'react'

export class CreateComment extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      comment: '',
      critiqueID: '',
      postTime: null
    }
  }

  // handleChange()
  /**
   * This updates the state when users are filling out the form.
   * @param {object} event This is the event triggered by inputting information
   *                       into the form.
   */
  handleChange = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  // handleSubmit()
  /**
   * This handles submitting the upload form. It sends the data from the form
   * to the App component, where it will be sent to the back end.
   * @param {object} event This is the event triggered by clicking the upload
   *                       button.
   */

  handleSubmit = event => {
    event.preventDefault();
    // this.setState({ postTime: Date.now() })
    this.props.submitComment(this.state);
    this.setState({
      comment: ''
    })
  };

  componentDidMount() {
    this.setState({
      username: this.props.userInfo.username,
      critiqueID: this.props.critiqueInfo.id
    })
  }

  render() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 10fr", padding: "10px", backgroundColor: "var(--electra-black)", border: "2px solid var(--electra-cool)", borderRadius: "20px" }}>
        <div className="userinfo" style={{ padding: "15px" }}>
          <img src={this.props.userInfo.userimages3location} style={{ padding: "5px", maxWidth: "60px", borderRadius: "50%", border: "1px solid var(--electra-cool)" }} alt="user" />
          {/* <p className="username" style={{ marginBottom: "0px", fontSize: "1rem" }}>{this.props.userInfo.username}</p> */}
        </div>
        <form id="comment-upload" onSubmit={this.handleSubmit}>
          <textarea
            name="comment"
            id="comment-entry"
            placeholder="Add your comment here..."
            value={this.state.comment}
            onChange={this.handleChange}
            style={{ paddingTop: "40px", backgroundColor: "var(--electra-black)", border: "none", resize: "none", color: "var(--electra-white)", outline: "none", fontSize: "16px" }} ></textarea>
          <input id="comment-submit" type="submit" style={{ marginLeft: "6rem", border: "none", borderRadius: "10px", fontSize: "16px", color: "var(--electra-white)", backgroundColor: "var(--electra-cool)", padding: "10px" }} />
        </form>
      </div>
    )
  }
}

export default CreateComment
