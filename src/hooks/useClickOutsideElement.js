import { useEffect } from 'react';

function useIsClickedOutside(ref, relayFunction) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        relayFunction();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, relayFunction]);
}

export default useIsClickedOutside;
