
import React from 'react';
import { Translate } from '../components/Translate';
import { Activity, Zap, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import { Client } from '../types';

interface Props {
  lang: string;
  staffName?: string;
  clients?: Client[];
}

export const Dashboard: React.FC<Props> = ({ lang, staffName, clients }) => {
  const stats = [
    { label: 'Agency_Health', val: '98.4%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Fleet_Velocity', val: '92.1%', icon: Zap, color: 'text-sky-400' },
    { label: 'Clinical_Drift', val: '-2.4%', icon: Activity, color: 'text-rose-400' },
    { label: 'Fiscal_Delta', val: '+$14k', icon: TrendingUp, color: 'text-white' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide pb-20">
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[3.5rem] p-12 relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2">
            <Translate target={lang}>AUTHENTICATED_NODE_HANDSHAKE</Translate>
          </p>
          <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
             <Translate target={lang}>WELCOME_BACK</Translate>,<br/>
             <span className="text-indigo-400 not-italic font-black text-5xl">{staffName}</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium italic border-l-2 border-white/10 pl-6 max-w-lg leading-relaxed">
            <Translate target={lang}>Operational_matrix_is_currently_synchronized_Sector_4_deployment_has_reached_its_24_hour_efficiency_peak</Translate>
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none rotate-12 group-hover:rotate-6 transition-transform duration-1000">
           <Activity size={400} strokeWidth={1} />
        </div>
      </div>

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

      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-10">
          <Translate target={lang}>GLOBAL_SIGNAL_LOG</Translate>
        </h3>
        <div className="space-y-4">
           {(clients || []).slice(0, 5).map((c, i) => (
             <div key={c.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                <div className="flex items-center gap-6">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500">
                      <Translate target={lang}>SIGNAL</Translate>
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase text-white tracking-tighter italic">{c.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                         <span className="text-[9px] text-slate-500 uppercase font-bold">
                            <Translate target={lang}>{c.sector}</Translate>
                         </span>
                         <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                         <div className="flex items-center gap-1.5">
                            <MapPin size={10} className="text-emerald-500" />
                            <span className="text-[9px] text-slate-500 uppercase font-bold">
                               <Translate target={lang}>GEOFENCE_VERIFIED</Translate>
                            </span>
                         </div>
                      </div>
                   </div>
                </div>
                <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  <Translate target={lang}>DOSSIER</Translate>
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
