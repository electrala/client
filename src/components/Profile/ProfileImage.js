
import React, { Component } from 'react'
import Pic from "./pic.png"
import {Link} from 'react-router-dom'

export default class ProfileImage extends Component {
    render() {
        return (
            <div>
                <Link to='/profile'> 
                <img id="img" src={Pic} alt="pic" ></img> 
                </Link>

            </div>
        )
    }
}
