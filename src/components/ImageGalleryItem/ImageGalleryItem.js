import React from 'react';

export default function ImageGalleryItem({ src, id, togleModal, largeURL }) {
  return (
    <li key={id} onClick={togleModal} className="ImageGalleryItem">
      <img src={src} alt={largeURL} className="ImageGalleryItem-image" />
    </li>
  );
}
