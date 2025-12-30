
import React, { useState } from 'react';
import { MOCK_STAFF, MOCK_CLIENTS } from '../data/careData';
import { CareRole, StaffMember, Client, BlastStatus, AlertSignal } from '../types';
import { aiSchedulerService } from '../services/aiSchedulerService';
import { ShieldAlert, Send, Clock, UserX, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import Translate from '../components/Translate';

interface Props {
  language: string;
}

const CoordinationHub: React.FC<Props> = ({ language }) => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [activeBlasts, setActiveBlasts] = useState<BlastStatus[]>([]);
  const [view, setView] = useState<'DEPLOYMENT' | 'BLASTS' | 'COMPLAINTS'>('DEPLOYMENT');

  const handleUpdateDirective = (clientId: string) => {
    const directive = prompt("Enter coordinator directive for field staff:");
    if (directive) {
      setClients(prev => prev.map(c => c.id === clientId ? { ...c, coordinatorInstructions: directive } : c));
      alert("Directive synchronized. Visible on field care plan.");
    }
  };

  const triggerShiftBlast = (client: Client) => {
    const candidates = aiSchedulerService.generateBlastCandidates(client, staff, CareRole.PSW);
    if (candidates.length === 0) {
      alert(`NO_CANDIDATES: No qualified staff found in ${client.sector} with availability.`);
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
    alert(`SIGNAL_BLAST: Broadcasting shift to ${candidates.length} staff in ${client.sector}. Top 5 routed to client.`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-indigo-400">Logistics_Command</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Autonomous Deployment & Coordinator Oversight</p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10">
          {['DEPLOYMENT', 'BLASTS', 'COMPLAINTS'].map(v => (
            <button 
              key={v}
              onClick={() => setView(v as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate targetLanguage={language}>{v}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {view === 'DEPLOYMENT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* OT Watchdog */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-10">
                  <ShieldAlert className="text-amber-500" size={20} />
                  <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Cap_Monitor</h3>
                </div>
                <div className="space-y-4">
                  {staff.map(s => (
                    <div key={s.id} className={`p-6 rounded-2xl border transition-all ${s.weeklyHours >= 40 ? 'bg-rose-600/10 border-rose-500/40 shadow-[0_0_20px_#f43f5e1a]' : 'bg-white/[0.03] border-white/5'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-black text-white uppercase italic">{s.name}</p>
                          <p className="text-[8px] text-slate-500 uppercase font-bold">{s.role} • {s.homeSector}</p>
                        </div>
                        <p className={`text-2xl font-black italic tracking-tighter ${s.weeklyHours >= 40 ? 'text-rose-500' : 'text-emerald-400'}`}>{s.weeklyHours}h</p>
                      </div>
                      {s.weeklyHours >= 40 && (
                        <div className="p-3 bg-rose-600/20 rounded-xl text-[8px] font-black text-rose-400 uppercase tracking-widest text-center border border-rose-500/20">
                          POOL_RESTRICTION_ACTIVE
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Manual Roster Control */}
            <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-12">Fleet_Roster_Directives</h3>
               <div className="space-y-6">
                  {clients.map(client => (
                    <div key={client.id} className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] group hover:bg-white/5 transition-all">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                        <div className="flex-1 space-y-6">
                           <div>
                              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{client.sector}</p>
                              <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h4>
                           </div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5 relative group/edit">
                              <p className="text-[8px] font-black text-slate-600 uppercase mb-3 flex items-center gap-2">
                                <Edit3 size={10} /> Coordinator_Directive
                              </p>
                              <p className="text-sm text-slate-300 font-medium italic leading-relaxed">
                                "{client.coordinatorInstructions || 'No manual instructions issued.'}"
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
                              <Send size={14} /> Trigger_Shift_Blast
                           </button>
                           <button className="px-10 py-5 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
                              Manual_Re-Assign
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {view === 'BLASTS' && (
           <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 shadow-2xl animate-in zoom-in duration-500">
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-12">Active_Blast_Missions</h3>
              <div className="space-y-6">
                 {activeBlasts.map(blast => (
                   <div key={blast.id} className="p-10 bg-black/40 border border-white/5 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-10">
                      <div>
                         <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">{blast.id}</p>
                         <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Client: {clients.find(c => c.id === blast.clientId)?.name}</h4>
                         <p className="text-xs font-bold text-emerald-400 mt-4 uppercase">Status: {blast.status.replace(/_/g, ' ')}</p>
                      </div>
                      <div className="flex gap-4">
                         {blast.candidates.map(cid => (
                           <div key={cid} className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white hover:bg-indigo-600 transition-all cursor-help" title={staff.find(s => s.id === cid)?.name}>
                              {staff.find(s => s.id === cid)?.name?.charAt(0)}
                           </div>
                         ))}
                      </div>
                      <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase shadow-xl">Finalize_Fill</button>
                   </div>
                 ))}
                 {activeBlasts.length === 0 && (
                   <div className="py-32 text-center opacity-30 italic">No active shift blasts in the region.</div>
                 )}
              </div>
           </div>
        )}

        {view === 'COMPLAINTS' && (
          <div className="bg-rose-600/10 border border-rose-500/20 rounded-[4rem] p-12 shadow-2xl animate-in slide-in-from-right-8">
             <div className="flex items-center gap-4 mb-12">
                <AlertCircle className="text-rose-500" size={32} />
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">Complaint_Escalation_Nexus</h3>
             </div>
             <div className="space-y-6">
                <div className="p-10 bg-black/40 border border-rose-500/20 rounded-[3rem]">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <span className="px-3 py-1 bg-rose-600 text-white text-[8px] font-black rounded uppercase">CRITICAL_GRIEVANCE</span>
                         <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mt-4 leading-none">Robert Johnson vs Sarah J.</h4>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Received: Today 09:14 AM</p>
                   </div>
                   <p className="text-lg text-slate-300 italic font-medium leading-relaxed mb-8">
                      "Subject reported that worker was using mobile device during transfer session. Requesting immediate restrictive exclusion from future rosters."
                   </p>
                   <div className="flex gap-4">
                      <button onClick={() => alert("SIGNAL_LOCKED: Staff restricted from client dossier. Coordination notes updated.")} className="px-10 py-5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Execute_Restrictive_Block</button>
                      <button className="px-10 py-5 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Initialize_Quality_Audit</button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinationHub;
