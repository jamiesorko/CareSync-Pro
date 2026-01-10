import React from 'react';
import { AppTab } from '../../types';
import { Translate } from '../../components/Translate';
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
  language: string;
}

const CommandGrid: React.FC<Props> = ({ setActiveTab, language }) => {
  const nodes = [
    { id: AppTab.DASHBOARD, label: 'Ops_Dashboard', sub: 'Global_Telemetry', icon: LayoutDashboard, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { id: AppTab.LOGISTICS, label: 'Roster_Deployment', sub: 'Fleet_Logistics', icon: CalendarDays, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: AppTab.CLINICAL, label: 'Clinical_Intel', sub: 'Director_Oversight', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: AppTab.COORDINATION, label: 'Census_Matrix', sub: 'Dispatcher_Grid', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: AppTab.RESOURCE, label: 'Resource_Core', sub: 'HR_&_Personnel', icon: UserRoundSearch, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: AppTab.FISCAL, label: 'Fiscal_Ledger', sub: 'Accounting_&_Payroll', icon: WalletMinimal, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-4">
        <Cpu size={14} className="text-slate-500" />
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">
          <Translate target={language}>Sovereign_Command_Grid</Translate>
        </h3>
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
                <h4 className="text-lg font-black text-white italic uppercase tracking-tighter leading-none">
                  <Translate target={language}>{node.label}</Translate>
                </h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                  <Translate target={language}>{node.sub}</Translate>
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">
                <Translate target={language}>Authorization_Locked</Translate>
              </span>
              <span className="text-xs text-slate-600">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandGrid;