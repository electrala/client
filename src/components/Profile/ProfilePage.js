import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import bannerPic from "./Electra_Banner.png";
import upload from "./upload.png";
import './profileRedesign.css';
import electraLoadIcon from '../../img/electraLoadIcon.gif';
import locationPic from './location.png';
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
                .post("https://electra-la-2019.herokuapp.com/aws/critique-img-upload", data, {
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
            await axios.patch(`https://electra-la-2019.herokuapp.com/users/users/${this.props.userInfo.id}`, data);
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
            <div className="page-container">

                <img className="profile-header" src={bannerPic} alt="banner"></img>

                <div className="profile-container">
                    <div className="profile-card">
                        <img className="profile-pic" src={this.state.userImageS3Location ? this.state.userImageS3Location : userimages3location} alt="profilepic"></img>
                        <div className="user-info">
                            <p className="real-name"> {firstname} {lastname}</p>
                            <p className="user-pronoun"> {pronoun}</p>
                            <p className="user-location"><img src={locationPic} style={{ maxHeight: "20px" }} alt="" srcset="" /> {location}</p>
                            <div className="user-buttons">
                                <button className="edit-button"> Edit Profile</button>
                                {this.renderRedirect()}
                                <button className="logout-button" onClick={this.redirectLogout}>logout</button>
                            </div>
                        </div>

                    </div>
                    <div className="user-contribution">
                        <div className="user-bio">
                            <p className="username">{username}</p>
                            <br />
                            <p className="bio">This is where user bio would go eventually.</p>
                        </div>

                        <div className='small-cards'>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                            <div className="item"></div>
                        </div>
                    </div>
                </div>

            </div>





        )
    }
}