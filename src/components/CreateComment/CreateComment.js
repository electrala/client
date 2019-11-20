import React, { Component } from 'react'

export class CreateComment extends Component {
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <textarea name="comment-entry" id="comment-entry" cols="70" rows="10" placeholder="Add your comment here..." style={{ padding: "20px", backgroundColor: "var(--electra-black)", border: "2px solid var(--electra-cool)", borderRadius: "20px" }} ></textarea>
      </div>
    )
  }
}

export default CreateComment
