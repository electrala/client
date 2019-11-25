import React, { Component } from "react";
import ReactModal from "react-modal";
import "./Crit.css";
import CommentSection from "../CommentSection/CommentSection";

export default class Crit extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  randomNumber = limit => Math.floor(Math.random() * limit) + 2;

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
      genre,
      s3locationurl
    } = this.props.critique;
    return (
      <div className={`item h${this.randomNumber(4)} v${this.randomNumber(4)}`}>
        <img src={s3locationurl} alt="filler" />
        <div className="item__overlay critique_overlay">
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
                top: "10%",
                left: "20%",
                right: "20%",
                bottom: "5%",
                border: "none",
                background: "var(--electra-grey)",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "20px",
                outline: "none",
                padding: "0",
                boxShadow: "0px 4px 7px 0px rgba(0, 0, 0, 0.34)"
              },
            }}
          >
            {/* <button id="modal-close-button" onClick={this.handleCloseModal}>
              X
                </button> */}
            <div id="critique-modal-view">
              <div className="img-side">
                <img className="crit-img" src={s3locationurl} alt="" />
                <p className="title-author">{title} by: {username}</p>
                <p className="description">{description}</p>
                <p className="genre">{genre}</p>
              </div>
              <div className="comment-side">
                <CommentSection critiqueInfo={this.props.critique} userInfo={this.props.userInfo} />
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    );
  }
}
