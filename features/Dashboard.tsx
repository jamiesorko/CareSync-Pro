
import React from 'react';
import { Metric, Client } from '../types';
import { Activity, Users, AlertCircle, Target } from 'lucide-react';
import Translate from '../components/Translate';

interface Props {
  staffName: string;
  clients: Client[];
  language: string;
}

const Dashboard: React.FC<Props> = ({ staffName, clients, language }) => {
  const metrics: Metric[] = [
    { label: 'Active Census', value: String(clients.length), trend: '+4', type: 'positive' },
    { label: 'Ops Velocity', value: '98.4%', trend: 'Nominal', type: 'neutral' },
    { label: 'Critical Gaps', value: '02', trend: 'Action', type: 'negative' },
    { label: 'Fiscal Delta', value: '+$14k', trend: '+2.1%', type: 'positive' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:border-indigo-500/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Translate targetLanguage={language}>{m.label}</Translate>
              </p>
              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                m.type === 'positive' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 
                m.type === 'negative' ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' : 
                'text-slate-400 border-white/10 bg-white/5'
              }`}>{m.trend}</span>
            </div>
            <p className="text-4xl font-black text-white italic tracking-tighter">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
        <div className="px-10 py-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">
            <Translate targetLanguage={language}>Global_Signal_Log</Translate>
          </h3>
          <button className="text-[8px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">
            <Translate targetLanguage={language}>View_All_Signals</Translate>
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] border-b border-white/5">
                <th className="px-10 py-4">Subject</th>
                <th className="px-10 py-4">Acuity</th>
                <th className="px-10 py-4">Status</th>
                <th className="px-10 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map(c => (
                <tr key={c.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="px-10 py-6">
                    <p className="text-sm font-black text-white uppercase italic">{c.name}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">{c.conditions.join(', ')}</p>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                      c.risk?.level === 'CRITICAL' ? 'bg-rose-500' : 
                      c.risk?.level === 'HIGH' ? 'text-rose-400 border border-rose-500/20' : 
                      'text-emerald-400 border border-emerald-500/20'
                    } text-white`}>{c.risk?.level || 'LOW'}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${c.currentVisitStatus === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
                      <span className="text-[10px] font-black text-slate-300 uppercase">{c.currentVisitStatus}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="opacity-0 group-hover:opacity-100 px-6 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase transition-all shadow-xl">Dossier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
