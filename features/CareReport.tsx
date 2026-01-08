
import React from 'react';
import { CareRole, Client } from '../types';
/* Changed default import to named import for Translate */
import { Translate } from '../components/Translate';

const CareReport: React.FC<{ role: CareRole; language: string; clients: Client[] }> = ({ language }) => (
  <div className="glass-card p-12 rounded-[3rem]">
    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6">
      <Translate target={language}>Incident reporting</Translate>
    </h3>
    <div className="grid grid-cols-1 gap-6">
       <div className="p-12 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem] text-center text-slate-500 italic">
         <Translate target={language}>Select patient dossier to initialize report vector.</Translate>
       </div>
    </div>
  </div>
);

export default CareReport;
