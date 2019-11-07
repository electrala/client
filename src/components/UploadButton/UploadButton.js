import React from 'react';



export default class UploadButton extends React.Component{
    render(){
      return(
  
        <div id="float-button">
            <img
              src={require("./custom-button.png")}
              onClick={this.showCritModal}
              alt="plus sign for upload"
            />
          </div>
      )
    }
  }