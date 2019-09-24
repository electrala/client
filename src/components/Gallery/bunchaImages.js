import React from "react";
// the purpose of this js file is that it is going to be storing the images from Gallery.js
export default class BunchaImages extends React.Component {
  render() {
    return (
      <div className="item h2 v2">
        <img src={fillerPic} alt="filler" />
        <div className="item__overlay">
          <button>
            Take a closer <span role="img">👀</span>
          </button>
        </div>
      </div>
    );
  }
}
