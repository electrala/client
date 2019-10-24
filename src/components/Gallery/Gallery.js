/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from "react";
import fillerPic from "./images/32.jpg";
import "./gallery.css";
import axios from 'axios';
import Crit from '../Crit/Crit';
// import { generateHtml, placeholder }

export default class Gallery extends Component {
  static propTypes = {};

  constructor(props) {
    // call parent (React.Component) constructor
    super(props);

    // set intial state
    this.state = {
      critiques: [],
    };
  }

  async componentDidMount() {
    console.log('App Mounted');
    // 1. request the data from our server
    const { data } = await axios.get(
      'http://localhost:5000/critiques/all'
    );
    // 2. hold that data in state so that it will be passed down to our Snips
    this.setState({
      critiques: data,
    });

  }
  render() {
    if (!this.state.critiques[0]) return <div></div>
    return (
      <div id="gallery-container">
        <div className="overlay">
          <div className="overlay-inner">
            <button className="close">× Close</button>
            <img alt="filler" />
            <h3>Title of the Piece</h3>
            <p>Description of the piece</p>
          </div>
        </div>
        <section className="gallery">
          {this.state.critiques.map(critique => (
            <Crit key={critique.id} critique={critique} />
          ))}
          <div className="item h1 v1" >
            <img src={fillerPic} alt="filler" />
            <div className="item__overlay">
              <button>
                Take a closer <span role="img">👀</span>
              </button>
            </div>
          </div >
          <div className="item h1 v1" >
            <img src={fillerPic} alt="filler" />
            <div className="item__overlay">
              <button>
                Take a closer <span role="img">👀</span>
              </button>
            </div>
          </div >
          <div className="item h1 v1" >
            <img src={fillerPic} alt="filler" />
            <div className="item__overlay">
              <button>
                Take a closer <span role="img">👀</span>
              </button>
            </div>
          </div >
          <div className="item h1 v1" >
            <img src={fillerPic} alt="filler" />
            <div className="item__overlay">
              <button>
                Take a closer <span role="img">👀</span>
              </button>
            </div>
          </div >
          <div className="item h1 v1" >
            <img src={fillerPic} alt="filler" />
            <div className="item__overlay">
              <button>
                Take a closer <span role="img">👀</span>
              </button>
            </div>
          </div >
          <div className="item h1 v1" >
            <img src={fillerPic} alt="filler" />
            <div className="item__overlay">
              <button>
                Take a closer <span role="img">👀</span>
              </button>
            </div>
          </div >
        </section>
      </div>
    );
  }
}
