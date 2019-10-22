import React, {Component} from 'react'; 
import Pic from './tattoo.jpg'
import {Link} from 'react-router-dom';
import './Profile.css';


export default class ProfilePc extends Component{

    render(){
        return(
        <div id="picture">
            <Link to='/profile'>
                <img id='profileImg' src={Pic} alt='pic'></img>
            </Link>
        </div>
        )
    }
}