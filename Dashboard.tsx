
import React from 'react';
import { Translate } from './Translate';
import { Activity, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export const Dashboard = ({ lang }: { lang: string }) => {
  const stats = [
    { label: 'Agency Health', val: '98.4%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Fleet Velocity', val: '92.1%', icon: Zap, color: 'text-sky-400' },
    { label: 'Clinical Drift', val: '-2.4%', icon: Activity, color: 'text-rose-400' },
    { label: 'Fiscal Delta', val: '+$14k', icon: TrendingUp, color: 'text-white' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:border-indigo-500/30 transition-all">
            <s.icon className={`${s.color} mb-6`} size={24} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <Translate target={lang}>{s.label}</Translate>
            </p>
            <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-10">Global_Signal_Log</h3>
        <div className="space-y-4">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                <div>
                   <p className="text-sm font-black uppercase text-white tracking-tighter italic">Signal_Vector_0{i+1}</p>
                   <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">Sector 4 • Geofence Verified</p>
                </div>
                <button className="text-[9px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Dossier</button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
