import React, { useState, useEffect } from 'react';
import api from '../../service/pixabayApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { List } from './ImageGallery.styled';
import propTypes from 'prop-types';

export default function ImageGallery({ search, onClickToModal }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    if (!search) return;

    fetchImages(1);

    return () => {
      setError(null);
      setNextPage(1);
      setImages([]);
      setStatus('idle');
    };
  }, [search]);

  const fetchImages = page => {
    const isPage = typeof page === 'number';
    setStatus('pending');
    api(search, isPage ? page : nextPage).then(resp => {
      if (typeof resp !== 'string') {
        setImages(images => [...images, ...resp.hits]);
        setStatus('resolved');
        setNextPage(number => number + 1);
        scrollToBottom();
        return;
      }

      setError(resp);
      setStatus('rejected');
      setNextPage(1);
      setImages([]);
    });
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
        <Button onClickButton={fetchImages} />
      </>
    );
  }

  return <></>;
}

ImageGallery.propTypes = {
  search: propTypes.string.isRequired,
  onClickToModal: propTypes.func.isRequired,
};
