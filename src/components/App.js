import React, { useState } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { AppStyled } from './App.styled.jsx';

export default function App() {
  const [modalNow, setModalNow] = useState(null);
  const [currentSearch, setCurrentSearch] = useState('');

  const onModal = url => {
    setModalNow(url);
  };

  return (
    <AppStyled>
      <Searchbar
        onSubmit={search => {
          setCurrentSearch(search);
        }}
      />
      <ImageGallery search={currentSearch} onClickToModal={onModal} />
      {modalNow && <Modal largeImg={modalNow} closeModal={onModal} />}
    </AppStyled>
  );
}
