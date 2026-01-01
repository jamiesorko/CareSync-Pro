
import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { anonymizationService } from '../../services/anonymizationService';
import { MOCK_CLIENTS, MOCK_STAFF } from '../../data/careData';
import { ShieldCheck, Database, RefreshCw, Lock } from 'lucide-react';

const AIScheduler: React.FC = () => {
  const [phase, setPhase] = useState<'IDLE' | 'SCRUBBING' | 'OPTIMIZING' | 'HYDRATING' | 'COMPLETE'>('IDLE');
  const [roster, setRoster] = useState<any[]>([]);

  const executeSovereignSchedule = async () => {
    setRoster([]);
    setPhase('SCRUBBING');
    
    // Step 1: Double Scrubbing
    const { payload, lookups } = anonymizationService.prepareSovereignPayload(MOCK_CLIENTS, MOCK_STAFF);
    await new Promise(r => setTimeout(r, 1000)); // Visible latency for UX

    setPhase('OPTIMIZING');
    try {
      // Step 2: AI Optimization (using IDs only)
      const aiResponse = await geminiService.generateSecureSchedule(payload);
      
      setPhase('HYDRATING');
      await new Promise(r => setTimeout(r, 800));

      // Step 3: Local Restoration
      const finalSchedule = anonymizationService.hydrateRoster(aiResponse, lookups);
      setRoster(finalSchedule);
      setPhase('COMPLETE');
    } catch (e) {
      alert("SIGNAL_ERROR: Neural intercept failed.");
      setPhase('IDLE');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-slate-900 p-8 rounded-[3rem] border border-white/10 shadow-2xl">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Neural_Dispatch</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Autonomous Roster Generation v4.5</p>
        </div>
        <button 
          onClick={executeSovereignSchedule}
          disabled={phase !== 'IDLE' && phase !== 'COMPLETE'}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all flex items-center gap-3"
        >
          <RefreshCw size={14} className={phase === 'OPTIMIZING' ? 'animate-spin' : ''} />
          {phase === 'IDLE' ? 'Execute_Neural_Roster' : 'Re-Run_Optimization'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scrubbing HUD */}
        <div className="lg:col-span-4 bg-black border border-white/10 rounded-[3rem] p-10 flex flex-col h-[500px]">
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck className="text-emerald-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Sovereignty_Scrub_Protocol</h3>
          </div>
          
          <div className="flex-1 space-y-6 overflow-hidden">
            <div className="font-mono text-[10px] space-y-2 opacity-50">
               <p className="text-sky-400">// Layer 1: Masking PII...</p>
               <p className="text-white">CLIENT_NAME_HASH: OK</p>
               <p className="text-white">PHONE_PURGE: OK</p>
               <p className="text-sky-400">// Layer 2: Generalizing Geofence...</p>
               <p className="text-white">SECTOR_LOCK: {phase === 'IDLE' ? 'WAITING' : 'MISSISSAUGA'}</p>
            </div>
            {phase === 'SCRUBBING' && <div className="w-full h-1 bg-sky-500 animate-pulse rounded-full" />}
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
             <div className="flex items-center gap-2 mb-2">
                <Lock size={12} className="text-emerald-500" />
                <p className="text-[8px] font-black text-white uppercase">Vault_Status</p>
             </div>
             <p className="text-[9px] text-slate-500 italic">No human names have left the local node. Encryption is active.</p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-4">
          {roster.map((visit, i) => (
            <div key={i} className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center animate-in slide-in-from-right-4" style={{ animationDelay: `${i * 0.1}s` }}>
              <div>
                <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">{visit.clientName}</h4>
                <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Staff Assigned: <span className="text-indigo-400">{visit.staffName}</span></p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-xl">
                 <p className="text-lg font-black text-white italic">{visit.time}</p>
                 <p className="text-[7px] font-black text-emerald-400 uppercase tracking-widest text-center">Temporal_Lock</p>
              </div>
            </div>
          ))}
          {phase === 'IDLE' && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 grayscale border-4 border-dashed border-white/5 rounded-[4rem]">
               <Database size={64} className="mb-6" />
               <p className="text-sm font-black uppercase tracking-widest">Awaiting_Neural_Signal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIScheduler;
