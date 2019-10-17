import React, {Component} from 'react'; 
import Pic from './pic.png'
import {Link} from 'react-router-dom';

export default class ProfilePc extends Component{

    render(){
        return(
        <div>
            <Link to='/profile'>
                <img id='profileImg' src={Pic} alt='pic'></img>
            </Link>
        </div>
        )
    }
}