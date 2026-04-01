import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import backgroundImage from './background.png';

interface NoAccessPageProps {
  /**
   * Le titre principal de la page d'accès refusé.
   * @default "Accès Refusé"
   */
  title?: string;
  /**
   * Le texte d'explication détaillant pourquoi l'accès est refusé.
   * @default "Vous n'avez pas les permissions nécessaires pour accéder à cette application. Veuillez contacter l'administrateur."
   */
  description?: string;
  /**
   * Le sous-titre de la page d'accès refusé.
   * @default "WPB"
   */
  subTitle?: string;
  /**
   * Le bouton de contact (callback).
   */
  onContactClick?: () => void;
  /**
   * L'adresse e-mail de contact (utilisée par défaut si onContactClick n'est pas fourni).
   * @default "admin@example.com"
   */
  contactEmail?: string;
}

/**
 * Composant NoAccessPage - Une page d'interdiction premium avec arrière-plan personnalisé.
 * 
 * @param {NoAccessPageProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant de page d'accès refusé.
 */
export const NoAccessPage: React.FC<NoAccessPageProps> = ({ 
  title = "Accès Refusé", 
  subTitle = "WPB",
  description = "Vous n'avez pas les permissions nécessaires pour accéder à cette application. Veuillez contacter l'administrateur.",
  contactEmail = "admin@example.com",
  onContactClick
}) => {
  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      window.location.href = `mailto:${contactEmail}`;
    }
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat z-[9999]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay sombre avec flou pour la lisibilité */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[8px]" />

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

        {/* Bouton de contact premium */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={handleContact}
          style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 400 }}
          className="px-8 py-3.5 bg-[#e81e62] hover:bg-[#c30b4e] text-white font-semibold rounded-full shadow-lg shadow-[#e81e62]/40 transition-all border border-transparent flex items-center gap-3 active:shadow-inner"
        >
          <Mail></Mail>
          CONTACTER LE SUPPORT
        </motion.button>
      </div>
    </div>
  );
};

export default NoAccessPage;
