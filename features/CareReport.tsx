
import React from 'react';
import { CareRole, Client } from '../types';

const CareReport: React.FC<{ role: CareRole; language: string; clients: Client[] }> = () => (
  <div className="alaya-card p-12">
    <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6">Incident reporting</h3>
    <div className="grid grid-cols-1 gap-6">
       <div className="p-8 bg-slate-50 border border-dashed border-slate-300 rounded text-center text-slate-400">
         Select patient dossier to initialize report vector.
       </div>
    </div>
  </div>
);

export default CareReport;
