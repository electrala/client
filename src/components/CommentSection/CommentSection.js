import React, { Component } from 'react';
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import axios from 'axios';

export class CommentSection extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  };

  // submitCommentToDB(){ take info from child and push to cloud, then refresh the state with new comments}
  submitCommentToDB = async data => {
    console.log(data);
    try {
      const new_comment = await axios.post(
        // "https://electra-la-development.herokuapp.com/comments/new",
        "http://localhost:5000/comments/new",
        data
      );
      const parsedComment = JSON.parse(new_comment.config.data);
      this.setState({
        comments: [...this.state.comments, parsedComment]
      })
    } catch (error) {
      console.log(error.message);
      alert('comment upload fail');
    }
  }

  grabCommentsFromDB = async () => {
    console.log('CommentSection mounted');
    const crit_id = this.props.critiqueInfo.id
    const { data } = await axios.get(
      `http://localhost:5000/comments/${crit_id}`
    );
    // console.log(data);
    this.setState({
      comments: data
    })
  }

  componentDidMount() {
    // make axios call for all comments related to this.props.critiqueInfo.id
    // called method will set state
    this.grabCommentsFromDB();
  }

  render() {
    return (
      <div className="CommentSection" style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr 1fr 1fr" }}>
        <div className="question-asked" style={{ padding: "10px", fontSize: "2rem" }}>
          {this.props.critiqueInfo.questions}
        </div>
        {/* map over Comment component for each comment in this.state.comments array */}
        {this.state.comments.length > 0 ? this.state.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
          :
          <div className="dummy-data">Write the first comment!</div>
        }
        {/* Pass in critique info and userinfo to be funneled to the back end for comment table */}
        <CreateComment submitComment={this.submitCommentToDB} userInfo={this.props.userInfo} critiqueInfo={this.props.critiqueInfo} />
      </div>
    )
  }
}

export default CommentSection
