
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AppTab, CareRole, User } from '../types';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  user: User;
  onLogout: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  children: React.ReactNode;
}

const AppShell: React.FC<Props> = ({ activeTab, setActiveTab, user, onLogout, language, onLanguageChange, children }) => {
  return (
    <div className="flex h-screen w-full bg-[#f1f5f9] overflow-hidden text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        staffName={user.name}
        role={user.role} 
        language={language}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <Header 
          activeTab={activeTab} 
          onLogout={onLogout} 
          language={language}
          onLanguageChange={onLanguageChange}
        />
        
        <main className="flex-1 overflow-y-auto app-scroll relative p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
