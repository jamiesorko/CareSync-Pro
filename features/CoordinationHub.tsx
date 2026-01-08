
import React, { useState } from 'react';
import { MOCK_STAFF, MOCK_CLIENTS } from '../data/careData';
import { CareRole, StaffMember, Client, BlastStatus, AlertType } from '../types';
import { aiSchedulerService } from '../services/aiSchedulerService';
import { ShieldAlert, Send, Radio, Edit3, AlertCircle } from 'lucide-react';
import { Translate } from '../components/Translate';
import WarRoom from './ceo/WarRoom';

interface Props {
  language: string;
}

const CoordinationHub: React.FC<Props> = ({ language }) => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [activeBlasts, setActiveBlasts] = useState<BlastStatus[]>([]);
  const [view, setView] = useState<'DEPLOYMENT' | 'WAR_ROOM' | 'BLASTS' | 'COMPLAINTS'>('DEPLOYMENT');

  const handleUpdateDirective = (clientId: string) => {
    const directive = prompt("Enter coordinator directive for field staff:");
    if (directive) {
      setClients(prev => prev.map(c => c.id === clientId ? { ...c, coordinatorInstructions: directive } : c));
      alert("Directive synchronized.");
    }
  };

  const triggerShiftBlast = (client: Client) => {
    const candidates = aiSchedulerService.generateBlastCandidates(client, staff, CareRole.PSW);
    if (candidates.length === 0) {
      alert(`NO_CANDIDATES: No qualified staff found.`);
      return;
    }
    const newBlast: BlastStatus = {
      id: `BLAST-${Date.now()}`,
      clientId: client.id,
      roleRequired: CareRole.PSW,
      status: 'SENT_TO_CLIENT',
      candidates
    };
    setActiveBlasts(prev => [newBlast, ...prev]);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 overflow-y-auto scrollbar-hide h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none text-indigo-400">
             <Translate targetLanguage={language}>LOGISTICS_COMMAND</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">
             <Translate targetLanguage={language}>Autonomous_Deployment_&_Coordinator_Oversight</Translate>
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 shadow-xl">
          {['DEPLOYMENT', 'WAR_ROOM', 'BLASTS', 'COMPLAINTS'].map(v => (
            <button 
              key={v}
              onClick={() => setView(v as any)}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${view === v ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              {v === 'WAR_ROOM' && <Radio size={12} className={view === 'WAR_ROOM' ? 'animate-pulse' : ''} />}
              <Translate targetLanguage={language}>{v}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] px-4">
        {view === 'WAR_ROOM' ? (
           <div className="h-[750px] animate-in zoom-in duration-500">
              <WarRoom language={language} />
           </div>
        ) : view === 'DEPLOYMENT' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-10">
                  <ShieldAlert className="text-amber-500" size={20} />
                  <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
                     <Translate targetLanguage={language}>Cap_Monitor</Translate>
                  </h3>
                </div>
                <div className="space-y-4">
                  {staff.map(s => (
                    <div key={s.id} className={`p-6 rounded-2xl border transition-all ${s.weeklyHours >= 40 ? 'bg-rose-600/10 border-rose-500/40 shadow-[0_0_20px_#f43f5e1a]' : 'bg-white/[0.03] border-white/5'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-black text-white uppercase italic">{s.name}</p>
                          <p className="text-[8px] text-slate-500 uppercase font-bold">
                             <Translate targetLanguage={language}>{s.role}</Translate> • {s.homeSector}
                          </p>
                        </div>
                        <p className={`text-2xl font-black italic tracking-tighter ${s.weeklyHours >= 40 ? 'text-rose-500' : 'text-emerald-400'}`}>{s.weeklyHours}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-12">
                  <Translate targetLanguage={language}>Fleet_Roster_Directives</Translate>
               </h3>
               <div className="space-y-6">
                  {clients.map(client => (
                    <div key={client.id} className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] group hover:bg-white/5 transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                        <div className="flex-1 space-y-6">
                           <div>
                              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic">
                                 <Translate targetLanguage={language}>{client.sector}</Translate>
                              </p>
                              <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h4>
                           </div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5 relative group/edit">
                              <p className="text-sm text-slate-300 font-medium italic leading-relaxed">
                                "{client.coordinatorInstructions ? <Translate targetLanguage={language}>{client.coordinatorInstructions}</Translate> : <Translate targetLanguage={language}>No manual instructions issued.</Translate>}"
                              </p>
                              <button 
                                onClick={() => handleUpdateDirective(client.id)}
                                className="absolute top-4 right-4 opacity-0 group-hover/edit:opacity-100 p-2 bg-indigo-600 text-white rounded-lg transition-all"
                              >
                                <Edit3 size={12} />
                              </button>
                           </div>
                        </div>
                        <div className="flex flex-col gap-4 shrink-0">
                           <button onClick={() => triggerShiftBlast(client)} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-500 transition-all flex items-center gap-4">
                              <Send size={14} /> <Translate targetLanguage={language}>Trigger_Shift_Blast</Translate>
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
           <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-32 shadow-2xl animate-in zoom-in duration-500 text-center opacity-30 italic">
              <Translate targetLanguage={language}>No_active_data_in_this_vector.</Translate>
           </div>
        )}
      </div>
    </div>
  );
};

export default CoordinationHub;
