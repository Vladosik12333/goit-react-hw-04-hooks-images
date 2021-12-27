import React, { useState, useEffect } from 'react';
import api from '../../service/pixabayApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { List } from './ImageGallery.styled';
import propTypes from 'prop-types';

export default function ImageGallery({
  search,
  onClickToModal,
  page,
  setPage,
}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!search) return;

    if (page === 1) {
      setImages([]);
      setStatus('idle');
      setError(null);
    }

    setStatus('pending');

    api(search, page).then(resp => {
      if (typeof resp !== 'string') {
        setImages(images => [...images, ...resp.hits]);
        setStatus('resolved');
        scrollToBottom();
        return;
      }

      setError(resp);
      setStatus('rejected');
      setPage(1);
      setImages([]);
    });
  }, [search, page]);

  const onClickButton = () => {
    setPage(page => page + 1);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: 999999999,
      behavior: 'smooth',
    });
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        <List>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                onClickToModal={onClickToModal}
                largeImageURL={largeImageURL}
              />
            );
          })}
        </List>
        <Button onClickButton={onClickButton} />
      </>
    );
  }

  return <></>;
}

ImageGallery.propTypes = {
  search: propTypes.string.isRequired,
  onClickToModal: propTypes.func.isRequired,
};
