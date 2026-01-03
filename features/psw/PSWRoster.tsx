
import React from 'react';
import { Client } from '../../types';
import Translate from '../../components/Translate';
import { MapPin, Phone, Info, Accessibility, Brain, UserCheck, Wind } from 'lucide-react';

interface Props {
  clients: Client[];
  onStartVisit: (client: Client) => void;
  language: string;
}

const PSWRoster: React.FC<Props & { language: string }> = ({ clients, onStartVisit, language }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      {clients.map((client) => (
        <div key={client.id} className="glass-card p-10 rounded-[3.5rem] shadow-2xl group border-orange-500/10 hover:border-orange-500/40 transition-all flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 text-[10px] font-black uppercase rounded-lg tracking-widest">{client.time}</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{client.sector}</span>
              </div>
              <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h3>
              <div className="flex flex-col gap-2 text-slate-400">
                 <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange-500" />
                    <p className="text-[11px] font-bold uppercase">{client.address}</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <Phone size={14} className="text-orange-500" />
                    <p className="text-[11px] font-bold uppercase">{client.phone}</p>
                 </div>
              </div>
            </div>
            <button 
              onClick={() => onStartVisit(client)}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Translate targetLanguage={language}>INITIALIZE_VISIT</Translate>
            </button>
          </div>

          <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] mb-8 flex-1">
             <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-4">
               <Translate targetLanguage={language}>Patient_Mobility_Vector</Translate>
             </p>
             
             <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${client.mobilityStatus.dementia ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                   <Brain size={18} />
                   <span className="text-[10px] font-black uppercase tracking-tighter">
                     <Translate targetLanguage={language}>Dementia</Translate>: {client.mobilityStatus.dementia ? <Translate targetLanguage={language}>YES</Translate> : <Translate targetLanguage={language}>NO</Translate>}
                   </span>
                </div>
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${client.mobilityStatus.isBedridden ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                   <Accessibility size={18} />
                   <span className="text-[10px] font-black uppercase tracking-tighter">
                     <Translate targetLanguage={language}>Bedridden</Translate>: {client.mobilityStatus.isBedridden ? <Translate targetLanguage={language}>YES</Translate> : <Translate targetLanguage={language}>NO</Translate>}
                   </span>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 text-slate-300">
                   <Wind size={18} className="text-sky-400" />
                   <span className="text-[10px] font-black uppercase tracking-tighter">
                     <Translate targetLanguage={language}>Lift</Translate>: <Translate targetLanguage={language}>{client.mobilityStatus.liftType}</Translate>
                   </span>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 text-slate-300">
                   <UserCheck size={18} className="text-emerald-400" />
                   <span className="text-[10px] font-black uppercase tracking-tighter">
                     <Translate targetLanguage={language}>Method</Translate>: <Translate targetLanguage={language}>{client.mobilityStatus.transferMethod}</Translate>
                   </span>
                </div>
             </div>

             <div className="mt-6 flex flex-wrap gap-2">
                {client.mobilityStatus.useWheelchair && (
                  <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded text-[8px] font-black uppercase">
                    <Translate targetLanguage={language}>Wheelchair</Translate>
                  </span>
                )}
                {client.mobilityStatus.useWalker && (
                  <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded text-[8px] font-black uppercase">
                    <Translate targetLanguage={language}>Walker</Translate>
                  </span>
                )}
             </div>
          </div>

          <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
             <div className="flex gap-2">
                {client.conditions.slice(0, 3).map(c => (
                  <span key={c} className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                    <Translate targetLanguage={language}>{c}</Translate>
                  </span>
                ))}
             </div>
             <Info size={16} className="text-slate-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PSWRoster;
