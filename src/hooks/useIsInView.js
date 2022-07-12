import { useState, useEffect } from 'react';

function useIsInView(ref) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          observer.disconnect();
        }
        setIsInView(isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isInView;
}

export default useIsInView;
