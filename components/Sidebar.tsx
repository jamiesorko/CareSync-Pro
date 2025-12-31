
import React from 'react';
import { AppTab, CareRole, User } from '../types';
import { LayoutDashboard, ShieldAlert, Users, Briefcase, UserRoundSearch, WalletMinimal, LogOut } from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  staffName?: string;
  role?: CareRole;
  user?: User;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const menu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Ops' },
    { id: AppTab.CLINICAL_COMMAND, icon: ShieldAlert, label: 'Clinical' },
    { id: AppTab.COORDINATION, icon: Users, label: 'Census' },
    { id: AppTab.HR_HUB, icon: UserRoundSearch, label: 'HR' },
    { id: AppTab.FINANCE, icon: WalletMinimal, label: 'Fiscal' },
    { id: AppTab.ORG_COMMAND, icon: Briefcase, label: 'Admin' },
  ];

  return (
    <aside className="w-20 bg-black border-r border-white/5 flex flex-col items-center py-10 gap-8 h-full shrink-0">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg mb-4">CP</div>
      <nav className="flex flex-col gap-4 flex-1">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            className={`p-4 rounded-2xl transition-all relative group ${
              activeTab === item.id ? 'bg-white text-black shadow-xl scale-110' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} strokeWidth={2.5} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
