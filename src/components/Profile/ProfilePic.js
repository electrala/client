import React, {Component} from 'react'; 
import Pic from './bank_profile.png'
import {Link} from 'react-router-dom';
import './Profile.css';


export default class ProfilePc extends Component{
    constructor (props) {
        super(props);
        this.state = {
          isAuthenticated: false,
          userData:false,
        }
<<<<<<< HEAD
    }

    render() {
        return (
            <div id="picture">
                <Link to='/profile'>
                    <img id='profileImg' src={this.props.userInfo.userimages3location} style={{ border: "2px solid var(--electra-cool)" }} alt='pic'>
                    </img>
                </Link>
            </div>
=======
      }
      
    render(){
        return(
        <div id="picture">
            <Link to='/profile'>
                <img id='profileImg' src={Pic} alt='pic'>
                </img>
            </Link>
        </div>
>>>>>>> 439ab673d939dff4a8ec1b5409e3041765b27435
        )
    }
}