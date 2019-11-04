import React, { Component } from "react";
import ReactModal from "react-modal";
import "./Crit.css";
import './custom-button.png';

export default class Crit extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false, 
      showCrit: false,

    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

 /**
   * The following 2 functions toggle the critique upload modal.
   * @param {object} event This is the event triggered by clicking the plus sign button
   */
  showCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: true
    });
  };

  closeCritModal = event => {
    event.preventDefault();
    this.setState({
      showCrit: false
    });
  };



  randomNumber = limit => Math.floor(Math.random() * limit) + 1;

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      username,
      title,
      description,
      questions,
      genre,
      s3locationurl
    } = this.props.critique;
    return (
      <div className={`item h${this.randomNumber(4)} v${this.randomNumber(4)}`}>
        <img src={s3locationurl} alt="filler" />
        <div className="item__overlay">
          {/* <button>
            Take a closer <span role="img">👀</span>
          </button> */}
          <button onClick={this.handleOpenModal}>Check me out!</button>
          

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Critique Modal View"
            onRequestClose={this.handleCloseModal}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(65, 159, 161, 0.85)"
              },
              content: {
                position: "absolute",
                top: "20%",
                left: "20%",
                right: "20%",
                bottom: "15%",
                border: "none",
                background: "#707070",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "20px",
                outline: "none",
                padding: "20px",
                boxShadow: "0px 4px 7px 0px rgba(0, 0, 0, 0.34)"
              }
            }}
          >
            <div id="critique-modal-view">
              <img
                id="critique-modal-img"
                src={s3locationurl}
                alt="critique-modal-view"
              />
              <div id="critique-info-side">
                <h1 id="critique-title">{title}</h1>
                <p id="critique-username">Created by: {username}</p>
                <p id="critique-description">
                  Description:
                  <br /> {description}
                </p>
                {/* <p id="critique-genre" >{genre}</p> */}
                <p id="critique-question">
                  I'd like to know:
                  <br /> {questions}
                </p>
                <button id="modal-close-button" onClick={this.handleCloseModal}>
                  Close Modal
                </button>
              </div>
            </div>
          </ReactModal>
      
        </div>

        {this.state.showCrit ? 'show' :
          <div id="float-button">
            <img
              src={require("./custom-button.png")}
              onClick={this.props.showCritModal}
              alt="plus sign for upload" />
          </div>
        }
      </div>
    );
  }
}
