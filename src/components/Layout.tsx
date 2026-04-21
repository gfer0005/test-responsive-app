import React, { useState } from 'react';
import { Modal } from './Modal/Modal';

interface LayoutProps {
  children: React.ReactNode;
  /**
   * Footer title displayed on the bottom.
   * Default: "Data Entry Tool 2.0"
   */
  footerContent?: string;
  /**
   * Title displayed on the left, next to the logo.
   * Default: "Data Entry Tool 2.0"
   */
  title?: string;
  /**
   * Title displayed on the right side of the header.
   * Default: "GIUSEPPE FERRARA - ADMIN"
   */
  rightTitle?: string;
  /**
   * Path to the small logo image.
   * Default: "/img/logo.png"
   */
  logoSrc?: string;
  /**
   * Path to the background repeating pattern.
   * Default: "/img/bg.png"
   */
  backgroundSrc?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children,
  footerContent = "Data Entry Tool 2.0 - 2026",
  title = "Data Entry Tool 2.0",
  rightTitle = "GIUSEPPE FERRARA - ADMIN",
  logoSrc = "/img/logo_belfius.png",
  backgroundSrc = "/img/bg.svg"
}) => {
  const [isOpen, setIsOpen] = useState(false); // Moved inside the component

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f9f9f9]">
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${backgroundSrc}')`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundColor: '#f9f9f9', // subtle light gray bg
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col pt-10 text-base">
        {/* Header */}
        <header className="flex justify-between items-center px-10 sm:px-14 md:px-24 mb-10 mt-2">
          {/* Logo and Title */}
          <div className="flex items-center gap-6">
            <a href="/"><img src={logoSrc} alt="Logo" className="h-6 w-auto object-contain" /></a>
            <geui-title-text size="large" adaptive>{title}</geui-title-text>
          </div>

          {/* Right Text */}
          <div className="flex flex-row justify-center gap-4 items-center ">
            <geui-title-text size="x-small" adaptive>{rightTitle}</geui-title-text>
            <geui-action-button size='small' type='secondary' text='Help ?' onClick={() =>  globalThis.location.href = 'mailto:giuseppe.gf.ferrara@belfius.be?subject=Data%20Entry%20Tool%20-%20WRITE%20YOUR%20SUBJECT%20HERE'}></geui-action-button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full flex flex-col px-10 sm:px-14 md:px-24 pb-2 mx-auto overflow-hidden">
          {children}
        </main>
        {/* Footer */}
        <footer className="flex items-center align-center justify-center mb-4 mt-4 gap-2" style={{ fontFamily: 'Belfius21, sans-serif', fontWeight: '550', color: '#626262ff' }}>
          {footerContent + ' -'}
          <geui-link text='Need more help ?' onClick={() => setIsOpen(true)}></geui-link>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="How to use the Data Entry Tool ?">
            <p className='text-2xl font-bold'>How does the tool works ?</p> <br />
            <p className='text-xl'>1. Select a KPI, a month and a year to display the relevant data.</p>
            <p className='text-xl'>2. Click on a row to view details and add comments or edit KPI values.</p>
            <p className='text-xl'>3. Use the filters to narrow down the data.</p>
            <p className='text-xl'>4. Click on the column headers to sort the data.</p>
            <p className='text-xl'>5. Contact support for any issues or questions.</p> <br />
            <p className='text-black text-xl font-bold'>For more details check the documentation at : <a className='text-[#c30045] underline' target="_blank" rel="noopener noreferrer" href="https://confluence.belwired.net:8443/spaces/00008203B/pages/291817755/Data+Entry+Tool+2026">Data Entry Tool 2026 Documentation</a></p>
          </Modal>
        </footer>
      </div>
    </div>
  );
};
