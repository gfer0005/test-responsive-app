import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pencil, Check } from 'lucide-react';
import { type V8670KpiInputDetail } from '../../types/types';

export interface DetailModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when the edit mode is confirmed */
  onSave?: (data: any) => void;
  /** Title of the modal */
  title?: string;
  /** Initial mock data to display */
  initialData?: V8670KpiInputDetail;
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
      ease: "spring" as const,
    },
  },
};

export function DetailModal({
  isOpen,
  onClose,
  onSave,
  title = 'Détails du Projet',
  initialData,
  className = '',
}: DetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<V8670KpiInputDetail | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
      setIsEditing(false);
    }
  }, [isOpen, initialData]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle Backdrop click
  const handleBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleToggleEdit = () => {
    if (isEditing && onSave && formData) {
      onSave(formData);
    }
    setIsEditing(!isEditing);
  };

  const fieldsToDisplay: Array<keyof V8670KpiInputDetail> = [
    'kpi',
    'kpiYear',
    'objmthvalue',
    'objmthmastervalue',
    'mesureUnit',
    'mesureLabel',
    'comments',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 md:p-8"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop overlay */}
          <motion.div
            className="absolute inset-0 bg-black/35 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal container */}
          <motion.div
            ref={modalRef}
            className={`
              relative z-10 w-full max-w-3xl sm:max-w-xl sm:max-h-md
               bg-[#e6e6e6]/40 rounded-4xl shadow-2xl border border-white backdrop-blur-lg
              flex flex-col
              max-h-[80vh]
              ${className}
            `}
            variants={modalVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 sm:px-8 sm:pt-8 shrink-0">
              <h2 className="text-3xl sm:text-2xl font-bold text-white text-shadow-2xl tracking-tight" style={{ fontFamily: 'Belfius21, sans-serif'}}>
                {title}
              </h2>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleToggleEdit}
                  className={`
                    flex items-center justify-center backdrop-blur-xl
                    w-10 h-10 sm:w-11 sm:h-11
                    rounded-full
                    text-white cursor-pointer
                    shadow-md border border-white transition-colors
                    ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-800'}
                  `}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isEditing ? "Enregistrer" : "Éditer"}
                  title={isEditing ? "Enregistrer les modifications" : "Éditer l'objet"}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isEditing ? "check" : "pencil"}
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isEditing ? <Check size={20} strokeWidth={2.5} /> : <Pencil size={18} strokeWidth={2.5} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="
                    flex items-center justify-center backdrop-blur-xl
                    w-10 h-10 sm:w-11 sm:h-11
                    rounded-full bg-[#b3004a]
                    text-white cursor-pointer
                    shadow-md border border-white hover:bg-[#9a0040] transition-colors
                  "
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fermer"
                >
                  <X size={20} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 mx-6 sm:mx-8 my-5 rounded-3xl bg-[#e6e6e6]/60 border border-white min-h-87.5 p-6 sm:p-8 flex flex-col gap-6 shadow-md relative overflow-auto"
            style={{ fontFamily: 'Belfius21, sans-serif' }}>
              {formData && (
                <>
                  {/* KPI Details Row */}
                  <div className="flex flex-col gap-2 relative z-10">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">
                      KPI
                      </label>
                    <input
                      disabled
                      value={formData.kpi || ''}
                      className={`w-full border border-white/80 rounded-2xl px-4 py-3 text-lg font-bold text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal bg-[#e6e6e6]/80`}
                      />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 relative z-10 pt-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">KPI Year</label>
                      <input
                        disabled
                        value={formData.kpiYear || ''}
                        className={`w-full border border-white/80 rounded-2xl px-4 py-3 text-base font-medium text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal bg-[#e6e6e6]/80`}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Value Month</label>
                      <input
                        disabled={!isEditing}
                        value={formData.objmthvalue ?? 0}
                        onChange={(e) => setFormData({ ...formData, objmthvalue: parseFloat(e.target.value) || null })}
                        className={`w-full border border-white/80 rounded-2xl px-4 py-3 text-base font-medium text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal ${isEditing ? 'bg-white' : 'bg-[#e6e6e6]/80'}`}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Master Value</label>
                      <input
                        disabled={!isEditing}
                        value={formData.objmthmastervalue ?? 0}
                        onChange={(e) => setFormData({ ...formData, objmthmastervalue: parseFloat(e.target.value) || null })}
                        className={`w-full border border-white/80 rounded-2xl px-4 py-3 text-base font-medium text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal ${isEditing ? 'bg-white' : 'bg-[#e6e6e6]/80'}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 relative z-10 pt-2">
                    <div className="flex-1 flex flex-col gap-2 sm:w-1/2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Measure Unit</label>
                      <input
                        disabled
                        value={formData.mesureUnit || ''}
                        className="w-full bg-[#e6e6e6]/80 border border-white/80 rounded-2xl px-2 sm:px-4 py-2 sm:py-3 text-base font-medium text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 sm:w-1/2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Measure Label</label>
                      <input
                        disabled
                        value={formData.mesureLabel || ''}
                        className="w-full bg-[#e6e6e6]/80 border border-white/80 rounded-2xl px-2 sm:px-4 py-2 sm:py-3 text-base font-medium text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Comments</label>
                    <textarea
                      disabled={!isEditing}
                      value={formData.comments || ''}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      rows={2}
                      className={`w-full border border-white/80 rounded-2xl px-2 sm:px-4 py-2 sm:py-3 text-base text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 resize-none shadow-sm placeholder:text-gray-400 leading-relaxed ${isEditing ? 'bg-white' : 'bg-[#e6e6e6]/80'}`}
                      placeholder="Add comments here..."
                      style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                    />
                  </div>
                </>
              )}
            </div>
              {/* Padding */}
              <div className="p-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
