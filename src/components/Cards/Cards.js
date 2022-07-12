import { useState, useEffect } from 'react';
import Image from './Image';
import './Cards.css';
import Overlay from './Overlay';
import { LOADING_IMAGE } from '../../constants';

const IMAGES_NUMBER = 10;

export default function Cards() {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [images, setImages] = useState(
    new Array(IMAGES_NUMBER).fill(null).map((_, index) => ({ id: index }))
  );

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetch(
        `images?limit=${IMAGES_NUMBER}&isThrottling=${false}`
      );
      const data = await images.json();
      console.info('Success', data);
      setImages(data);
    };

    fetchImages().catch((error) => console.error('Error', error));
  }, []);

  const imageWrapperOnClick = (img) => {
    setSelectedImage(img);
    setIsOpenOverlay(true);
  };

  const overlayOnClick = () => {
    setSelectedImage({});
    setIsOpenOverlay(false);
  };

  return (
    <>
      <div className='cards'>
        {images.map((img) => (
          <div
            key={img.id}
            className='cards__card cards__rainbow-border'
            onClick={() => imageWrapperOnClick(img)}
          >
            {img.user ? (
              <div className='cards__user-info'>
                <Image
                  className='user-info__avatar'
                  src={
                    img.user.profile_image
                      ? `${img.user.profile_image}.webp`
                      : ''
                  }
                  alt={img.user.username}
                />
                <span className='cards__user-info__username'>
                  {img.user.name}
                </span>
              </div>
            ) : (
              <div className='cards__user-info'>
                <Image
                  className='user-info__avatar'
                  src={LOADING_IMAGE}
                  alt='dummy-avatar'
                />
                <span className='cards__user-info__username'>loading</span>
              </div>
            )}
            {img.url ? (
              <Image
                className='cards__main-img '
                src={img.url ? `${img.url}.webp` : ''}
                alt={img.alt_description}
              />
            ) : (
              <Image
                className='cards__main-img '
                src={LOADING_IMAGE}
                alt='dummy-main-image'
              />
            )}
          </div>
        ))}
        <Overlay
          selectedImage={selectedImage}
          isOpenOverlay={isOpenOverlay}
          closeOverlay={overlayOnClick}
        />
      </div>
    </>
  );
}
