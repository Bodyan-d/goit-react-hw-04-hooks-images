import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="pictures" />
        </div>
      </div>
    );
  }
}
