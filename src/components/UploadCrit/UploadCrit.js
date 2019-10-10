import React from 'react';
import './UploadCrit.css';

export default class UploadCrit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'b',
      title: '',
      genre: '',
      description: '',
      questions: '',
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onUpload(this.state);
  }

  handleChange = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="upload-form">
        <form id="upload-form"  onSubmit={this.handleSubmit}>
          <label id="form-title">Upload Critique</label>
          <label id="title-label">Title</label>
          <label id="genre-label">Genre</label>
          <input 
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <select 
            name="genre" 
            id="genre"
            value={this.state.genre}
            onChange={this.handleChange}
          >
            <option value="" disable selected>Select a genre</option>
            <option value="video">Video</option>
            <option value="photography">Photography</option>
            <option value="digital">Digital Art</option>
            <option value="performance">Performance</option>
            <option value="audio">Audio</option>
          </select>
          <label id="description-label">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          ></textarea>
          <label id="feedback-label">Feedback Questions</label>
          <textarea
            name="questions"
            id="feedback"
            placeholder="What would you like feedback on?"
            value={this.state.questions}
            onChange={this.handleChange}
          ></textarea>
          <button className="submit" type="submit">Upload</button>
        </form>
      </div>
    )
  }
}