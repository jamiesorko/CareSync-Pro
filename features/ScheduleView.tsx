
import React from 'react';
import { CareRole, Client } from '../types';

const ScheduleView: React.FC<{ role: CareRole; clients: Client[]; language: string }> = ({ clients }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Global Roster deployment</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clients.map(c => (
        <div key={c.id} className="alaya-card p-6 flex justify-between items-center bg-white">
          <div>
            <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{c.name}</p>
            <p className="text-xs text-slate-500 mt-1">{c.time} • {c.sector}</p>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded shadow">Initialize</button>
        </div>
      ))}
    </div>
  </div>
);

export default ScheduleView;
