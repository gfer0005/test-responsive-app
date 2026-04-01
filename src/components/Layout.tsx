import React from 'react';
import { HelpCircle, HandHelping, HandFist} from 'lucide-react';

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
   * Path to the large faded image on the bottom left.
   * Default: "/img/logo-faded.png"
   */
  fadedImageSrc?: string;
  /**
   * Path to the background repeating pattern.
   * Default: "/img/bg.png"
   */
  backgroundSrc?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children,
  footerContent = "Data Entry Tool 2.0",
  title = "Data Entry Tool 2.0",
  rightTitle = "GIUSEPPE FERRARA - ADMIN",
  logoSrc = "/img/logo_belfius.png",
  fadedImageSrc = "/img/image.png",
  backgroundSrc = "/img/bg.svg"
}) => {
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
      
      {/* Bottom Right Faded Image */}
      {/* <img 
        src={fadedImageSrc} 
        alt="Background Shape" 
        className="absolute left-0 z-0 opacity-20 pointer-events-none w-[1200px] md:w-[1200px] lg:w-[2000px] max-w-none transform translate-x-[20%] translate-y-[20%]"
      /> */}

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col pt-10">
        {/* Header */}
        <header className="flex justify-between items-center px-10 sm:px-14 md:px-24 mb-10 mt-2">
          {/* Logo and Title */}
          <div className="flex items-center gap-6">
            <a href="/"><img src={logoSrc} alt="Logo" className="h-6 w-auto object-contain" /></a>
            <geui-title-text size="large" adaptive>{title}</geui-title-text>
            
          </div>

          {/* Right Text */}
          {/* <div className="flex flex-row justify-center gap-4 items-center ">
          <geui-title-text size="x-small" adaptive>{rightTitle}</geui-title-text>
          <button
              // onClick={() => setHelp(true)}
              className=" text-[#C30045] font-medium text-sm cursor-pointer"
            >
              <HelpCircle size={24}/>
              
            </button>
          </div> */}
          {/* Right Text V2*/}
          <div className="flex flex-row justify-center gap-4 items-center ">
          <geui-title-text size="x-small" adaptive>{rightTitle}</geui-title-text>
          <geui-action-button size='small' type='secondary' text='Help ?' onClick={() =>  window.location.href = 'mailto:giuseppe.gf.ferrara@blefius.be?subject=DataEntryTool%20-%20'}></geui-action-button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full flex flex-col px-10 sm:px-14 md:px-24 pb-24 mx-auto overflow-hidden">
          {children}
        </main>
        {/* Footer */}
        <footer className="flex items-center justify-center mb-8">
            <geui-text-label>{footerContent}</geui-text-label>
        
          </footer>
      </div>
    </div>
  );
};
