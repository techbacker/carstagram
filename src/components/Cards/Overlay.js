import { useRef, useState } from 'react';
import { BiCollection, BiHeart, BiImageAlt } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { LOADING_IMAGE } from '../../constants';
import { useIsClickedOutsideElement } from '../../hooks';
import Image from './Image';
import './Overlay.css';

const initialFilterState = {
  blur: 0,
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 0,
  sepia: 0,
};

export default function Overlay({
  selectedImage,
  isOpenOverlay,
  closeOverlay,
}) {
  const [filters, setFilters] = useState(initialFilterState);
  const overlayInnerRef = useRef(null);
  useIsClickedOutsideElement(overlayInnerRef, closeOverlay);

  const resetButtonOnClick = () => setFilters(initialFilterState);

  return (
    <div className={`overlay ${isOpenOverlay ? 'open' : ''}`}>
      {selectedImage && (
        <div ref={overlayInnerRef} className='overlay__inner'>
          <div>
            <Image
              src={
                selectedImage.url ? `${selectedImage.url}.jpg` : LOADING_IMAGE
              }
              className='overlay__image'
              style={{
                filter: `blur(${filters.blur}px) brightness(${
                  filters.brightness
                }) contrast(${filters.contrast}) grayscale(${
                  filters.grayscale
                }) hue-rotate(${filters.hueRotate}deg) invert(${
                  filters.invert
                }) opacity(${filters.opacity}%) saturate(${
                  filters.saturate + 1
                }) sepia(${filters.sepia})`,
              }}
            />
          </div>
          <div className='overlay__info'>
            <div className='overlay__info__close'>
              <GrClose onClick={closeOverlay} />
            </div>
            {selectedImage.user && (
              <div className='overlay__info__user'>
                <Image
                  className='user-info__avatar'
                  src={`${selectedImage.user.profile_image}.webp`}
                  alt={selectedImage.user.username}
                />
                <span className='overlay__info__user__meta-data'>
                  {selectedImage.user.username} <br></br>
                  {selectedImage.user.location && (
                    <span>
                      {selectedImage.user.location} <br></br>
                    </span>
                  )}
                  <BiHeart />
                  &nbsp;{selectedImage.user.total_likes} <BiCollection />
                  &nbsp;{selectedImage.user.total_collections}
                  <BiImageAlt />
                  &nbsp;{selectedImage.user.total_photos}
                </span>
                {selectedImage.user.bio && (
                  <p className='overlay__limit-text-lines'>
                    {selectedImage.user.bio}
                  </p>
                )}
              </div>
            )}
            <div className='overlay__info__description'>
              {selectedImage.alt_description && (
                <div className='overlay__info__description__title'>
                  {selectedImage.alt_description.toUpperCase()}
                </div>
              )}
              {selectedImage.likes && (
                <div>
                  <BiHeart />
                  &nbsp;{selectedImage.likes}
                </div>
              )}
              {selectedImage.description && (
                <div className='overlay__limit-text-lines'>
                  {selectedImage.description}
                </div>
              )}
            </div>
            <div className='overlay__info__filters'>
              <div>
                <label>Blur</label>
                <span>
                  <input
                    type='range'
                    min='0'
                    max='10'
                    value={filters.blur}
                    onChange={(e) =>
                      setFilters({ ...filters, blur: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Brightness</label>
                <span>
                  <input
                    type='range'
                    min='1'
                    max='5'
                    value={filters.brightness}
                    onChange={(e) =>
                      setFilters({ ...filters, brightness: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Contrast</label>
                <span>
                  <input
                    type='range'
                    min='1'
                    max='10'
                    value={filters.contrast}
                    onChange={(e) =>
                      setFilters({ ...filters, contrast: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Grayscale</label>
                <span>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='.1'
                    value={filters.grayscale}
                    onChange={(e) =>
                      setFilters({ ...filters, grayscale: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Hue rotate</label>
                <span>
                  <input
                    type='range'
                    min='0'
                    max='180'
                    step='10'
                    value={filters.hueRotate}
                    onChange={(e) =>
                      setFilters({ ...filters, hueRotate: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Invert</label>
                <span>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='.1'
                    value={filters.invert}
                    onChange={(e) =>
                      setFilters({ ...filters, invert: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Opacity</label>
                <span>
                  <input
                    type='range'
                    min='10'
                    max='100'
                    step='10'
                    value={filters.opacity}
                    onChange={(e) =>
                      setFilters({ ...filters, opacity: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Saturate</label>
                <span>
                  <input
                    type='range'
                    min='0'
                    max='3'
                    value={filters.saturate}
                    onChange={(e) =>
                      setFilters({ ...filters, saturate: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <label>Sepia</label>
                <span>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='.1'
                    value={filters.sepia}
                    onChange={(e) =>
                      setFilters({ ...filters, sepia: e.target.value })
                    }
                  />
                </span>
              </div>
              <div className='overlay__info__btn-wrapper'>
                <button
                  className='overlay__info__reset-btn overlay__draw-border'
                  onClick={resetButtonOnClick}
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
