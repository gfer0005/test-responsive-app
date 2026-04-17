import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from './background.png';

interface ErrorPageProps {
  /**
   * Le titre principal de la page d'accès refusé.
   * @default "Error"
   */
  title?: string;
  /**
   * Le texte d'explication détaillant pourquoi l'accès est refusé.
   * @default "An unexpected error has occurred. Please contact the administrator."
   */
  description?: string;
  /**
   * Le sous-titre de la page d'accès refusé.
   * @default "WPB - Error"
   */
  subTitle?: string;
}

/**
 * Composant NoAccessPage - Une page d'interdiction premium avec arrière-plan personnalisé.
 * 
 * @param {ErrorPageProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant de page d'erreur.
 */
export const ErrorPage: React.FC<ErrorPageProps> = ({ 
  title = "Error",
  subTitle = "WPB",
  description = "An unexpected error has occurred. Please contact the administrator."
}) => {

  const handleReload = () => {
    globalThis.location.reload();
  };

  const handleContactSupport = () => {
    globalThis.location.href = "mailto:support@example.com?subject=Support Request";
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat z-9999"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay sombre avec flou pour la lisibilité */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
        {/* Titre avec animation d'entrée */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wider"
          style={{ fontFamily: 'Belfius21, sans-serif' }}
        >
          {title}
        </motion.h1>

        {/* Ligne de séparation élégante */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-1 bg-[#e81e62] mb-8"
        />
        {/* Sous Titre */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-white/90 font-bold leading-relaxed mb-2"
          style={{ fontFamily: 'Belfius21, sans-serif' }}
        >
          {subTitle}
        </motion.p>
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-md md:text-lg text-white/90 leading-relaxed mb-10"
          style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 400 }}
        >
          {description}
        </motion.p>

        {/* Boutons de rechargement et de contact */}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mt-6"
        >

          <geui-action-button
            onClick={handleReload}
            text="Reload"
            type='secondary'
            size='large'
          />
          <geui-action-button
            onClick={handleContactSupport}
            text="Contact Support"
            type='secondary-inverted'
            size='large'
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
