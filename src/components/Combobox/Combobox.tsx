import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Check } from 'lucide-react';

export interface ComboboxOption {
  id: string | number;
  title: string;
  [key: string]: any;
}

interface ComboboxProps {
  /**
   * List of options to display and filter.
   */
  options: ComboboxOption[];
  /**
   * Placeholder text shown when no option is selected and input is empty.
   * @default "Rechercher..."
   */
  placeholder?: string;
  /**
   * Callback called when an option is selected.
   */
  onSelect?: (option: ComboboxOption | null) => void;
  /**
   * Currently selected option. If provided, the component behaves as a controlled component.
   */
  selected?: ComboboxOption | null;
  /**
   * The maximum width of the combobox. Can be any Tailwind max-width class.
   * @default "max-w-md"
   */
  maxWidth?: string;
  /**
   * Custom CSS class for the container.
   */
  className?: string;
}

/**
 * Combobox Component - A premium, searchable dropdown selection input.
 * Inspired by the provided design with a rounded interface and smooth animations.
 */
export const Combobox: React.FC<ComboboxProps> = ({
  options = [],
  placeholder = "KPI Selection",
  onSelect,
  selected: externalSelected,
  maxWidth = "max-w-md",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [internalSelected, setInternalSelected] = useState<ComboboxOption | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Synchronize with external selected prop if provided
  const selectedOption = externalSelected !== undefined ? externalSelected : internalSelected;

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    return options.filter(option =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset search term to selected option's title when closing without picking
        if (selectedOption) {
          setSearchTerm("");
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelect = (option: ComboboxOption) => {
    if (externalSelected === undefined) {
      setInternalSelected(option);
    }
    setSearchTerm("");
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
    setSearchTerm("");
    if (onSelect) {
      onSelect(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${maxWidth} ${className}`}
    >
      <div 
        onClick={handleToggle}
        className={`
          flex items-center px-4 py-2 bg-white border rounded-full transition-all duration-300 cursor-text
          ${isOpen ? 'border-[#4b5563] shadow-md' : 'border-[#4b5563]'}
        `}
      >
        <Search className="w-5 h-5 text-gray-800 mr-2 flex-shrink-0" />
        
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : (selectedOption ? selectedOption.title : "")}
          onChange={handleInputChange}
          placeholder={selectedOption ? selectedOption.title : placeholder}
          className="w-full bg-transparent border-none focus:outline-none text-gray-800 text-lg placeholder:text-gray-400"
          style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 500 }}
        />

        <div className="flex items-center gap-2 ml-2">
          {selectedOption && (
            <button 
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={`
                      relative w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-200 group
                      ${selectedOption?.id === option.id 
                        ? 'bg-[#e81e62]/5 text-[#e81e62] font-semibold ring-1 ring-[#e81e62]/20' 
                        : 'hover:bg-gray-50 text-gray-700'}
                    `}
                    style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 500 }}
                  >
                    {selectedOption?.id === option.id && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: '60%' }}
                        className="absolute left-0 w-1 bg-[#e81e62] rounded-full"
                      />
                    )}
                    <span className="flex-1 pr-4">{option.title}</span>
                    {selectedOption?.id === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-5 h-5 text-[#e81e62]" style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 700 }} />
                      </motion.div>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500 italic" style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 500 }}>
                  No results for "{searchTerm}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Combobox;
