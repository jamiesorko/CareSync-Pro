import React from 'react';
import { Client } from '../../types';
import { Translate } from '../../components/Translate';

interface Props {
  clients: Client[];
  language: string;
}

const RiskMatrix: React.FC<Props> = ({ clients, language }) => {
  const highRiskClients = clients.filter(c => c.risk?.level === 'HIGH' || c.risk?.level === 'CRITICAL' || !c.risk);

  return (
    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
      <div className="flex justify-between items-center mb-10 px-4">
        <div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
            <Translate target={language}>Risk_Velocity_Monitor</Translate>
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">
            <Translate target={language}>Neural Hospital Readmission Prediction</Translate>
          </p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"></div>
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">
                <Translate target={language}>Critical</Translate>
              </span>
           </div>
           <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                <Translate target={language}>Warning</Translate>
              </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {highRiskClients.map(client => (
          <div key={client.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:bg-white/10 transition-all relative overflow-hidden group">
            <p className="text-xl font-black text-white italic uppercase tracking-tighter">{client.name}</p>
            <p className="text-[9px] font-bold text-slate-600 uppercase mt-1">
              <Translate target={language}>{client.conditions[0]}</Translate>
            </p>
            
            <div className="mt-8 space-y-3">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <Translate target={language}>Readmission_Prob</Translate>.
                  </span>
                  <span className="text-[10px] font-black text-rose-500 italic">88%</span>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 w-[88%] shadow-[0_0_10px_rgba(225,29,72,0.5)]"></div>
               </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
               {client.risk ? client.risk.factors.map((f, i) => (
                 <p key={i} className="text-[10px] text-slate-400 italic">→ <Translate target={language}>{f}</Translate></p>
               )) : (
                 <p className="text-[10px] text-sky-400 animate-pulse font-bold">
                   <Translate target={language}>Running Neural Diagnostic</Translate>...
                 </p>
               )}
            </div>
            
            <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity">
               <Translate target={language}>Open_Clinical_Record</Translate>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskMatrix;