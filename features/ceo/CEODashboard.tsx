
import React from 'react';
import { DollarSign, ShieldAlert, TrendingUp, Landmark } from 'lucide-react';
import CapitalGovernorHUD from './CapitalGovernorHUD';
import BoardDirectorTerminal from '../executive/BoardDirectorTerminal';

const CEODashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10">
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white leading-none">CEO_COMMAND</h1>
          <p className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.4em] mt-1">Institutional Sovereignty Matrix</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Net Solvency', val: '$1.42M', icon: Landmark, color: 'text-emerald-400' },
          { label: 'Market Velocity', val: '+12.4%', icon: TrendingUp, color: 'text-sky-400' },
          { label: 'Liability Index', val: 'Low', icon: ShieldAlert, color: 'text-amber-400' },
          { label: 'Unbilled Delta', val: '$14k', icon: DollarSign, color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl group hover:border-amber-500/30 transition-all shadow-xl">
            <stat.icon className={`${stat.color} mb-4`} size={20} />
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-white italic tracking-tighter mt-0.5">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <CapitalGovernorHUD language="English" />
        <BoardDirectorTerminal language="English" />
      </div>
    </div>
  );
};

export default CEODashboard;
