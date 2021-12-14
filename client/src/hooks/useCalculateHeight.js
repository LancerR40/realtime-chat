import { useState, useEffect } from 'react';

const useCalculateHeight = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const screenHeightHandler = addEventListener(
      'resize',
      () => {
        if (window.innerHeight <= 650) {
          return setScreenHeight(650);
        }

        setScreenHeight(window.innerHeight);
      },
      true
    );

    return () => removeEventListener('resize', screenHeightHandler, true);
  }, [window.innerHeight]);

  return screenHeight;
};

export default useCalculateHeight;
