import React, { Component } from 'react';
import Pic from '../Profile/bank_profile.png';

export class Comment extends Component {
  render() {
    const {
      // crit_id,
      username,
      comment
    } = this.props.comment;
    return (
      <div className="comment-wrapper" style={{ display: "grid", gridTemplateColumns: "1fr 10fr" }} >
        <div id="user-pic-belongs-to-comment" style={{ height: "80px", width: "80px", borderRadius: "50%" }}>
          <img src={Pic} alt="placeholder-file" style={{ padding: "10px", height: "100%", width: "100%", borderRadius: "50%" }} />
        </div>
        <div className="text-wrapper" style={{ padding: "10px" }}>
          <p className="username-tag">{username}</p>
          <p className="comment">{comment}</p>
        </div>
      </div>
    )
  }
}

export default Comment
