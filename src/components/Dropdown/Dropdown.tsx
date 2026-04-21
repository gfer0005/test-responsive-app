import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X } from 'lucide-react';

export interface DropdownOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface DropdownProps {
  /**
   * Liste des options à afficher.
   */
  options: DropdownOption[];
  /**
   * Texte affiché lorsqu'aucune option n'est sélectionnée.
   * @default "Sélectionner..."
   */
  placeholder?: string;
  /**
   * Fonction appelée lorsqu'une option est sélectionnée.
   */
  onSelect?: (option: DropdownOption | null) => void;
  /**
   * Option actuellement sélectionnée (pour un composant contrôlé).
   */
  selected?: DropdownOption | null;
  /**
   * La largeur maximale du dropdown. Peut être n'importe quelle classe max-width de Tailwind.
   * @default "max-w-md"
   */
  maxWidth?: string;
  /**
   * Classe CSS personnalisée pour le conteneur.
   */
  className?: string;
  /**
   * Permet d'effacer la sélection.
   * @default true
   */
  clearable?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  placeholder = "Sélectionner...",
  onSelect,
  selected: externalSelected,
  maxWidth = "max-w-md",
  className = "",
  clearable = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<DropdownOption | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronisation avec la prop externe si fournie
  const selectedOption = externalSelected === undefined ? internalSelected : externalSelected;

  // Gestion des clics à l'extérieur pour fermer le dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    if (externalSelected === undefined) {
      setInternalSelected(option);
    }
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (externalSelected === undefined) {
      setInternalSelected(null);
    }
    if (onSelect) {
      onSelect(null);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${maxWidth} ${className}`}
    >
      <button 
        type="button"
        onClick={handleToggle}
        className={`
          flex items-center justify-between w-full px-2 py-2 bg-white border rounded-full transition-all duration-300 cursor-pointer
          ${isOpen ? 'border-[#4b5563] shadow-md' : 'border-[#4b5563] hover:border-gray-500'}
        `}
        style={{ fontFamily: 'Belfius21, sans-serif'}}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={`text-lg px-2 truncate ${selectedOption ? 'text-gray-800' : 'text-gray-400'}`}
          style={{ minWidth: '7rem', display: 'inline-block' }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="flex items-center gap-2 ml-2">
          {selectedOption && clearable && (
            <span 
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClear(e as unknown as React.MouseEvent); }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Effacer la sélection"
            >
              <X className="w-4 h-4 text-gray-500" />
            </span>
          )}
          <span className="p-1">
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
            style={{ minWidth: '100%' }}
          >
            <div className="max-h-75 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
              {options.length > 0 ? (
                options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={`
                      relative w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group
                      ${selectedOption?.id === option.id 
                        ? 'bg-[#e81e62]/5 text-[#e81e62] font-semibold ring-1 ring-[#e81e62]/20' 
                        : 'hover:bg-gray-50 text-gray-700'}
                    `}
                  >
                    {selectedOption?.id === option.id && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: '60%' }}
                        className="absolute left-0 w-1 bg-[#e81e62] rounded-full"
                      />
                    )}
                    <span className="flex-1 pr-4">{option.label}</span>
                    {selectedOption?.id === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-5 h-5 text-[#e81e62]" />
                      </motion.div>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500 italic">
                  No options available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Utilisation de React.memo pour éviter les re-rendus inutiles
export default React.memo(Dropdown);
