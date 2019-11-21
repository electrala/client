import React from "react";
import "./UploadCrit.css";
import axios from "axios";
import LoadingDots from '../common/Loading/LoadingDots';
import electraLoadIcon from '../../img/electraLoadIcon.gif';
import electraLoadSuccess from '../../img/electraLoadSuccess.png';
import electraLoadError from '../../img/electraLoadError.png';

export default class UploadCrit extends React.Component {
  // The default username is b, but this needs to be pulled from local storage
  // because the user should already be logged in.
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.userInfo.username,
      title: "",
      genre: "",
      description: "",
      questions: "",
      selectedFile: null,
      s3locationurl: null,
      isLoading: false
    };
  }

  singleFileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  singleFileUploadHandler = evt => {
    evt.preventDefault();
    const data = new FormData();
    // If file selected
    if (this.state.selectedFile) {
      this.setState({ isLoading: true });
      data.append(
        "critiqueImage",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios
        .post("https://electra-la-development.herokuapp.com/aws/critique-img-upload", data, {
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
                this.setState({ isLoading: false });
                alert("file too big");
              } else {
                this.setState({ isLoading: false });
                console.log(response.data);
                // If not the given file type
                // this.ocShowAlert(response.data.error, "red");
                alert(response.data.error);
              }
            } else {
              // Success
              let fileName = response.data;
              // console.log("fileData", fileName);
              // this.ocShowAlert("File Uploaded", "#3089cf");
              console.log("File uploaded!");
              this.setState({
                s3locationurl: fileName.location,
                isLoading: false
              });
            }
          }
        })
        .catch(error => {
          this.setState({ isLoading: false });
          // If another error
          // this.ocShowAlert(error, "red");
          console.error(error);
        });
    } else {
      // if file not selected throw error
      // this.ocShowAlert("Please upload file", "red");
      alert("Please upload file!");
    }
  };

  /**
   * This handles submitting the upload form. It sends the data from the form
   * to the App component, where it will be sent to the back end.
   * @param {object} event This is the event triggered by clicking the upload
   *                       button.
   */

  handleSubmit = event => {
    event.preventDefault();
    // insert async singlefileuploadhandler here?
    this.props.onUpload(this.state);
  };

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
            <option value="illustration">Illustration</option>
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
            <input type="file" accept="image/*" name="critique-image" id="critique-image"
              onChange={this.singleFileChangedHandler} />
            <img id="crit-upload-img" src={this.state.s3locationurl ? this.state.s3locationurl : require("./placeHolder.jpg")} alt="placeholder" style={{ maxWidth: '100px' }} />
            <button onClick={this.singleFileUploadHandler}>Upload File</button>
            {
              this.state.isLoading ? <div style={{ boxShadow: "0px 4px 6px 3px rgba(0, 0, 0, 0.5)", border: "4px solid var(--electra-cool)", zIndex: "100", marginTop: "-250px", marginLeft: "-20px", background: "rgba(20, 20, 20, 0.7)", borderRadius: "50%", width: "300px", height: "300px", display: "grid" }}><img src={electraLoadIcon} style={{ maxHeight: "200px", placeSelf: "center" }} alt="Electra Load Icon" /></div> /*<LoadingDots />*/ : <div></div>
            }
          </div>
          <button className="submit" type="submit">
            Submit Ya Crit!
          </button>
        </form>
      </div>
    );
  }
}
