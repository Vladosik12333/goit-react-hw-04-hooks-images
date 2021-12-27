import React, { useState } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { AppStyled } from './App.styled.jsx';

export default function App() {
  const [modalNow, setModalNow] = useState(null);
  const [currentSearch, setCurrentSearch] = useState('');

  const onSubmit = search => {
    setCurrentSearch(search);
  };

  const onModal = url => {
    setModalNow(url);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery search={currentSearch} onClickToModal={onModal} />
      {modalNow && <Modal largeImg={modalNow} closeModal={onModal} />}
    </AppStyled>
  );
}
