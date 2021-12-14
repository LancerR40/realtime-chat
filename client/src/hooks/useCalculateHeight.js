import { useState, useEffect } from 'react';

const useCalculateHeight = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const screenHeightHandler = addEventListener('resize', () => {
      if (window.innerHeight < 650) {
        return setScreenHeight(650);
      }

      setScreenHeight(window.innerHeight);
    });

    return () => removeEventListener('resize', screenHeightHandler);
  }, [window.innerHeight]);

  return screenHeight;
};

export default useCalculateHeight;
