
import React from 'react';
import { AppTab, CareRole } from '../types';
import Translate from './Translate';
import { 
  LayoutDashboard, ShieldAlert, Users, Briefcase, 
  Wallet, Database, Radio, Power, Heart, Target, Calendar,
  Cpu, Truck
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  role: CareRole;
  onLogout: () => void;
  language: string;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, role, onLogout, language }) => {
  const isProfessional = [CareRole.RN, CareRole.RPN, CareRole.PSW, CareRole.HSS].includes(role);
  
  const menu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Ops_Dashboard' },
    { id: AppTab.STRATEGY, icon: Cpu, label: 'Strategic_Tabletop' },
    { 
      id: AppTab.SCHEDULE, 
      icon: Calendar, 
      label: role === CareRole.RPN ? 'Clinical_Roster' : 
             role === CareRole.HSS ? 'Social_Dispatch' : 'Roster_Grid' 
    },
    { id: AppTab.CLINICAL_COMMAND, icon: ShieldAlert, label: 'Clinical_Core' },
    { id: AppTab.COORDINATION, icon: Users, label: 'Census_Matrix' },
    { id: AppTab.FLEET_COMMAND, icon: Truck, label: 'IoT_Command' },
    { id: AppTab.RESOURCE, icon: Briefcase, label: 'Resource_Core' },
    { id: AppTab.FINANCE, icon: Wallet, label: 'Fiscal_Ledger' },
    { id: AppTab.VAULT, icon: Database, label: 'Neural_Vault' },
    { id: AppTab.WELLNESS, icon: Heart, label: 'Patient_Zen' },
    { id: AppTab.LIVE, icon: Radio, label: 'Direct_Link' },
  ];

  // Restrict tabs based on professional vs executive context if needed
  // For now, keeping them all visible for the "easy to repair" enterprise feel, but restricted ORG_COMMAND.
  if (![CareRole.CEO, CareRole.COO, CareRole.DOC].includes(role)) {
    // Keep only essentials for PSW/HSS/RPN if preferred, but user said portals were "gone", 
    // implying they want them accessible or visible.
  }

  // Add Executive Command node for CEO/COO/DOC
  if ([CareRole.CEO, CareRole.COO, CareRole.DOC].includes(role)) {
    menu.splice(1, 0, { id: AppTab.ORG_COMMAND, icon: Target, label: 'Strategic_Moat' });
  }

  return (
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col h-full backdrop-blur-xl shrink-0">
      <div className="h-24 flex items-center px-10 border-b border-white/5">
        <span className="text-xl font-black text-white italic tracking-tighter uppercase">
          CareSync<span className="text-indigo-500">Pro</span>
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-widest text-left leading-none">
              <Translate targetLanguage={language}>{item.label}</Translate>
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all"
        >
          <Power size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            <Translate targetLanguage={language}>Terminate_Session</Translate>
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
