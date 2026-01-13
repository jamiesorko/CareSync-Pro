
import React from 'react';
import { AppTab, CareRole } from '../types/system';
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
  // Added: lang prop used by parent components
  lang?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, role, onLogout, lang }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, label: 'OPS_DASHBOARD', icon: LayoutDashboard },
    { id: AppTab.STRATEGY, label: 'STRATEGIC_TABLETOP', icon: Cpu },
    { id: AppTab.CLINICAL, label: 'CLINICAL_GOVERNANCE', icon: Shield },
    { id: AppTab.LOGISTICS, label: 'FLEET_COMMAND', icon: Zap },
    { id: AppTab.FISCAL, label: 'FISCAL_LEDGER', icon: Wallet },
    { id: AppTab.VAULT, label: 'NEURAL_VAULT', icon: Database },
    { id: AppTab.WELLNESS, label: 'PATIENT_WELLNESS', icon: Heart },
    { id: AppTab.RESOURCE, label: 'RESOURCE_CORE', icon: Briefcase },
    { id: AppTab.LIVE, label: 'DIRECT_LINK', icon: Radio },
  ];

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
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {/* Pass lang to Translate if available */}
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
