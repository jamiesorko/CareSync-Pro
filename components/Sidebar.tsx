
import React from 'react';
import { AppTab, CareRole } from '../types';
import Translate from './Translate';
import { 
  LayoutDashboard, Shield, Zap, Wallet, Database, 
  Heart, Cpu, Radio, Power, Briefcase, Target 
} from 'lucide-react';

interface SidebarProps {
  active: AppTab;
  setActive: (tab: AppTab) => void;
  role: CareRole;
  onLogout: () => void;
  lang?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, role, onLogout, lang }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, label: 'Ops_Dashboard', icon: LayoutDashboard },
    { id: AppTab.STRATEGY, label: 'Strategic_Tabletop', icon: Cpu },
    { id: AppTab.CLINICAL, label: 'Clinical_Governance', icon: Shield },
    { id: AppTab.LOGISTICS, label: 'Fleet_Command', icon: Zap },
    { id: AppTab.FISCAL, label: 'Fiscal_Ledger', icon: Wallet },
    { id: AppTab.VAULT, label: 'Neural_Vault', icon: Database },
    { id: AppTab.WELLNESS, label: 'Patient_Wellness', icon: Heart },
    { id: AppTab.RESOURCE, label: 'Resource_Core', icon: Briefcase },
    { id: AppTab.LIVE, label: 'Direct_Link', icon: Radio },
  ];

  return (
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col backdrop-blur-xl shrink-0 h-full">
      <div className="p-8 border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter text-white uppercase">
          CARESYNC<span className="text-indigo-500">PRO</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
              active === item.id 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              <Translate>{item.label}</Translate>
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
        >
          <Power size={18} />
          <Translate>Sign_Out</Translate>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
