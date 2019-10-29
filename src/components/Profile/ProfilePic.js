import React, {Component} from 'react'; 
import Pic from './bank_profile.png'
import {Link} from 'react-router-dom';
import './Profile.css';
import './ProfilePic.css'
import { userInfo } from 'os';

export default class ProfilePc extends Component{
    constructor (props) {
        super(props);
        this.state = {
          isAuthenticated: false,
          userData:false,
        }
      }
      
    render(){
        return(
        <div id="picture">
            <Link to='/profile'>
                <img id='profileImg' src={Pic} alt='pic'>
                </img>
            </Link>
        </div>
        )
    }
}