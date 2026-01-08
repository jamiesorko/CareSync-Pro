
import React from 'react';
import { AppTab, CareRole } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  activeRole: CareRole;
  staffName: string;
  language: string;
  onLanguageChange: (lang: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ 
  activeTab, 
  setActiveTab, 
  activeRole, 
  staffName, 
  language, 
  onLanguageChange, 
  onLogout, 
  children 
}) => {
  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden select-none">
      {/* Fixed: Synced Sidebar props: changed activeTab to active and language to lang */}
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={activeRole} 
        onLogout={onLogout}
        lang={language}
      />
      
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Fixed: Synced Header props: changed onLanguageChange to setLang and user structure */}
        <Header 
          active={activeTab} 
          lang={language} 
          setLang={onLanguageChange} 
          user={{ name: staffName, role: activeRole }} 
        />
        
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="w-full h-full p-4 lg:p-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
