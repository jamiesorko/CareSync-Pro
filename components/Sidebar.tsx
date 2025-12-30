
import React from 'react';
import { AppTab, CareRole, User } from '../types';
import { LayoutDashboard, ShieldAlert, Users, Briefcase } from 'lucide-react';

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
    { id: AppTab.ORG_COMMAND, icon: Briefcase, label: 'Admin' },
  ];

  return (
    <aside className="w-20 bg-black border-r border-white/5 flex flex-col items-center py-10 gap-8">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white">CP</div>
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-4 rounded-2xl transition-all ${
              activeTab === item.id ? 'bg-white text-black shadow-xl scale-110' : 'text-slate-500 hover:text-white'
            }`}
          >
            <item.icon size={20} strokeWidth={2.5} />
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
