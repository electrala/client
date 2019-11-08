import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Pic from './bank_profile.png';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: Pic,
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

    updateUserToIncludeProfilePic = async data => {
        try {
            const updated_user = await axios.patch(`https://electra-la-2019.herokuapp.com/users/users/${this.props.userInfo.id}`);
            const updated_user_data = JSON.parse(updated_user.config.data);
            console.log(updated_user_data);
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
    }

    componentWillUnmount() {
        this.props.toggleUploadButton();
    }

    render() {
        const { firstname, lastname, username, pronoun, location, email } = this.props.userInfo;
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
                                <img className="profilePhoto" src={this.state.profilePic} alt="profilepic"></img>
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
            </div>
        )
    }
}