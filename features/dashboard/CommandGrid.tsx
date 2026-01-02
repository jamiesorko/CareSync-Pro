
import React from 'react';
import { AppTab } from '../../types';
import { 
  Users, 
  WalletMinimal, 
  ShieldAlert, 
  UserRoundSearch, 
  CalendarDays,
  LayoutDashboard,
  Cpu
} from 'lucide-react';

interface Props {
  setActiveTab: (tab: AppTab) => void;
}

const CommandGrid: React.FC<Props> = ({ setActiveTab }) => {
  const nodes = [
    { id: AppTab.DASHBOARD, label: 'Ops Dashboard', sub: 'Global Telemetry', icon: LayoutDashboard, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { id: AppTab.SCHEDULE, label: 'Roster Deployment', sub: 'Fleet Logistics', icon: CalendarDays, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: AppTab.CLINICAL_COMMAND, label: 'Clinical Intel', sub: 'Director Oversight', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: AppTab.COORDINATION, label: 'Census Matrix', sub: 'Dispatcher Grid', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: AppTab.HR_HUB, label: 'Resource Core', sub: 'HR & Personnel', icon: UserRoundSearch, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: AppTab.FINANCE, label: 'Fiscal Ledger', sub: 'Accounting & Payroll', icon: WalletMinimal, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-4">
        <Cpu size={14} className="text-slate-500" />
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Sovereign_Command_Grid</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => setActiveTab(node.id)}
            className="glass-card p-8 rounded-[3rem] text-left group hover:border-white/20 transition-all relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity`}>
              <node.icon size={80} strokeWidth={1} />
            </div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${node.bg} flex items-center justify-center ${node.color} group-hover:scale-110 transition-transform`}>
                <node.icon size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-white italic uppercase tracking-tighter leading-none">{node.label}</h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">{node.sub}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Authorization: Locked</span>
              <span className="text-xs text-slate-600">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandGrid;
