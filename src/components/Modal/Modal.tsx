import { useRef, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title (default: "Détails") */
  title?: string;
  /** Content to render inside the modal body */
  children?: ReactNode;
  /** Show the Export button (default: true) */
  showExport?: boolean;
  /** Show the Reload button (default: true) */
  showReload?: boolean;
  /** Callback when Export is clicked */
  onExport?: () => void;
  /** Callback when Reload is clicked */
  onReload?: () => void;
  /** Custom className for the modal container */
  className?: string;
}

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 300,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.2,
      stiffness: 300,
      ease: "spring" as const,
    },
  },
};

export function Modal({
  isOpen,
  onClose,
  title = 'Détails',
  children,
  className = '',
}: Readonly<ModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on click outside (mousedown on backdrop)
  const handleBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only close if the click target is the backdrop itself
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          onMouseDown={handleBackdropMouseDown}
          id="modal-backdrop"
        >
          {/* Backdrop overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal container */}
          <motion.div
            ref={modalRef}
            className={`
              relative z-10 w-full max-w-4xl
            bg-[#e6e6e6]/40 rounded-4xl shadow-lg border border-white backdrop-blur-sm
              flex flex-col
              max-h-[90vh]
              ${className}
            `}
            variants={modalVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            id="modal-container"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 sm:px-8 sm:pt-8">
              <h2 className="text-xl sm:text-3xl font-bold text-white text-shadow-2xl tracking-tight" style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 700 }}>
                {title}
              </h2>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="
                  flex items-center justify-center backdrop-blur-xl
                  w-10 h-10 sm:w-9 sm:h-9
                  rounded-full bg-[#b3004a]/80
                  text-white cursor-pointer
                  shadow-md border border-white 
                  
                "
                whileTap={{ scale: 0.9 }}
                aria-label="Fermer le modal"
                id="modal-close-btn"
              >
                <X size={18} strokeWidth={2} />
              </motion.button>
            </div>

            {/* Content area */}
            <div className="flex-1 mx-6 sm:mx-8 my-4 overflow-auto rounded-2xl border border-white bg-[#e6e6e6]/90 min-h-15 sm:min-h-42.5 p-4 sm:p-6 backdrop-blur-xl"
            style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 400 }}>
              {children}
            </div>

            {/* Footer with buttons */}
            <div className="flex items-center justify-end gap-3 px-6 pb-6 sm:px-8 sm:pb-8 pt-2">
             
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
