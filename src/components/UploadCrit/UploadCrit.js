import React from "react";
import "./UploadCrit.css";
import axios from "axios";

export default class UploadCrit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "b",
      title: "",
      genre: "",
      description: "",
      questions: "",
      selectedFile: null,
      s3locationurl: ""
    };
  }

  singleFileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  singleFileUploadHandler = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    // If file selected
    if (this.state.selectedFile) {
      data.append(
        "critiqueImage",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios
        .post('http://localhost:5000/aws/critique-img-upload', data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(response => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                // this.ocShowAlert("Max size: 2MB", "red");
                console.error('file too big');
              } else {
                console.log(response.data);
                // If not the given file type
                // this.ocShowAlert(response.data.error, "red");
                console.error(response.data.error);
              }
            } else {
              // Success
              let fileName = response.data;
              console.log("fileData", fileName);
              // this.ocShowAlert("File Uploaded", "#3089cf");
              console.log('File uploaded!');
              this.setState({
                "s3locationurl": fileName.location
              })
            }
          }
        })
        .catch(error => {
          // If another error
          // this.ocShowAlert(error, "red");
          console.error(error);
        });
    } else {
      // if file not selected throw error
      // this.ocShowAlert("Please upload file", "red");
      console.log('Please upload file!');
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    // insert async singlefileuploadhandler here?
    this.props.onUpload(this.state);
  };

  handleChange = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="upload-form">
        <form id="upload-form" onSubmit={this.handleSubmit}>
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
            <option value="" disable selected>
              Select a genre
            </option>
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
          <div className="file-upload-container">
            <input type="file" name="critique-image" id="critique-image"
              onChange={this.singleFileChangedHandler}
            />
            <button onClick={this.singleFileUploadHandler}>Upload File</button>
          </div>
          <button className="submit" type="submit">
            Submit Ya Crit!
          </button>
        </form>
      </div>
    );
  }
}
