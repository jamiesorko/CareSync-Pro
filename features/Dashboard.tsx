
import React from 'react';
/* Root Translate.tsx uses named export */
import { Translate } from '../Translate';
import { Activity, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Client } from '../types';

interface Props {
  /* Changed from lang to language to match app usage */
  language: string;
  staffName: string;
  clients: Client[];
}

export const Dashboard = ({ language, staffName, clients }: Props) => {
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
              <Translate target={language}>{s.label}</Translate>
            </p>
            <p className="text-4xl font-black text-white italic tracking-tighter mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-10">
          <Translate target={language}>Active Census Monitoring</Translate>
        </h3>
        <div className="space-y-4">
           {clients.slice(0, 5).map((c, i) => (
             <div key={c.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                <div>
                   <p className="text-sm font-black uppercase text-white tracking-tighter italic">{c.name}</p>
                   <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">
                     {/* Fix: riskLevel does not exist on Client. Using c.risk?.level instead. */}
                     <Translate target={language}>{c.sector}</Translate> • <Translate target={language}>{c.risk?.level || 'Stable'}</Translate>
                   </p>
                </div>
                <button className="text-[9px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  <Translate target={language}>View Dossier</Translate>
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
