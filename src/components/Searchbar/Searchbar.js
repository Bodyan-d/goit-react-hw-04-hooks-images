import React from 'react';

export default function Searchbar({ onChange, imageName, onSubmit }) {
  return (
    <header className="Searchbar">
      <form onSubmit={onSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={onChange}
          value={imageName}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
