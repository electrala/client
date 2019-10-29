import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './Crit.css';

export default class Crit extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  randomNumber = (limit) =>
    Math.floor(Math.random() * limit) + 1;

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { username, title, description, questions, genre, s3locationurl } = this.props.critique;
    return (
      <div className={`item h${this.randomNumber(4)} v${this.randomNumber(4)}`} >
        <img src={s3locationurl} alt="filler" />
        <div className="item__overlay">
          {/* <button>
            Take a closer <span role="img">👀</span>
          </button> */}
          <button onClick={this.handleOpenModal}>Check me out!</button>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Modal #1 Global Style Override Example"
            onRequestClose={this.handleCloseModal}
            style={{
              overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
              },
              content: {
                position: 'absolute',
                top: '20%',
                left: '20%',
                right: '20%',
                bottom: '15%',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '20px',
                outline: 'none',
                padding: '20px',
                boxShadow: '0px 4px 7px 0px rgba(0, 0, 0, 0.34)'

              }
            }}
          >
            <div id="critique-modal-view" >
              <h2 id="critique-title" >Title: {title}</h2>
              <p id="critique-username">Created by: {username}</p>
              <p id="critique-description" >Description: {description}</p>
              {/* <p id="critique-genre" >{genre}</p> */}
              <p id="critique-question" >I'd like to know: {questions}</p>
              <img id="critique-modal-img" src={s3locationurl} alt="critique-modal-view" />
              <button id="modal-close-button" onClick={this.handleCloseModal}>Close Modal</button>
            </div>
          </ReactModal>
        </div>
      </div >
    )
  }
}
