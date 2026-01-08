
import React from 'react';
import { CareRole, Client } from '../types';
/* Changed default import to named import for Translate */
import { Translate } from '../components/Translate';

const ScheduleView: React.FC<{ role: CareRole; clients: Client[]; language: string }> = ({ clients, language }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-black text-white uppercase tracking-widest">
      {/* Updated prop to target and usage consistent with Translate.tsx */}
      <Translate target={language}>Global Roster deployment</Translate>
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clients.map(c => (
        <div key={c.id} className="glass-card p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-tight">{c.name}</p>
            <p className="text-xs text-slate-500 mt-1">{c.time} • {c.sector}</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-indigo-500/20">
            <Translate target={language}>Initialize</Translate>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ScheduleView;
