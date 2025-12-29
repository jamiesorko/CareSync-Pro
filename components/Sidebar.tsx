
import React from 'react';
import { AppTab, CareRole } from '../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Activity, 
  ShieldAlert, 
  MessageSquare, 
  Users,
  Briefcase,
  UserCircle
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  staffName: string;
  role: string;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, staffName, role }) => {
  const groups = [
    {
      label: 'Clinical Ops',
      items: [
        { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
        { id: AppTab.SCHEDULE, icon: Calendar, label: 'Scheduling' },
        { id: AppTab.CLINICAL_COMMAND, icon: Activity, label: 'Clinical Center' },
      ]
    },
    {
      label: 'Back Office',
      items: [
        { id: AppTab.INCIDENT_REPORTS, icon: ShieldAlert, label: 'Incidents' },
        { id: AppTab.MESSAGES, icon: MessageSquare, label: 'Messaging' },
        { id: AppTab.COORDINATION, icon: Users, label: 'Census' },
        { id: AppTab.ORG_COMMAND, icon: Briefcase, label: 'Agency Mgmt' },
      ]
    }
  ];

  return (
    <aside className="w-60 bg-[#002d5b] flex flex-col h-full shrink-0 shadow-2xl border-r border-slate-300">
      <div className="h-16 flex items-center px-6 bg-[#001f3f] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#005596] flex items-center justify-center font-black text-white text-[10px]">CS</div>
          <h1 className="text-sm font-extrabold text-white tracking-widest uppercase">CareSync</h1>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-8 overflow-y-auto app-scroll">
        {groups.map((group) => (
          <div key={group.label} className="px-3">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em] mb-4 ml-3">{group.label}</p>
            <div className="space-y-1">
              {group.items.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all ${
                    activeTab === id 
                      ? 'bg-[#005596] text-white shadow-lg shadow-black/20' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} strokeWidth={2.5} />
                  <span className="text-[13px] font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex items-center gap-3 p-1">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 shrink-0">
            <UserCircle size={20} className="text-white/60" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-white truncate leading-none mb-1">{staffName}</p>
            <p className="text-[9px] text-white/40 uppercase font-black truncate">{role.split(' ')[0]}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
