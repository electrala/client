import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Pic from './bank_profile.png';
import electraLoadIcon from '../electraLoadIcon.gif';
export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // profilePic: this.props.userInfo.userImageS3Location,
            redirect: false,
            selectedFile: null,
            userImageS3Location: null,
            isLoading: false
        }
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
                                profilePic: fileName.location,
                                userImageS3Location: fileName.location,
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

    updateUserToIncludeProfilePic = async () => {
        try {
            const data = {
                userImageS3Location: this.state.userImageS3Location
            };
            await axios.patch(`https://electra-la-development.herokuapp.com/users/users/${this.props.userInfo.id}`, data);
            // const updated_user_data = JSON.parse(updated_user.config.data);
            alert(`You've saved your new pic!`)
        } catch (error) {
            console.error(error);
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }
    redirectLogout = () => {
        this.props.logout();
        this.setRedirect();
    }
    componentDidMount() {
        this.props.toggleUploadButton();

        // const token = localStorage.getItem("jwt");
        // const decoded = jwt_decode(token);
        // var current_time = new Date().getTime() / 1000;
        // if (current_time > decoded.exp) { 
        // console.log(`token expired`);
        // }
    }
    componentWillUnmount() {
        this.props.toggleUploadButton();
    }

    render() {
        const { firstname, lastname, username, pronoun, location, email, userimages3location } = this.props.userInfo;
        return (
            <div className="user">
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="container">
                    <div>
                        <div className="grid-container">
                            <div className='img item1'>
                                <img className="profilePhoto" src={this.state.userImageS3Location ? this.state.userImageS3Location : userimages3location} alt="profilepic"></img>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="userInfo item3">
                                <h4 className="info">name: {firstname} {lastname}</h4>
                                <br />
                                <p className="info">username: {username}</p>
                                <br />
                                <p className="info">pronoun: {pronoun}</p>
                                <br />
                                <p className="info">location: {location}</p>
                                <br />
                                <p className="info">email: {email}</p>
                            </div>

                            <div className="left item2" >
                                <ul className="profileNav">
                                    <li>About</li>
                                    <li>Gallery</li>
                                    <li>Collections</li>
                                </ul>
                                <div className="active"></div>
                                <div className="row">

                                    <br />

                                </div>
                                <div className="stats row item4">
                                    <div className="stat col-xs-4" >
                                        <p className="number-stat">3,619</p>
                                        <p className="desc-stat">Followers</p>
                                    </div>
                                    <div className="stat col-xs-4">
                                        <p className="number-stat">42</p>
                                        <p className="desc-stat">Following</p>
                                    </div>
                                    <div className="stat col-xs-4" >
                                        <p className="number-stat">38</p>
                                        <p className="desc-stat">Uploads</p>
                                    </div>
                                    <div>
                                        {this.renderRedirect()}
                                        <button onClick={this.redirectLogout}>logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="file-upload-container">
                    <input type="file" accept="image/*" name="critique-image" id="critique-image"
                        onChange={this.singleFileChangedHandler} />
                    <img id="crit-upload-img" src={this.state.userImageS3Location ? this.state.userImageS3Location : require("../UploadCrit/placeHolder.jpg")} alt="placeholder" style={{ maxWidth: '100px' }} />
                    <button onClick={this.singleFileUploadHandler}>Upload File</button>
                    {
                        this.state.isLoading ? <div style={{ boxShadow: "0px 4px 6px 3px rgba(0, 0, 0, 0.5)", border: "4px solid var(--electra-cool)", zIndex: "100", marginTop: "-250px", marginLeft: "-20px", background: "rgba(20, 20, 20, 0.7)", borderRadius: "50%", width: "300px", height: "300px", display: "grid" }}><img src={electraLoadIcon} style={{ maxHeight: "200px", placeSelf: "center" }} alt="Electra Load Icon" /></div> /*<LoadingDots />*/ : <div></div>
                    }
                    {this.state.userImageS3Location !== null && <button onClick={this.updateUserToIncludeProfilePic}>Save Profile Pic</button>}
                </div>

            </div>




        )
    }
}