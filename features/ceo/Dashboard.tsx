
import React from 'react';
import { Activity, TrendingUp, Shield, DollarSign } from 'lucide-react';

const CEODashboard: React.FC = () => (
  <div className="p-10 space-y-10 animate-in fade-in duration-700">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">CEO_COMMAND</h1>
        <p className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.4em] mt-2">Institutional Sovereignty Matrix</p>
      </div>
      <div className="flex gap-4">
        <div className="px-6 py-3 tactical-glass rounded-2xl text-[10px] font-black uppercase text-emerald-400">Ledger: Balanced</div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Agency Health', val: '98.2%', icon: Activity, color: 'text-emerald-400' },
        { label: 'Fiscal Runway', val: '18 Mo', icon: TrendingUp, color: 'text-sky-400' },
        { label: 'Compliance', val: 'LOCKED', icon: Shield, color: 'text-indigo-400' },
        { label: 'Revenue Delta', val: '+$14.2k', icon: DollarSign, color: 'text-white' },
      ].map((stat, i) => (
        <div key={i} className="tactical-glass p-8 rounded-[3rem] group hover:border-sky-500/30 transition-all neon-glow-blue">
          <stat.icon className={`${stat.color} mb-6`} size={24} />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
          <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{stat.val}</p>
        </div>
      ))}
    </div>

    <div className="tactical-glass rounded-[4rem] p-12 relative overflow-hidden">
      <h3 className="text-xl font-black uppercase italic tracking-tighter text-sky-400 mb-6">Strategic_Neural_Insight</h3>
      <p className="text-base text-slate-300 leading-relaxed font-medium italic max-w-2xl">
        "Market signals detect 12% growth in Sector 4 demand. Neural core recommends reallocating 2 field nodes from Downtown to optimize Q4 throughput."
      </p>
    </div>
  </div>
);

export default CEODashboard;
