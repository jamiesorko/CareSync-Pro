
import React from 'react';
import { CareRole, Client, StaffMember } from '../types';
import MetricNode from './dashboard/MetricNode';
import SignalLog from './dashboard/SignalLog';
import { 
  Users, 
  Activity, 
  AlertCircle, 
  Clock, 
  Zap,
  Plus,
  Binary,
  Target
} from 'lucide-react';

interface Props {
  staffName: string;
  role: CareRole;
  clients: Client[];
  staff: StaffMember[];
  language: string;
}

const Dashboard: React.FC<Props> = ({ staffName, clients, staff }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Panel */}
      <div className="glass-card p-10 rounded-[3.5rem] flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 scanner-line"></div>
        <div className="relative z-10 flex items-center gap-8">
          <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] border-4 border-white/10 group-hover:scale-105 transition-transform duration-500">
            <Binary size={40} className="text-white" />
          </div>
          <div>
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-2">
              Welcome, <span className="text-glow-indigo">{staffName.split(' ')[0]}</span>
            </h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Roster_Sync: 100%
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Node Capacity: 92% Utilization</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 relative z-10">
          <button className="btn-tech btn-secondary-tech flex items-center gap-3 py-4 px-8">
            <Clock size={16} /> Schedule_Vault
          </button>
          <button className="btn-tech btn-primary-tech flex items-center gap-3 py-4 px-8">
            <Plus size={16} /> New_Intake_Vector
          </button>
        </div>
      </div>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricNode label="Active Census" value={clients.length.toString()} icon={Users} trend="+2 Nodes" trendType="positive" />
        <MetricNode label="Operational Velocity" value="98.4" suffix="%" icon={Activity} trend="+0.2% Drift" trendType="positive" />
        <MetricNode label="Critical Gaps" value="04" icon={AlertCircle} trend="Requires Intercept" trendType="negative" />
        <MetricNode label="Strategic Alpha" value="14.2" suffix="k" icon={Target} trend="Optimized" trendType="positive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Execution Ledger */}
        <div className="lg:col-span-8">
           <div className="glass-card rounded-[3rem] overflow-hidden">
              <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                 <div className="flex items-center gap-3">
                   <Zap size={14} className="text-indigo-400" />
                   <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Execution_Ledger_Realtime</h4>
                 </div>
                 <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">Interrogate_Full_Logs</button>
              </div>
              <div className="p-2">
                <SignalLog clients={clients} />
              </div>
           </div>
        </div>
        
        {/* Intelligence Streams */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 rounded-[3rem] relative overflow-hidden">
             <div className="flex items-center gap-3 mb-8">
               <AlertCircle className="text-rose-500" size={18} />
               <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Acuity_Alert_Matrix</h4>
             </div>
             <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="p-5 bg-rose-600/5 border border-rose-500/10 rounded-2xl flex gap-5 group hover:bg-rose-600/10 transition-all cursor-pointer">
                    <div className="w-1.5 h-auto bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-tighter mb-1">Subject_Fall_Intercept</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Robert J. • Sector 4 Grid</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-white hover:bg-white/10 transition-all">Clear_Session_Alarms</button>
          </div>

          <div className="glass-card p-8 rounded-[3rem] bg-indigo-600 shadow-[0_0_40px_rgba(99,102,241,0.2)] text-white group cursor-pointer hover:scale-[1.02] transition-all">
             <div className="flex items-center gap-3 mb-6">
               <Binary size={18} className="opacity-60" />
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Neural_Market_Intel</h4>
             </div>
             <p className="text-base font-bold leading-relaxed italic mb-8 group-hover:text-glow-indigo">
               "Regional viral surge detected in Sector 1. Roster protocol auto-updated with mandatory PPE directives."
             </p>
             <div className="flex justify-between items-center pt-6 border-t border-white/20">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Confidence: 94%</span>
               <span className="text-xs">→</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
