import React, { Component } from 'react'

export class CreateComment extends Component {
  constructor() {
    super();
    this.state = {
      comment: ''
    }
  }

  // handleChange()

  // handleSubmit()

  render() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 10fr", padding: "10px", backgroundColor: "var(--electra-black)", border: "2px solid var(--electra-cool)", borderRadius: "20px" }}>
        <div className="userinfo" style={{ padding: "15px" }}>
          <img src={this.props.userInfo.userimages3location} style={{ padding: "5px", maxWidth: "60px", borderRadius: "50%", border: "1px solid var(--electra-cool)" }} alt="user" srcset="" />
          <p className="username" style={{ marginBottom: "0px" }}>{this.props.userInfo.username}</p>
        </div>
        <textarea name="comment-entry" id="comment-entry" cols="40" rows="2" placeholder="Add your comment here..." style={{ paddingTop: "40px", backgroundColor: "var(--electra-black)", border: "none", resize: "none", color: "var(--electra-white)", outline: "none", fontSize: "16px" }} ></textarea>
      </div>
    )
  }
}

export default CreateComment
