
import React, { useState } from 'react';
import { AppTab, CareRole } from '../types';
import Translate from './Translate';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  Briefcase, 
  UserRoundSearch, 
  WalletMinimal, 
  ChevronLeft, 
  Menu,
  CalendarDays,
  Power
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  staffName?: string;
  role: CareRole;
  language: string;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, role, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullMenu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Ops_Dashboard' },
    { id: AppTab.SCHEDULE, icon: CalendarDays, label: 'Roster_Deployment' },
    { id: AppTab.CLINICAL_COMMAND, icon: ShieldAlert, label: 'Clinical_Intel' },
    { id: AppTab.COORDINATION, icon: Users, label: 'Dispatch_Grid' },
    { id: AppTab.HR_HUB, icon: UserRoundSearch, label: 'Resource_Core' },
    { id: AppTab.FINANCE, icon: WalletMinimal, label: 'Fiscal_Ledger' },
    { id: AppTab.ORG_COMMAND, icon: Briefcase, label: 'Node_Control' },
  ];

  const filteredMenu = fullMenu.filter(item => {
    switch (role) {
      case CareRole.PSW:
      case CareRole.RN:
      case CareRole.RPN:
      case CareRole.HSS:
        return item.id === AppTab.DASHBOARD || item.id === AppTab.SCHEDULE;
      case CareRole.ACCOUNTANT:
        return [AppTab.DASHBOARD, AppTab.FINANCE].includes(item.id);
      case CareRole.HR_SPECIALIST:
        return [AppTab.DASHBOARD, AppTab.HR_HUB].includes(item.id);
      case CareRole.CEO:
      case CareRole.COO:
      case CareRole.DOC:
      case CareRole.COORDINATOR:
        return true;
      default:
        return true;
    }
  });

  return (
    <aside 
      className={`bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-500 ease-in-out z-50 h-screen shrink-0 ${
        isExpanded ? 'w-72' : 'w-20'
      }`}
    >
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        <div className={`flex items-center gap-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">CP</div>
          <span className="font-black tracking-tighter text-lg uppercase italic">CareSync</span>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 hover:bg-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto scrollbar-hide">
        {filteredMenu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 p-3.5 rounded-xl transition-all group relative ${
              activeTab === item.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className={`shrink-0 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : ''}`}>
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className={`font-bold text-[11px] uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-300 ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'
            }`}>
              <Translate targetLanguage={language}>{item.label}</Translate>
            </span>
            {activeTab === item.id && (
              <div className="absolute right-2 w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className={`flex items-center gap-3 transition-all ${isExpanded ? 'px-2' : 'justify-center'}`}>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <p className={`text-[9px] font-black text-slate-600 uppercase tracking-widest ${isExpanded ? 'block' : 'hidden'}`}>
            <Translate targetLanguage={language}>System_Online</Translate>
          </p>
        </div>
        <button className="w-full flex items-center gap-4 p-3.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all group">
          <Power size={20} />
          <span className={`font-bold text-[11px] uppercase tracking-widest ${isExpanded ? 'block' : 'hidden'}`}>
            <Translate targetLanguage={language}>Terminate_Session</Translate>
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
