
import React from 'react';
import { DollarSign, ShieldAlert, TrendingUp, Landmark } from 'lucide-react';
import CapitalGovernorHUD from './CapitalGovernorHUD';
import BoardDirectorTerminal from '../executive/BoardDirectorTerminal';

const CEODashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">CEO_COMMAND</h1>
          <p className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.4em] mt-2">Institutional Sovereignty Matrix</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Net Solvency', val: '$1.42M', icon: Landmark, color: 'text-emerald-400' },
          { label: 'Market Velocity', val: '+12.4%', icon: TrendingUp, color: 'text-sky-400' },
          { label: 'Liability Index', val: 'Low', icon: ShieldAlert, color: 'text-amber-400' },
          { label: 'Unbilled Delta', val: '$14k', icon: DollarSign, color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:border-amber-500/30 transition-all shadow-2xl">
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <CapitalGovernorHUD language="English" />
      <BoardDirectorTerminal language="English" />
    </div>
  );
};

export default CEODashboard;
