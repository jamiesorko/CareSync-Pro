
import React from 'react';
import { AppTab, CareRole } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import { ChevronRight } from 'lucide-react';

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
    <div className="flex h-screen w-full bg-[#f4f7fa]">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        staffName={staffName} 
        role={activeRole} 
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header 
          activeTab={activeTab} 
          onLogout={onLogout} 
        />

        <div className="flex-1 overflow-y-auto app-scroll p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto space-y-4">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              <span>Main Menu</span>
              <ChevronRight size={10} />
              <span className="text-[#005596]">{activeTab}</span>
            </nav>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
