import React, { useState } from 'react';
import fetchImagesAPI, { resetPage } from './sourse/images-API';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
// import Loader from './components/Loader';
import Loader from 'react-loader-spinner';
import Error from './components/Error';

function App() {
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState(null);
  const [imagesSearch, setImagesSearch] = useState(null);
  const [status, setStatus] = useState('idle');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [largeImageNow, setLargeImageNow] = useState(null);

  // state = {
  //   imageName: '',
  //   error: null,
  //   imagesSearch: null,
  //   status: 'idle',
  //   modalIsOpen: false,
  //   largeImageNow: null,
  // };

  function handleChange(e) {
    setImageName(e.target.value);
  }

  function onLoadMoreClick(e) {
    fetchImagesAPI(imageName).then(imagesOnFeedback => {
      setImagesSearch([...imagesSearch, ...imagesOnFeedback.hits]);
    });
  }

  function handleOpenModal(e) {
    if (e.target.className === 'ImageGalleryItem-image') {
      setModalIsOpen(true);
      setLargeImageNow(e.target.alt);

      // setState({
      //   modalIsOpen: !this.state.modalIsOpen,
      //   largeImageNow: e.target.alt,
      // });
    }
  }

  function handleCloseModal() {
    setModalIsOpen(false);
    setLargeImageNow(null);

    // setState({
    //   modalIsOpen: !state.modalIsOpen,
    //   largeImageNow: null,
    // });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setStatus('pending');

    resetPage();

    fetchImagesAPI(imageName)
      .then(imagesOnFeedback => {
        setImagesSearch(imagesOnFeedback.hits);
        setStatus('resolved');
        // setState({
        //   imagesSearch: imagesOnFeedback.hits,
        //   status: 'resolved',
        // });
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
        // setState({ error, status: 'rejected' });
      });
  }

  if (status === 'idle') {
    return (
      <>
        <Searchbar
          onSubmit={handleFormSubmit}
          onChange={handleChange}
          imageName={imageName}
        />
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar
          onSubmit={handleFormSubmit}
          onChange={handleChange}
          imageName={imageName}
        />
        <div className="container-loader">
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar
          onSubmit={handleFormSubmit}
          onChange={handleChange}
          imageName={imageName}
        />

        <ImageGallery
          imagesSearch={imagesSearch}
          loadMore={onLoadMoreClick}
          togleModal={handleOpenModal}
        />

        {modalIsOpen && (
          <Modal largeImageURL={largeImageNow} onClose={handleCloseModal} />
        )}
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Error error={error} />
      </>
    );
  }
}

export default App;
