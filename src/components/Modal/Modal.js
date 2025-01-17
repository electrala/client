import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }  
    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Prop validation
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};
export default Modal;