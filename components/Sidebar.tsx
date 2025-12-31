
import React, { useState } from 'react';
import { AppTab, CareRole, User } from '../types';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  Briefcase, 
  UserRoundSearch, 
  WalletMinimal, 
  ChevronLeft, 
  Menu
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  staffName?: string;
  role?: CareRole;
  user?: User;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Ops Dashboard' },
    { id: AppTab.CLINICAL_COMMAND, icon: ShieldAlert, label: 'Clinical Core' },
    { id: AppTab.COORDINATION, icon: Users, label: 'Logistics' },
    { id: AppTab.HR_HUB, icon: UserRoundSearch, label: 'Resource Core' },
    { id: AppTab.FINANCE, icon: WalletMinimal, label: 'Fiscal Ledger' },
    { id: AppTab.ORG_COMMAND, icon: Briefcase, label: 'Admin Hub' },
  ];

  return (
    <aside 
      className={`bg-black border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out z-50 h-screen shrink-0 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-20 flex items-center justify-center border-b border-white/5">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg hover:scale-110 transition-all"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto scrollbar-hide">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${
              activeTab === item.id 
                ? 'bg-white text-black shadow-2xl' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="shrink-0">
              <item.icon size={18} strokeWidth={2.5} />
            </div>
            <span className={`font-bold text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-opacity duration-200 ${
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none absolute left-20'
            }`}>
              {item.label}
            </span>
            
            {!isExpanded && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[9px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className={`p-6 border-t border-white/5 transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-[7px] font-black text-slate-700 uppercase tracking-[0.5em]">CP_v4_Sovereign</p>
      </div>
    </aside>
  );
};

export default Sidebar;
