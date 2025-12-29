
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
  user?: { name: string; role: CareRole };
  staffName?: string;
  role?: string;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, staffName, role }) => {
  const groups = [
    {
      label: 'Clinical Ops',
      items: [
        { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
        { id: AppTab.SCHEDULE, icon: Calendar, label: 'Scheduling' },
        { id: AppTab.CLINICAL_COMMAND, icon: Activity, label: 'Patient Charts' },
      ]
    },
    {
      label: 'Reporting',
      items: [
        { id: AppTab.INCIDENT_REPORTS, icon: ShieldAlert, label: 'Incidents' },
        { id: AppTab.MESSAGES, icon: MessageSquare, label: 'Communications' },
      ]
    },
    {
      label: 'Admin',
      items: [
        { id: AppTab.COORDINATION, icon: Users, label: 'Client Census' },
        { id: AppTab.ORG_COMMAND, icon: Briefcase, label: 'Agency Management' },
      ]
    }
  ];

  return (
    <aside className="w-60 bg-[#002d5b] flex flex-col h-full shrink-0 shadow-xl border-r border-slate-300">
      <div className="h-16 flex items-center px-6 bg-[#001f3f] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#005596] flex items-center justify-center font-black text-white text-xs">CS</div>
          <h1 className="text-sm font-extrabold text-white tracking-widest uppercase">CareSync</h1>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-8 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.label} className="px-3">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 ml-3">{group.label}</p>
            <div className="space-y-1">
              {group.items.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all ${
                    activeTab === id 
                      ? 'bg-[#005596] text-white shadow-lg' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  <span className="text-[13px] font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
            <UserCircle size={24} className="text-white/60" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-white truncate leading-none mb-1">{staffName}</p>
            <p className="text-[10px] text-white/40 uppercase font-black truncate">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
