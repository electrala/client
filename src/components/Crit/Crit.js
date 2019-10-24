import React, { Component } from 'react'

export default class Crit extends Component {
  // constructor(props) {
  //   super(props);
  // }
  randomNumber = (limit) =>
    Math.floor(Math.random() * limit) + 1;

  render() {
    const { username, title, description, questions, genre, s3locationurl } = this.props.critique;
    return (
      <div className={`item h${this.randomNumber(4)} v${this.randomNumber(4)}`} >
        <img src={s3locationurl} alt="filler" />
        <div className="item__overlay">
          <button>
            Take a closer <span role="img">👀</span>
          </button>
        </div>
      </div >
    )
  }
}
