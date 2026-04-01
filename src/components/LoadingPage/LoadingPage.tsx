import React from 'react';
import { motion } from 'framer-motion';

let backgroundImage: string | undefined;
try {
  backgroundImage = new URL('./background.png', import.meta.url).href;
} catch {
  backgroundImage = undefined;
}

interface LoadingPageProps {
  /**
   * Le titre à afficher sur la page de chargement.
   * @default "Chargement..."
   */
  title?: string;
}

/**
 * Composant LoadingPage - Une page de chargement premium avec arrière-plan personnalisé.
 * 
 * @param {LoadingPageProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant de page de chargement.
 */
export const LoadingPage: React.FC<LoadingPageProps> = ({ title = "Chargement..." }) => {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat z-[9999] gap-8"
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundImage ? undefined : '#1e293b',
      }}
    >
      {/* Overlay subtil pour améliorer le contraste du texte blanc */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[8px]" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] // Custom ease-out cubic
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-wide mb-4"
          
        >
          {title}
        </motion.h1>

        <div className="flex gap-4 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              animate={{
                y: [0, -12, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
