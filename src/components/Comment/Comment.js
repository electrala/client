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
        <img src={Pic} alt="placeholder-file" style={{ padding: "10px", width: "6rem", borderRadius: "50%" }} />
        <div className="text-wrapper" style={{ padding: "10px" }}>
          <p className="username-tag">{username}</p>
          <p className="comment">{comment}</p>
        </div>
      </div>
    )
  }
}

export default Comment
