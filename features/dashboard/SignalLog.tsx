
import React from 'react';
import { Client } from '../../types';
import Translate from '../../components/Translate';
import { Binary, Activity, Clock, ChevronRight } from 'lucide-react';

interface Props {
  clients: Client[];
  language: string;
}

const SignalLog: React.FC<Props> = ({ clients, language }) => (
  <div className="overflow-x-auto scrollbar-hide">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-white/5">
          <th className="px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            <Translate targetLanguage={language}>Target_Dossier</Translate>
          </th>
          <th className="px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            <Translate targetLanguage={language}>Temporal_Window</Translate>
          </th>
          <th className="px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            <Translate targetLanguage={language}>Acuity_State</Translate>
          </th>
          <th className="px-8 py-4 text-right text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            <Translate targetLanguage={language}>Action</Translate>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {clients.map(client => (
          <tr key={client.id} className="hover:bg-white/[0.03] transition-all group cursor-pointer">
            <td className="px-8 py-5">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all">
                  <Binary size={18} />
                </div>
                <div>
                  <p className="text-[14px] font-black text-white tracking-tight leading-none mb-1.5 uppercase italic group-hover:text-glow-indigo transition-all">{client.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-600 uppercase tech-mono tracking-widest">{client.anonymizedId}</span>
                    <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <Translate targetLanguage={language}>{client.sector}</Translate>
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-8 py-5">
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-indigo-500/40" />
                <p className="text-[13px] font-black text-slate-300 tech-mono">{client.time}</p>
              </div>
              <div className="flex items-center gap-2 mt-1.5 ml-6">
                <div className="w-1.5 h-1.5 rounded-sm bg-emerald-500/20 border border-emerald-500/30"></div>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                  <Translate targetLanguage={language}>Verified_Sync</Translate>
                </p>
              </div>
            </td>
            <td className="px-8 py-5">
              <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full relative ${
                  client.currentVisitStatus === 'COMPLETED' ? 'bg-indigo-500' :
                  client.currentVisitStatus === 'IN_PROGRESS' 
                    ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' 
                    : 'bg-slate-700'
                }`}>
                  {client.currentVisitStatus === 'IN_PROGRESS' && (
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-40"></div>
                  )}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${
                  client.currentVisitStatus === 'IN_PROGRESS' ? 'text-emerald-400 italic' : 'text-slate-600'
                }`}>
                  <Translate targetLanguage={language}>
                    {client.currentVisitStatus?.replace('_', ' ') || 'STANDBY'}
                  </Translate>
                </span>
              </div>
            </td>
            <td className="px-8 py-5 text-right">
              <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <button className="p-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all">
                    <Activity size={18} />
                  </button>
                  <button className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all">
                    <ChevronRight size={18} />
                  </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SignalLog;
