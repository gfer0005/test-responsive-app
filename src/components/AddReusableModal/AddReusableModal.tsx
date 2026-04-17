import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import type { MesureUnits, V8670Kpi } from '../../types/types';
import { Dropdown, type DropdownOption} from '../Dropdown/Dropdown';
import { Combobox, type ComboboxOption } from '../Combobox/Combobox';
import { KpiAPI } from '../../utils/api';

export interface AddReusableModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when the user clicks "Créer" */
  onCreate: (newData: any) => void;
  /** Title of the modal */
  title?: string;
  /** Custom className for the modal container */
  className?: string;
}

// Animation variants (consistent with other modals)
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

export function AddReusableModal({
  isOpen,
  onClose,
  onCreate,
  title = 'Create new KPI',
  className = '',
}: Readonly<AddReusableModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Local state for the new object
  const [formData, setFormData] = useState({
    kpi: null as ComboboxOption | null,
    kpiYear: new Date().getFullYear(),
    grpid: null as DropdownOption | null,
    mesureUnit: null as ComboboxOption | null,
    comments: ''
  });

  const [mesureUnits, setMesureUnits] = useState<ComboboxOption[]>([]);
  const [kpiList, setKpiList] = useState<V8670Kpi[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<ComboboxOption | null>(null);
  const [groupList, setGroupList] = useState<DropdownOption[]>([]); // State for group options

  useEffect(() => {
    // Fetch all units for the dropdown
    const fetchUnits = async () => {
      try {
        const data = await KpiAPI.getAllUnitsAsync();
        setMesureUnits(data.map((unit: any) => ({ id: unit.mesureUnit, title: unit.mesureLabel, label: unit.mesureLabel })));
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    const fetchKpis = async () => {
      try {
        const kpis = await KpiAPI.getAllAsync();
        setKpiList(kpis);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      }
    };

    const fetchGroups = async () => {
      try {
        const groups = await KpiAPI.getAllGroupsAsync();
        setGroupList(groups.map((group: any) => ({
          id: group.grpid,
          label: group.grplabel
        })));
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    if (isOpen) {
      fetchUnits();
      fetchKpis();
      fetchGroups();
    }
  }, [isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        kpi: null,
        kpiYear: new Date().getFullYear(),
        grpid: null,
        mesureUnit: null,
        comments: ''
      });
    }
  }, [isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kpi?.id) return; // Basic validation
    onCreate(formData);
    onClose();
  };

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
          onMouseDown={handleBackdropMouseDown}
        >
          {/* Backdrop overlay */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal container */}
          <motion.div
            ref={modalRef}
            className={`
              relative z-10 w-full max-w-3xl
              bg-[#e6e6e6]/40 rounded-4xl shadow-2xl border border-white backdrop-blur-lg
              flex flex-col
              max-h-[90vh]
              ${className}
            `}
            variants={modalVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 sm:px-8 sm:pt-8 shrink-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-shadow-2xl tracking-tight" style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 700 }}>
                {title}
              </h2>

              {/* Close button */}
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

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0" >
              <div className="flex-1 mx-6 sm:mx-8 my-5  rounded-3xl  bg-[#e6e6e6]/60 border border-white min-h-87.5 p-6 sm:p-8 flex flex-col gap-6  shadow-2xl relative">
                
                <div className="flex flex-col gap-2 relative z-5000">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">KPI Name</label>
                  <Combobox 
                      options={kpiList.map(kpi => ({
                        id: kpi.objid.toString(),
                        title: `${kpi.kpi} (${kpi.objid})`,
                        label: `${kpi.kpi} (${kpi.objid})`
                      }))}
                      selected={formData.kpi}
                      onSelect={(selected) => setFormData((prev) => ({ ...prev, kpi: selected }))} 
                      placeholder="KPI Name"
                      maxWidth="max-w-2xl"
                      dropdownClassName="z-1000"
                  />
                </div>

                {/* Group Dropdown */}
                <div className="flex flex-col gap-2 relative z-4000">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Groupe ID</label>
                  <Dropdown
                    options={groupList}
                    selected={formData.grpid}
                    onSelect={(selected) => setFormData({ ...formData, grpid: selected })}
                    placeholder="Select a group"
                    maxWidth="max-w-2xl"
                  />
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Année</label>
                  <input 
                    type="number"
                    value={formData.kpiYear}
                    onChange={e => setFormData({...formData, kpiYear: parseInt(e.target.value)})}
                    placeholder="Année"
                    className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 text-lg font-bold text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal"
                  />
                </div>

                

                <div className="flex flex-col gap-2 relative z-10">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Unité de mesure</label>
                  {/* <input 
                    value={formData.mesureUnit}
                    onChange={e => setFormData({...formData, mesureUnit: e.target.value})}
                    placeholder="Unité de mesure"
                    className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 text-lg font-bold text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 shadow-sm placeholder:text-gray-400 placeholder:font-normal"
                  /> */}
                  <Combobox 
                      options={mesureUnits}
                      selected={selectedUnits}
                      onSelect={setSelectedUnits}
                      placeholder="Unité de mesure"
                      maxWidth="max-w-2xl"
                      dropdownClassName="z-1000"
                  />
                </div>


                {/* <div className="flex flex-col gap-2 relative z-10">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Commentaires</label>
                  <textarea 
                    rows={4}
                    value={formData.comments}
                    onChange={e => setFormData({...formData, comments: e.target.value})}
                    placeholder="Commentaires"
                    className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 text-base text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-[#b3004a]/40 resize-none shadow-sm placeholder:text-gray-400 leading-relaxed"
                  />
                </div> */}
              </div>

              {/* Footer Actions */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 flex items-center justify-end gap-3 shrink-0">
                <motion.button
                  type="button"
                  onClick={onClose}

                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                   <geui-action-button  text='Cancel' size='normal' type='secondary'></geui-action-button>
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <geui-action-button  text='Create' size='normal'></geui-action-button>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
