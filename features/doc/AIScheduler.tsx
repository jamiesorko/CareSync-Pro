
import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { anonymizationService, HydratedScheduleEntry } from '../../services/anonymizationService';
import EfficiencyHUD from '../../components/scheduler/EfficiencyHUD';
import { MOCK_CLIENTS, MOCK_STAFF } from '../../data/careData';
import { CheckCircle2, Clock, MapPin, User, ShieldCheck } from 'lucide-react';

const AIScheduler: React.FC = () => {
  const [phase, setPhase] = useState<'IDLE' | 'ANONYMIZING' | 'OPTIMIZING' | 'HYDRATING' | 'COMPLETE'>('IDLE');
  const [schedule, setSchedule] = useState<HydratedScheduleEntry[]>([]);

  const handleRunPipeline = async () => {
    setSchedule([]);
    
    // 1. ANONYMIZATION PHASE (Local)
    setPhase('ANONYMIZING');
    const { payload, lookups } = anonymizationService.prepareAnonymizedPayload(MOCK_CLIENTS, MOCK_STAFF);
    await new Promise(r => setTimeout(r, 600));
    
    // 2. NEURAL OPTIMIZATION PHASE (AI)
    setPhase('OPTIMIZING');
    try {
      const anonymizedRoster = await geminiService.generateSecureSchedule(payload);
      
      // 3. HYDRATION PHASE (Local)
      setPhase('HYDRATING');
      const finalRoster = anonymizationService.hydrateSchedule(anonymizedRoster, lookups);
      await new Promise(r => setTimeout(r, 600));
      
      setSchedule(finalRoster);
      setPhase('COMPLETE');
    } catch (err) {
      alert("SIGNAL_ERROR: Neural intercept failed.");
      setPhase('IDLE');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        <div className="lg:col-span-2">
          <EfficiencyHUD idleIndex={1.8} continuity={99.2} />
        </div>
        <button 
          onClick={handleRunPipeline}
          disabled={phase !== 'IDLE' && phase !== 'COMPLETE'}
          className="h-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-indigo-500/20 transition-all py-6"
        >
          {phase === 'IDLE' ? 'Execute_Neural_Roster' : 'Re-Run_Optimization'}
        </button>
      </div>

      <div className="min-h-[500px]">
        {phase === 'COMPLETE' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
             <div className="flex items-center gap-4 px-4">
                <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Hydrated_Deployment_Grid</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schedule.map((entry, i) => (
                  <div key={i} className="p-10 bg-slate-900/50 border border-white/5 rounded-[3rem] group hover:border-indigo-500/30 transition-all shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <span className="text-6xl font-black italic">{entry.staffId}</span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                          <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{entry.clientName}</h4>
                          <div className="flex items-center gap-2 mt-2 text-slate-500">
                             <MapPin size={12} />
                             <p className="text-[10px] font-bold uppercase tracking-widest">{entry.clientAddress}</p>
                          </div>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-center">
                          <p className="text-xl font-black text-white italic">{entry.scheduledTime}</p>
                          <p className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Temporal_Lock</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-black/40 p-6 rounded-[2rem] border border-white/5 mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 font-black text-sm uppercase">{entry.staffName.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-black text-white italic uppercase">{entry.staffName}</p>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{entry.staffRole} • ID: {entry.staffId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-xs font-black text-slate-400 italic">Verified Node</p>
                           <ShieldCheck size={14} className="text-emerald-500 ml-auto mt-1" />
                        </div>
                    </div>

                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest mb-3 italic">AI_Deployment_Rationale</p>
                        <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">
                            "{entry.reasoning}"
                        </p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="p-10 bg-indigo-600 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
                <div>
                   <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Roster_Finalization</h4>
                   <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-2">Publish hydrated grid to field operative mobile stations</p>
                </div>
                <button 
                  onClick={() => alert("SIGNAL_DISPATCHED: Schedule vectors synchronized to all field nodes.")}
                  className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  TRANSMIT_TO_STAFF
                </button>
             </div>
          </div>
        )}

        {(phase !== 'IDLE' && phase !== 'COMPLETE') && (
          <div className="h-96 flex flex-col items-center justify-center space-y-10">
             <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">
                  {phase === 'ANONYMIZING' ? '🧤' : phase === 'OPTIMIZING' ? '🧠' : '💧'}
                </div>
             </div>
             <div className="text-center space-y-2">
                <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] animate-pulse">
                  {phase === 'ANONYMIZING' ? 'Scrubbing_Personal_Vectors' : 
                   phase === 'OPTIMIZING' ? 'Chaining_Fleet_Trajectories' : 
                   'Hydrating_Identity_Nodes'}
                </p>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Sovereignty Protocol Active</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIScheduler;
