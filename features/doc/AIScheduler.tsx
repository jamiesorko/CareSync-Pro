
import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { anonymizationService, HydratedScheduleEntry } from '../../services/anonymizationService';
import EfficiencyHUD from '../../components/scheduler/EfficiencyHUD';
import { MOCK_CLIENTS, MOCK_STAFF } from '../../data/careData';
import { ShieldCheck, Database, Lock, EyeOff, RefreshCw } from 'lucide-react';

const AIScheduler: React.FC = () => {
  const [phase, setPhase] = useState<'IDLE' | 'ANONYMIZING' | 'OPTIMIZING' | 'HYDRATING' | 'COMPLETE'>('IDLE');
  const [schedule, setSchedule] = useState<HydratedScheduleEntry[]>([]);
  const [scrubLog, setScrubLog] = useState<string[]>([]);

  const handleRunPipeline = async () => {
    setSchedule([]);
    setScrubLog(["INITIATING_SOVEREIGNTY_CHECK..."]);
    
    // 1. DOUBLE SCRUBBING PHASE
    setPhase('ANONYMIZING');
    await new Promise(r => setTimeout(r, 800));
    setScrubLog(prev => [...prev, "LAYER_1: MASKING_IDENTITIES... (Names, Phones purged)"]);
    const { payload, lookups } = anonymizationService.prepareAnonymizedPayload(MOCK_CLIENTS, MOCK_STAFF);
    await new Promise(r => setTimeout(r, 800));
    setScrubLog(prev => [...prev, "LAYER_2: GENERALIZING_FISCAL_VECTORS... (Exact rates tiered)"]);
    await new Promise(r => setTimeout(r, 600));
    setScrubLog(prev => [...prev, "PROTOCOL_LOCK: DATA_READY_FOR_INFERENCE"]);
    
    // 2. NEURAL OPTIMIZATION PHASE
    setPhase('OPTIMIZING');
    try {
      const anonymizedRoster = await geminiService.generateSecureSchedule(payload);
      
      // 3. HYDRATION PHASE
      setPhase('HYDRATING');
      await new Promise(r => setTimeout(r, 800));
      const finalRoster = anonymizationService.hydrateSchedule(anonymizedRoster, lookups);
      
      setSchedule(finalRoster);
      setPhase('COMPLETE');
    } catch (err) {
      alert("SIGNAL_ERROR: Neural intercept failed.");
      setPhase('IDLE');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex justify-between items-end gap-6">
        <div className="flex-1">
          <EfficiencyHUD idleIndex={1.8} continuity={99.2} />
        </div>
        <button 
          onClick={handleRunPipeline}
          disabled={phase !== 'IDLE' && phase !== 'COMPLETE'}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-indigo-500/20 transition-all px-12 py-6 h-full flex items-center gap-3"
        >
          {phase === 'IDLE' ? (
            <><RefreshCw size={14} className="animate-spin-slow" /> Execute_Neural_Roster</>
          ) : phase === 'COMPLETE' ? (
            'Re-Run_Optimization'
          ) : (
            'Optimizing_Grid...'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scrubbing HUD */}
        <div className="lg:col-span-4 bg-slate-950 border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col min-h-[500px]">
           <div className="flex items-center gap-3 mb-10">
              <ShieldCheck className="text-emerald-500" size={20} />
              <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Sovereign_Scrub_Protocol</h3>
           </div>

           <div className="flex-1 space-y-6">
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-[10px] space-y-3">
                 <p className="text-slate-600 uppercase mb-4 tracking-tighter">// Neural Bridge Audit Log</p>
                 {scrubLog.map((log, i) => (
                   <p key={i} className={log.includes('COMPLETE') || log.includes('READY') ? 'text-emerald-400' : 'text-sky-400'}>
                      <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                   </p>
                 ))}
                 {phase === 'ANONYMIZING' && <div className="w-2 h-4 bg-sky-500 animate-pulse inline-block ml-1"></div>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className={`p-4 rounded-2xl border transition-all ${phase === 'ANONYMIZING' || phase === 'OPTIMIZING' || phase === 'HYDRATING' || phase === 'COMPLETE' ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/5 border-white/5 opacity-20'}`}>
                    <Lock size={16} className="text-emerald-400 mb-3" />
                    <p className="text-[8px] font-black text-white uppercase leading-tight">Identity_Masking<br/>Active</p>
                 </div>
                 <div className={`p-4 rounded-2xl border transition-all ${phase === 'OPTIMIZING' || phase === 'HYDRATING' || phase === 'COMPLETE' ? 'bg-sky-500/10 border-sky-500/40' : 'bg-white/5 border-white/5 opacity-20'}`}>
                    <EyeOff size={16} className="text-sky-400 mb-3" />
                    <p className="text-[8px] font-black text-white uppercase leading-tight">Fiscal_Generalization<br/>Locked</p>
                 </div>
              </div>
           </div>

           <p className="text-[8px] text-slate-700 uppercase font-bold mt-10 italic">
             CareSync Pro ensures zero PII leakage by generalizing all clinical and fiscal vectors before inference.
           </p>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-8">
          {phase === 'COMPLETE' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-8 duration-700">
                {schedule.map((entry, i) => (
                  <div key={i} className="p-8 bg-slate-900/50 border border-white/5 rounded-[3rem] group hover:border-indigo-500/30 transition-all shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <span className="text-6xl font-black italic">{entry.staffId}</span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                          <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{entry.clientName}</h4>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{entry.clientAddress}</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-center">
                          <p className="text-lg font-black text-white italic">{entry.scheduledTime}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-black/40 p-5 rounded-[2rem] border border-white/5 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 font-black text-xs uppercase">{entry.staffName.charAt(0)}</div>
                          <div>
                            <p className="text-xs font-black text-white italic uppercase">{entry.staffName}</p>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{entry.staffRole} • ID: {entry.staffId}</p>
                          </div>
                        </div>
                    </div>

                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[7px] font-black text-indigo-500 uppercase tracking-widest mb-2 italic">Neural_Rationale</p>
                        <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">
                            "{entry.reasoning}"
                        </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-10 border border-white/5 border-dashed rounded-[4rem] bg-white/[0.02]">
               <div className="relative">
                  <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">
                    {phase === 'IDLE' ? '📡' : phase === 'ANONYMIZING' ? '🧤' : phase === 'OPTIMIZING' ? '🧠' : '💧'}
                  </div>
               </div>
               <div className="text-center space-y-2">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] animate-pulse">
                    {phase === 'IDLE' ? 'Ready_for_Deployment_Request' : 
                     phase === 'ANONYMIZING' ? 'Scrubbing_Personal_Vectors' : 
                     phase === 'OPTIMIZING' ? 'Chaining_Fleet_Trajectories' : 
                     'Hydrating_Identity_Nodes'}
                  </p>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">Node Reliability Protocol Enabled</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIScheduler;
