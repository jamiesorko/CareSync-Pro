
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
  lang: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, role, lang, onLogout }) => {
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
  ].filter(item => {
    if (item.id === AppTab.FISCAL && role === CareRole.DOC) return false;
    return true;
  });

  if ([CareRole.CEO, CareRole.COO, CareRole.DOC].includes(role)) {
    menuItems.splice(1, 0, { id: AppTab.ORG_COMMAND, label: 'Strategic_Moat', icon: Target });
  }

  return (
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col backdrop-blur-xl shrink-0 h-full">
      <div className="p-8 border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter text-white">
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
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              <Translate target={lang}>{item.label}</Translate>
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
          <Translate target={lang}>SIGN_OUT</Translate>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
