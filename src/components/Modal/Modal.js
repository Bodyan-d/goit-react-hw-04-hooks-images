import React, { useEffect } from 'react';

export default function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);
    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  }, []);

  function handelKeyDown(e) {

    if (e.code === 'Escape') {
      onClose();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="pictures" />
      </div>
    </div>
  );
}
