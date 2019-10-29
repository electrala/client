import React, { Component } from 'react';
import ReactModal from 'react-modal';

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
          >
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{genre}</p>
            <p>{questions}</p>
            <img src={s3locationurl} alt="critique photo" style={{ maxWidth: '200px' }} />
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      </div >
    )
  }
}
