
import React from 'react';
import { Client } from '../../types';
import { MapPin, Info, UserCheck, Accessibility } from 'lucide-react';

interface Props {
  clients: Client[];
  onStartVisit: (client: Client) => void;
}

const PSWRoster: React.FC<Props> = ({ clients, onStartVisit }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {clients.map((client) => (
        <div key={client.id} className="bg-slate-900 border border-white/10 rounded-[3.5rem] p-10 shadow-2xl group hover:border-orange-500/30 transition-all flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">{client.time}</p>
              <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                 <MapPin size={12} />
                 <p className="text-[10px] font-bold uppercase">{client.address}</p>
              </div>
            </div>
            <button 
              onClick={() => onStartVisit(client)}
              className="px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Initialize_Visit
            </button>
          </div>

          <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl mb-8 flex-1">
             <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-4">Patient_Profile</p>
             <p className="text-xs text-slate-300 italic leading-relaxed mb-6">"{client.description}"</p>
             
             <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl border flex items-center gap-3 ${client.mobilityStatus.dementia ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                   <Info size={14} />
                   <span className="text-[9px] font-black uppercase">Dementia: {client.mobilityStatus.dementia ? 'YES' : 'NO'}</span>
                </div>
                <div className={`p-3 rounded-xl border flex items-center gap-3 ${client.mobilityStatus.isBedridden ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                   <Accessibility size={14} />
                   <span className="text-[9px] font-black uppercase">Bedridden: {client.mobilityStatus.isBedridden ? 'YES' : 'NO'}</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3 text-slate-300">
                   <Accessibility size={14} />
                   <span className="text-[9px] font-black uppercase">Lift: {client.mobilityStatus.liftType}</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3 text-slate-300">
                   <UserCheck size={14} />
                   <span className="text-[9px] font-black uppercase">Transfer: {client.mobilityStatus.transferMethod}</span>
                </div>
             </div>
          </div>

          <div className="flex gap-2">
             {client.conditions.slice(0, 3).map(c => (
               <span key={c} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black text-slate-500 uppercase">{c}</span>
             ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PSWRoster;
