
import React from 'react';
import { AppTab, CareRole } from '../types';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  Briefcase, 
  Wallet, 
  Database, 
  Radio,
  Power
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  role: CareRole;
  onLogout: () => void;
  language?: string;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, role, onLogout, language }) => {
  const menu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Ops Dashboard' },
    { id: AppTab.CLINICAL, icon: ShieldAlert, label: 'Clinical Core' },
    { id: AppTab.LOGISTICS, icon: Users, label: 'Dispatch Grid' },
    { id: AppTab.RESOURCE, icon: Briefcase, label: 'Resource Core' },
    { id: AppTab.FISCAL, icon: Wallet, label: 'Fiscal Ledger' },
    { id: AppTab.VAULT, icon: Database, label: 'Neural Vault' },
    { id: AppTab.LIVE, icon: Radio, label: 'Direct Link' },
  ];

  return (
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col h-full backdrop-blur-xl">
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <span className="text-xl font-black text-white italic tracking-tighter">CARESYNC<span className="text-indigo-500">PRO</span></span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all"
        >
          <Power size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
