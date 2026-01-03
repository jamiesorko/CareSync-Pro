
import React, { useState } from 'react';
import { AppTab, CareRole } from '../types';
import Translate from './Translate';
import { 
  LayoutDashboard, ShieldAlert, Users, Briefcase, 
  UserRoundSearch, WalletMinimal, ChevronLeft, Menu, 
  CalendarDays, Power 
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  role: CareRole;
  language: string;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, role, language }) => {
  const [expanded, setExpanded] = useState(false);

  const menu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Ops_Dashboard' },
    { id: AppTab.SCHEDULE, icon: CalendarDays, label: 'Roster_Deployment' },
    { id: AppTab.CLINICAL_COMMAND, icon: ShieldAlert, label: 'Clinical_Intel' },
    { id: AppTab.COORDINATION, icon: Users, label: 'Dispatch_Grid' },
    { id: AppTab.HR_HUB, icon: UserRoundSearch, label: 'Resource_Core' },
    { id: AppTab.FINANCE, icon: WalletMinimal, label: 'Fiscal_Ledger' },
  ];

  return (
    <aside className={`bg-black/40 backdrop-blur-xl border-r border-white/5 h-screen transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        {expanded && <span className="font-black text-white italic tracking-tighter">CARESYNC</span>}
        <button onClick={() => setExpanded(!expanded)} className="p-2 text-slate-500 hover:text-white">
          {expanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeTab === item.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'text-slate-500 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {expanded && <Translate targetLanguage={language} className="text-[10px] font-black uppercase tracking-widest">{item.label}</Translate>}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-0 w-full px-4">
        <button className="w-full flex items-center gap-4 p-3 rounded-xl text-rose-500 hover:bg-rose-500/10">
          <Power size={20} />
          {expanded && <Translate targetLanguage={language} className="text-[10px] font-black uppercase">Terminate_Session</Translate>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
