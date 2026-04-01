import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MyMenu } from "./components/ReusableMenu-RED/MyMenu";
import { Table } from './components/ReusableTable/Table';
import type { Column } from './components/ReusableTable/Table';
import { Modal } from './components/Modal';
import { Pencil, Copy, Share2, Archive, ShieldOff } from "lucide-react";
import { LoadingPage } from './components/LoadingPage';
import { NoAccessPage } from './components/NoAccessPage';
import { Combobox, type ComboboxOption } from './components/Combobox';
import { KpiAPI } from './utils/api';
import type { V8670Kpi } from './types/types';
import KpiTable from './components/ReusableTable/KpiTable';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<ComboboxOption | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoAccess, setShowNoAccess] = useState(false);
  const [kpiList, setKpiList] = useState<V8670Kpi[]>([]);

  const [value, setValue] = useState<string | null>(null);

  const kpiOptions: ComboboxOption[] = kpiList
    .filter((kpi) => kpi.kpi != null)
    .map((kpi, index) => ({
      id: `${kpi.objid}-${index}`,
      title: kpi.kpi!,
    }));

  const menuOptions = [
    {
      label: "Edit",
      icon: <Pencil size={16} />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      label: "Copy",
      icon: <Copy size={16} />,
      onClick: () => console.log("Copy clicked"),
    },
    {
      label: "Share",
      icon: <Share2 size={16} />,
      onClick: () => console.log("Share clicked"),
    },
    {
      label: "Archive",
      icon: <Archive size={16} />,
      onClick: () => console.log("Archive clicked"),
    },
  ];

  useEffect(() => {
    console.log('[DEBUG] Fetching KPIs...');
    KpiAPI.getAllAsync()
      .then((data:any) => {
        console.log('[DEBUG] Raw response:', data);
        setKpiList(data);
      })
      .catch((err:any) => {
        console.error('[DEBUG] Fetch error:', err);
      });
  }, []);

  useEffect(() => {
    // Simule un chargement de 5 secondes pour l'essai
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage title="WPB Data Entry Tool" />;
  }

  if (showNoAccess) {
    return (
      <NoAccessPage 
        title="Accès Restreint" 
        description="Votre profil n'a pas encore été autorisé à accéder à cette section du WPB Data Entry Tool. Veuillez contacter l'équipe IT pour demander l'accès."
        contactEmail="support.it@wpb-tool.com"
        subTitle="WPB Data Entry Tool"
      />

    );
  }

  return (
    <Layout
      title="Data Entry Tool"
      rightTitle="GIUSEPPE FERRARA - ADMIN"
      logoSrc="/img/logo_belfius.png"
      fadedImageSrc="/img/image.png"
      backgroundSrc="/img/bg.svg"
    >
       <div className="w-full h-full flex flex-col gap-2 overflow-visible">
        <div className="w-full flex flex-row gap-2 justify-between mb-6">
          {/* <geui-title-text size="medium">KPI SELECTION</geui-title-text> */}
          <Combobox 
              options={kpiOptions}
              selected={selectedKpi}
              onSelect={setSelectedKpi}
              placeholder="KPI Selection"
              maxWidth="max-w-xl"
            />

<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <geui-title-text size="small">MONTH</geui-title-text>

          
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <geui-title-text size="small">YEAR</geui-title-text>
          
          
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <geui-title-text size="small" >MANCO</geui-title-text>
          <geui-switch-button labelAlignment='center'></geui-switch-button>
          
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <geui-title-text size="small">MANUAL</geui-title-text>
          <geui-switch-button labelAlignment='center'></geui-switch-button>
          
        </div>
        
        <button
              onClick={() => setShowNoAccess(true)}
              className="px-4 py-2 rounded-full bg-slate-800 text-white font-semibold text-sm cursor-pointer hover:bg-slate-700 transition-colors shadow-lg flex items-center gap-2 h-[46px]"
            >
              <ShieldOff size={16} />
              Test No Access
            </button>
        {/* <button
              onClick={() => setShowNoAccess(true)}
              className="px-4 py-2 rounded-full bg-slate-800 text-white font-semibold text-sm cursor-pointer hover:bg-slate-700 transition-colors shadow-lg flex items-center gap-2 h-[46px]"
            >
              <ShieldOff size={16} />
              Test No Access
            </button> */}
        </div>
      </div> 
      <KpiTable/>
      {/* <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl h-full w-full  min-h-[55vh]   xl:min-h-[65vh] max-h-[80vh] p-8 border border-gray-100 flex flex-col items-center justify-center">
      

          
        <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Belfius21, sans-serif' }}>Content Area</h2>
        <p className="text-gray-600 text-center max-w-xl mb-8" style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: 400 }}>
          This is an example implementation of your reusable React layout using Tailwind CSS. 
          The background and images are set through props on the <code>Layout</code> component to allow reuse across projects.
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
        <MyMenu items={menuOptions} direction="top" anchor="start" />

      <geui-action-button onClick={() => setIsOpen(true)} text='Ouvrir le Modal'></geui-action-button>
        </div>
        
      
      </div> */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onExport={() => console.log('Export')}
        onReload={() => console.log('Reload')}
      >
        <p>Contenu du modal ici...</p>
      </Modal>
    </Layout>
  );
}

export default App;
