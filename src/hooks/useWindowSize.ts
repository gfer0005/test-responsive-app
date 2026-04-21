import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: globalThis.window === undefined ? 0 : window.innerWidth,
    height: globalThis.window === undefined ? 0 : window.innerHeight,
  });

  const [isSmallResolution, setIsSmallResolution] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsSmallResolution(width < 1540);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...windowSize, isSmallResolution };
}