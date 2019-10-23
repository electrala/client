import React from 'react';
import axios from 'axios';

export default class UploadCrit extends React.Component {
constructor(props){
super(props); 
this.state={
  title: "", 
  genre:"", 
  description:"", 

}
}



  render() {
    return (
      <div>
      <div id="upload-container">
        <h2 >
          Upload Your Art for Critique!
        </h2>
        <div class="upload-grid">
          <form id="upload-form" >
            <input type="text" placeholder="Title" />
            <select name="genre" id="genre">
              <option value="select-one">select your genre</option>
              <option value="film">film</option>
              <option value="photography">photography</option>
              <option value="digital">digital</option>
              <option value="performance">performance</option>
              <option value="music">music</option>
            </select>
            <textarea
              name="description"
              id="critique-description"
              placeholder="Description"
              cols="30"
              rows="4"
            ></textarea>
            <textarea
              name="desired-feedback"
              id="desired-feedback"
              placeholder="I would like critique on..."
              cols="30"
              rows="6"
            ></textarea>
            <button class="submit" type="submit">Send it!</button>
            <button class="cancel" type="button">Just kidding!</button>
          </form>

          <div class="right-side">
            <a href="#"><i class="fas fa-upload fa-6x"></i></a>
            <h3>
              Select a file to <a href="#"><span>upload</span></a>
            </h3>
          </div>
        </div>
      </div>
      </div>
    )
  }
};