
import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { HydratedScheduleEntry } from '../../services/anonymizationService';
import { overtimeApprovalService, OvertimeConsensus } from '../../services/overtimeApprovalService';
import EfficiencyHUD from '../../components/scheduler/EfficiencyHUD';
import { MOCK_CLIENTS, MOCK_STAFF } from '../../data/careData';
import { CareRole } from '../../types';

const AIScheduler: React.FC = () => {
  const [phase, setPhase] = useState<'IDLE' | 'SCANNING' | 'OPTIMIZING' | 'COMPLETE'>('IDLE');
  const [schedule, setSchedule] = useState<HydratedScheduleEntry[]>([]);
  const [otRequests, setOtRequests] = useState<OvertimeConsensus[]>([]);

  const handleRunPipeline = async () => {
    setSchedule([]);
    setPhase('SCANNING');
    await new Promise(r => setTimeout(r, 800));
    
    setPhase('OPTIMIZING');
    try {
      const result = await geminiService.generateSecureSchedule(MOCK_CLIENTS, MOCK_STAFF);
      setSchedule(result);
      setPhase('COMPLETE');
    } catch (err) {
      setPhase('IDLE');
    }
  };

  const handleRequestOvertime = async (entry: HydratedScheduleEntry) => {
    const req = await overtimeApprovalService.request(entry.staffId, entry.staffName, 2);
    setOtRequests(prev => [...prev, req]);
    alert(`SIGNAL_DISPATCHED: OT consensus request for ${entry.staffName} sent to Ops and Fiscal terminals.`);
  };

  const handleConsensusApprove = (id: string, role: CareRole) => {
    const updated = overtimeApprovalService.approve(id, role);
    if (updated) {
      setOtRequests(prev => prev.map(r => r.id === id ? updated : r));
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
          {phase === 'IDLE' ? 'Execute_Neural_Optimization' : 'Re-Run_Optimization'}
        </button>
      </div>

      {otRequests.length > 0 && (
        <div className="bg-rose-600/10 border border-rose-500/30 p-8 rounded-[3rem] space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest">Cap_Breach_Consensus_Matrix</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase italic">Dual-Lock Protocol Active</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {otRequests.map((req) => (
              <div key={req.id} className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                   <p className="text-xs font-black text-white italic uppercase">{req.staffName}</p>
                   <p className="text-[10px] font-bold text-rose-400">Proposed Load: {req.units + 40} Units</p>
                </div>

                <div className="flex gap-4 items-center">
                   <button 
                    onClick={() => handleConsensusApprove(req.id, CareRole.COORDINATOR)}
                    className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase transition-all border ${req.opsLock ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/10 text-slate-500'}`}
                   >
                     {req.opsLock ? 'OPS_LOCK_SECURED' : 'COORD_APPROVAL'}
                   </button>
                   
                   <button 
                    onClick={() => handleConsensusApprove(req.id, CareRole.ACCOUNTANT)}
                    className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase transition-all border ${req.fiscalLock ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/10 text-slate-500'}`}
                   >
                     {req.fiscalLock ? 'FISCAL_LOCK_SECURED' : 'ACCT_APPROVAL'}
                   </button>

                   {req.status === 'AUTHORIZED' && (
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse ml-4 italic underline underline-offset-4">LOCKED_TO_LEDGER</span>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'COMPLETE' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
           <h3 className="text-xl font-black text-white italic tracking-tighter uppercase ml-4">Deployment_Grid_v4.5</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedule.map((entry, i) => {
                const isOverCap = entry.weeklyLoad >= 40;
                return (
                  <div key={i} className={`p-8 rounded-[2.5rem] border transition-all ${isOverCap ? 'bg-rose-600/5 border-rose-500/20 shadow-[0_0_40px_rgba(225,29,72,0.05)]' : 'bg-slate-900/50 border-white/5 hover:bg-slate-900'}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{entry.clientName}</h4>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{entry.clientAddress}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-white italic">{entry.scheduledTime}</p>
                          <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Frictionless_Seq</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-black/40 p-5 rounded-2xl border border-white/5 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 font-black text-xs uppercase">{entry.staffName.charAt(0)}</div>
                          <div>
                            <p className="text-xs font-black text-white italic uppercase">{entry.staffName}</p>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Load: {entry.weeklyLoad} / 40 Units</p>
                          </div>
                        </div>
                        {isOverCap && (
                          <button 
                            onClick={() => handleRequestOvertime(entry)}
                            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-[8px] font-black uppercase shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all"
                          >
                            Request_OT
                          </button>
                        )}
                    </div>

                    <p className="text-[10px] text-slate-500 italic leading-relaxed">
                        <span className="font-black text-indigo-500 uppercase not-italic mr-2 tracking-widest">Optimization_Rationale:</span>
                        "{entry.reasoning}"
                    </p>
                  </div>
                );
              })}
           </div>
        </div>
      )}

      {(phase === 'SCANNING' || phase === 'OPTIMIZING') && (
        <div className="h-96 flex flex-col items-center justify-center space-y-8">
           <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">⏳</div>
           </div>
           <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] animate-pulse">
             {phase === 'SCANNING' ? 'Eliminating_Temporal_Friction' : 'Chaining_Fleet_Trajectories'}
           </p>
        </div>
      )}
    </div>
  );
};

export default AIScheduler;
