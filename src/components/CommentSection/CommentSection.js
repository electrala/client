import React, { Component } from 'react';
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";

export class CommentSection extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  };

  componentDidMount() {
    // make axios call for all comments related to this.props.critInfo.id
  }

  render() {
    return (
      <div className="CommentSection">
        <div className="question-asked" style={{ padding: "10px", fontSize: "2rem" }}>
          {this.props.critiqueInfo.questions}
        </div>
        {/* map over Comment component for each comment in this.state.comments array */}
        <Comment />
        <Comment />
        <Comment />
        {/* Pass in critique info and userinfo to be funneled to the back end for comment table */}
        <CreateComment />
      </div>
    )
  }
}

export default CommentSection
