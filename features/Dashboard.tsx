
import React from 'react';
import { Translate } from '../components/Translate';
import { ShieldCheck, Zap, Activity, TrendingUp } from 'lucide-react';

export const Dashboard = ({ lang }: { lang: string }) => {
  const stats = [
    { label: 'Agency_Health', val: '98.4%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Fleet_Velocity', val: '92.1%', icon: Zap, color: 'text-sky-400' },
    { label: 'Clinical_Drift', val: '-2.4%', icon: Activity, color: 'text-rose-400' },
    { label: 'Fiscal_Delta', val: '+$14k', icon: TrendingUp, color: 'text-white' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:border-indigo-500/30 transition-all shadow-xl">
            <s.icon className={`${s.color} mb-6`} size={24} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <Translate target={lang}>{s.label}</Translate>
            </p>
            <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden shadow-2xl">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-10">
          <Translate target={lang}>Active_Census_Monitoring</Translate>
        </h3>
        <div className="space-y-4">
           {[1, 2, 3].map((n) => (
             <div key={n} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/5 transition-all">
                <div>
                   <p className="text-lg font-black uppercase text-white tracking-tighter italic">Patient_Node_0{n}</p>
                   <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">
                     <Translate target={lang}>Sector_4</Translate> • <Translate target={lang}>Stable</Translate>
                   </p>
                </div>
                <button className="px-6 py-2 bg-indigo-600/10 border border-indigo-500/30 text-[9px] font-black text-indigo-400 uppercase rounded-xl tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  <Translate target={lang}>View_Dossier</Translate>
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
