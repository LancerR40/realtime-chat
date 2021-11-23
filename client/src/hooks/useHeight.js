import { useState, useEffect } from 'react';

const useHeight = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handler = addEventListener(
      'resize',
      () => {
        window.innerHeight <= 650
          ? setScreenHeight(650)
          : setScreenHeight(window.innerHeight);
      },
      true
    );

    return () => removeEventListener('resize', handler, true);
  }, [window.innerHeight]);

  return screenHeight;
};

export default useHeight;
