import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import LMButton from '../Button';

export default function ImageGallery({ imagesSearch, loadMore, togleModal }) {
  return (
    <div className="container">
      <ul className="ImageGallery">
        {imagesSearch &&
          imagesSearch.map(image => (
            <ImageGalleryItem
              togleModal={togleModal}
              id={image.id}
              src={image.webformatURL}
              largeURL={image.largeImageURL}
            />
          ))}
      </ul>

      <LMButton onClick={loadMore} />
    </div>
  );
}
