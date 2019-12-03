import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import bannerPic from "./Electra_Banner.png";
import upload from "./upload.png";
import './profileRedesign.css';
import electraLoadIcon from '../../img/electraLoadIcon.gif';
import locationPic from './location.png';
import ReactModal from 'react-modal';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // profilePic: this.props.userInfo.userImageS3Location,
            redirect: false,
            selectedFile: null,
            userImageS3Location: null,
            isLoading: false,
            usersCritiques: [],
            loggedInUser: {},
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
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

    getUserInfo = () => {
        console.log(this.props.userInfo);
        this.setState({
            loggedInUser: this.props.userInfo
        },
            () => {
                this.getUsersCritiques();
            });
    };

    async getUsersCritiques() {
        try {
            console.log('getUsersCritiques fired in Profile.js');
            const { data } = await axios.get(
                `https://electra-la-development.herokuapp.com/critiques/user/${this.state.loggedInUser.username}`
            );
            console.log(data);
            this.setState({
                usersCritiques: data
            })
        } catch (err) {
            console.log(err);
        };
    }

    componentDidMount() {
        this.props.toggleUploadButton();
        this.getUserInfo();
        // this.getUsersCritiques();
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
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Upload New User Image"
                    onRequestClose={this.handleCloseModal}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(65, 159, 161, 0.85)'
                        },
                        content: {
                            position: 'absolute',
                            top: '20%',
                            left: '20%',
                            right: '20%',
                            bottom: '15%',
                            border: 'none',
                            background: 'var(--electra-grey)',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '20px',
                            outline: 'none',
                            boxShadow: '0px 4px 7px 0px rgba(0, 0, 0, 0.34)',
                            padding: '0',

                        }
                    }}
                >
                    <div id="edit-user-container">
                        <div id="edit-user-blurb">
                            <p>Change yo shiz!!! Use the form below to update your user profile image.</p>
                        </div>
                        <div id="user-img-upload-container">
                            <div id="upload-form">
                                <input type="file" accept="image/*" name="user-profile-image" id="user-profile-image" onChange={this.singleFileChangedHandler} />
                                <button onClick={this.singleFileUploadHandler}>Upload File</button>
                                {
                                    this.state.isLoading ? <div style={{ boxShadow: "0px 4px 6px 3px rgba(0, 0, 0, 0.5)", border: "4px solid var(--electra-cool)", zIndex: "100", marginTop: "-250px", marginLeft: "-20px", background: "rgba(20, 20, 20, 0.7)", borderRadius: "50%", width: "300px", height: "300px", display: "grid" }}><img src={electraLoadIcon} style={{ maxHeight: "200px", placeSelf: "center" }} alt="Electra Load Icon" /></div> /*<LoadingDots />*/ : <div></div>
                                }
                                {this.state.userImageS3Location !== null && <button onClick={this.updateUserToIncludeProfilePic}>Save Profile Pic</button>}
                            </div>
                            <div id="selected-image-preview" style={{ height: "350px", width: "350px", borderRadius: "50%", border: "4px solid var(--electra-cool)" }}>
                                <img id="user-upload-img" src={this.state.userImageS3Location ? this.state.userImageS3Location : require("../UploadCrit/placeHolder.jpg")} alt="placeholder" style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "50%" }} />
                            </div>
                        </div>
                    </div>
                </ReactModal>
                <img className="profile-header" src={bannerPic} alt="banner"></img>
                <div className="profile-container">
                    <div className="card-side">
                        <div className="profile-card">
                            <div className="profile-pic-container">
                                <img className="profile-pic" src={this.state.userImageS3Location ? this.state.userImageS3Location : userimages3location} alt="profilepic"></img>
                            </div>
                            <div className="user-info">
                                <p className="real-name"> {firstname} {lastname}</p>
                                <p className="user-pronoun"> {pronoun}</p>
                                <p className="user-location"><img src={locationPic} style={{ maxHeight: "20px" }} alt="" srcSet="" /> {location}</p>
                                <div className="user-buttons">
                                    <button className="edit-button"
                                        onClick={this.handleOpenModal}> Edit Profile</button>
                                    {this.renderRedirect()}
                                    <button className="logout-button" onClick={this.redirectLogout}>logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-contribution">
                        <div className="user-bio">
                            <p className="username">{username}</p>
                            {/* <p className="bio">This is where user bio would go eventually.</p> */}
                            <p className="user-email">{email}</p>
                            <p className="spark-count">Spark count: {this.state.usersCritiques.length}</p>
                        </div>

                        {this.state.usersCritiques === [] ?
                            <div className='spark-container'>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                                <div className="spark-card"></div>
                            </div>
                            :
                            <div className="spark-container">
                                {this.state.usersCritiques.map(critique => (
                                    <div className="spark-card">
                                        <img src={critique.s3locationurl} style={{ height: "250px", width: "250px", borderRadius: "20px" }} alt="critPic" />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>

            </div>





        )
    }
}