import React, { Component } from 'react';
import fetchImagesAPI, { resetPage } from './sourse/images-API';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
// import Loader from './components/Loader';
import Loader from 'react-loader-spinner';
import Error from './components/Error';

class App extends Component {
  state = {
    imageName: '',
    error: null,
    imagesSearch: null,
    status: 'idle',
    modalIsOpen: false,
    largeImageNow: null,
  };

  handleChange = e => {
    this.setState({ imageName: e.target.value });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.imageName !== this.state.imageName) {
  //     this.setState({ status: 'pending' });

  //     resetPage();

  //     fetchImagesAPI(this.state.imageName)
  //       .then(imagesOnFeedback => {
  //         this.setState({
  //           imagesSearch: imagesOnFeedback.hits,
  //           status: 'resolved',
  //         });
  //       })
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   }
  // }

  onLoadMoreClick = e => {
    fetchImagesAPI(this.state.imageName).then(imagesOnFeedback => {
      console.log(this.state.imagesSearch);
      console.log(imagesOnFeedback.hits);
      this.setState({
        imagesSearch: [...this.state.imagesSearch, ...imagesOnFeedback.hits],
      });
    });
  };

  handleOpenModal = e => {
    if (e.target.className === 'ImageGalleryItem-image') {
      this.setState({
        modalIsOpen: !this.state.modalIsOpen,
        largeImageNow: e.target.alt,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      largeImageNow: null,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ status: 'pending' });

    resetPage();

    fetchImagesAPI(this.state.imageName)
      .then(imagesOnFeedback => {
        this.setState({
          imagesSearch: imagesOnFeedback.hits,
          status: 'resolved',
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return (
        <>
          <Searchbar
            onSubmit={this.handleFormSubmit}
            onChange={this.handleChange}
            imageName={this.state.imageName}
          />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar
            onSubmit={this.handleFormSubmit}
            onChange={this.handleChange}
            imageName={this.state.imageName}
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
            onSubmit={this.handleFormSubmit}
            onChange={this.handleChange}
            imageName={this.state.imageName}
          />

          <ImageGallery
            imagesSearch={this.state.imagesSearch}
            loadMore={this.onLoadMoreClick}
            togleModal={this.handleOpenModal}
          />

          {this.state.modalIsOpen && (
            <Modal
              largeImageURL={this.state.largeImageNow}
              onClose={this.handleCloseModal}
            />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Error error={this.state.error} />
        </>
      );
    }
  }
}

export default App;
