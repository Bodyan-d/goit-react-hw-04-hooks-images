import React from 'react';
import './Button.css';

export default function Button({ onClick }) {

  return (
    <button onClick={onClick} className="load-more" id="loadMore">
      Load more
    </button>
  );
}
