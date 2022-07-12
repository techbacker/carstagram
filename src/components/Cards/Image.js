import { useState, useEffect, useRef } from 'react';
import { ERROR_IMAGE, LOADING_IMAGE } from '../../constants';
import { useIsInView } from '../../hooks';

export default function Image({ src, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(LOADING_IMAGE);
  const innerRef = useRef(null);
  const isInView = useIsInView(innerRef);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
    }
  }, [src]);

  const onError = () => setImgSrc(ERROR_IMAGE);

  return (
    <img
      {...props}
      ref={innerRef}
      src={isInView ? imgSrc : LOADING_IMAGE}
      onError={onError}
      alt={alt}
    />
  );
}
