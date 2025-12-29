
import React from 'react';
import { Activity, TrendingUp, Shield } from 'lucide-react';

const CEODashboard: React.FC = () => (
  <div className="p-10 space-y-10 animate-in fade-in duration-700">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">CEO_COMMAND</h1>
        <p className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.4em] mt-2">Institutional Sovereignty Matrix</p>
      </div>
      <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-emerald-400">Ledger: Stable</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Agency Health', val: '98.2%', icon: Activity, color: 'text-emerald-400' },
        { label: 'Fiscal Runway', val: '18 Mo', icon: TrendingUp, color: 'text-sky-400' },
        { label: 'Compliance', val: 'LOCKED', icon: Shield, color: 'text-indigo-400' },
      ].map((stat, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:border-sky-500/30 transition-all">
          <stat.icon className={`${stat.color} mb-6`} size={24} />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
          <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{stat.val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CEODashboard;
