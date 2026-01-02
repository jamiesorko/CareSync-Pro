
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
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        staffName={staffName} 
        role={activeRole} 
        language={language}
      />
      
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header 
          activeTab={activeTab} 
          language={language} 
          onLanguageChange={onLanguageChange} 
          onLogout={onLogout} 
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
