
import React from 'react';
import { Client } from '../../types';
import { MoreHorizontal, ChevronRight, User, MapPin } from 'lucide-react';

interface Props {
  clients: Client[];
}

const SignalLog: React.FC<Props> = ({ clients }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Subject Dossier</th>
          <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Scheduled Window</th>
          <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Clinical Status</th>
          <th className="px-6 py-3 text-right text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Command</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {clients.map(client => (
          <tr key={client.id} className="hover:bg-slate-50 transition-colors group cursor-pointer bg-white">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900 leading-none mb-1 group-hover:text-[#005596] transition-colors">{client.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase">{client.anonymizedId}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[9px] text-slate-400 font-medium">{client.sector}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-slate-300" />
                <p className="text-[12px] font-bold text-slate-700">{client.time}</p>
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase ml-5 mt-1">Verified Node</p>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  client.currentVisitStatus === 'IN_PROGRESS' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-300'
                }`}></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  client.currentVisitStatus === 'IN_PROGRESS' ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  {client.currentVisitStatus?.replace('_', ' ') || 'IDLE'}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-all">
                  <button className="p-2 text-slate-400 hover:text-[#005596] hover:bg-[#005596]/10 rounded">
                    <MoreHorizontal size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-[#005596] hover:bg-[#005596]/10 rounded">
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
