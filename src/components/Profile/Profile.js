import React, { Component } from 'react'
import Pic from "./pic.png"
import './Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            pronoun: '',
            location: '',


        }
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="container">

                    <div className="row">
                        <img className="photo" src={Pic} alt="profile pic" ></img>

                        <div className="left col-lg-4">
                            <div className="photo-left">


                                <div className="right col-lg-8">
                                    <ul className="nav">
                                        <li>Gallery</li>
                                        <li>Collections</li>
                                        <li>Groups</li>
                                        <li>About</li>
                                    </ul>
                                    <span className="follow">Follow</span>

                                </div >
                                <div className="active"></div>
                            </div>

                            <h4 className="name">Ayana Hawk</h4>
                            <br />
                            <p className="info">UI/UX Designer</p>
                            <br />
                            <p className="info">Los Angeles</p>

                            <div className="stats row">
                                <div className="stat col-xs-4" >


                                    <p className="number-stat">3,619</p>
                                    <p className="desc-stat">Followers</p>
                                </div>
                                <div className="stat col-xs-4">
                                    <p classNameName="number-stat">42</p>
                                    <p className="desc-stat">Following</p>
                                </div>
                                <div className="stat col-xs-4" >
                                    <p className="number-stat">38</p>
                                    <p className="desc-stat">Uploads</p>
                                </div>
                            </div>
                            <p className="desc">Hi ! My name is Ayana I'm a UI/UX Designer from LA</p>

                        </div>

                    </div>
                </div>
            </div>



        )
    }
}

