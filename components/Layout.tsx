
import React from 'react';
import { AppTab, CareRole } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  activeRole: CareRole;
  staffName: string;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ activeTab, setActiveTab, activeRole, staffName, onLogout, children }) => {
  return (
    <div className="flex h-screen w-full bg-[#010411] text-slate-100 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        staffName={staffName} 
        role={activeRole} 
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header activeTab={activeTab} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
