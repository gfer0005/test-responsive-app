import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.screen.width : 0, // Utilise la résolution de l'écran Windows
  });

  const [isSmallResolution, setIsSmallResolution] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.screen.width; // Met à jour avec la largeur de l'écran Windows
      setWindowSize({ width });
      setIsSmallResolution(width < 1540); // Détecte une petite résolution (par exemple, < 1020px)
      console.log('Largeur actuelle de l\'écran :', width);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...windowSize, isSmallResolution };
}