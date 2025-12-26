import React, { useState, useEffect } from 'react';
import { Client } from '../../types';
import Translate from '../../components/Translate';
import { neuralTruthSynthesizer, SynthesisTruth } from '../../services/neuralTruthSynthesizer';

interface Props {
  language: string;
  clients: Client[];
}

const GovernanceHub: React.FC<Props> = ({ language, clients }) => {
  const [activeAnalysis, setActiveAnalysis] = useState<SynthesisTruth | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');

  const runSynthesis = async (clientId: string) => {
    setIsSynthesizing(true);
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    // Simulated conflicting notes for the demo logic
    const mockNotes = [
      { staffName: 'Elena (PSW)', note: 'Patient was calm and sleeping throughout the morning session.' },
      { staffName: 'Neural_Sensor', note: 'Pulse spike detected (112 BPM) at 09:15 AM. Agitation markers high.' }
    ];

    const result = await neuralTruthSynthesizer.synthesizeConflictingNotes(client, mockNotes);
    setActiveAnalysis(result);
    setIsSynthesizing(false);
  };

  useEffect(() => {
    if (selectedClientId) runSynthesis(selectedClientId);
  }, [selectedClientId]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Governance_Hub</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Autonomous Truth Mediation & Clinical Integrity</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
           {clients.slice(0, 3).map(c => (
             <button 
              key={c.id}
              onClick={() => setSelectedClientId(c.id)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedClientId === c.id ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
             >
               {c.name}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px]">
        {/* Signal Divergence Panel */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl overflow-hidden relative">
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10">Signal_Divergence_Matrix</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-4">Field_Narrative (Human)</p>
                    <p className="text-sm text-slate-300 italic leading-relaxed">"Patient was calm and sleeping throughout the morning session."</p>
                    <div className="mt-6 flex items-center space-x-2">
                       <span className="text-[7px] font-black text-slate-700 uppercase px-2 py-1 bg-white/5 rounded">Ref: Shift_Log_92</span>
                    </div>
                 </div>

                 <div className="p-8 bg-rose-600/5 border border-rose-500/20 rounded-3xl">
                    <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-4">Biometric_Vector (Neural)</p>
                    <p className="text-sm text-white italic leading-relaxed">"Pulse spike detected (112 BPM). High respiratory frequency detected."</p>
                    <div className="mt-6 flex items-center space-x-2">
                       <span className="text-[7px] font-black text-rose-500/60 uppercase px-2 py-1 bg-rose-500/10 rounded">Source: Sensor_Link_Alpha</span>
                    </div>
                 </div>
              </div>

              {isSynthesizing ? (
                <div className="mt-12 py-20 flex flex-col items-center justify-center space-y-6">
                   <div className="w-12 h-12 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.5em] animate-pulse">Mediating_Conflict...</p>
                </div>
              ) : activeAnalysis && (
                <div className="mt-12 p-10 bg-sky-600/10 border border-sky-500/20 rounded-[2.5rem] animate-in slide-in-from-bottom-6">
                   <div className="flex items-center space-x-3 mb-8">
                      <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                      <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Neural_Truth_Synthesis</h4>
                   </div>
                   <p className="text-lg font-black text-white italic tracking-tighter leading-relaxed mb-6 uppercase">"{activeAnalysis.consensusAssessment}"</p>
                   <div className="space-y-2">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Identified Variance: <span className="text-sky-400">{activeAnalysis.identifiedDelta}</span></p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Safety Priority: <span className={activeAnalysis.safetyPriorityLevel === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'}>{activeAnalysis.safetyPriorityLevel}</span></p>
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-600/30">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60">Governance_Directive</h3>
              <p className="text-sm font-bold italic leading-relaxed mb-10">
                {activeAnalysis?.suggestedDocAction || "Awaiting neural synthesis for clinical directive..."}
              </p>
              <button 
                disabled={isSynthesizing}
                onClick={() => alert("SIGNAL_LOCKED: Consensus validated. Care plan adjusted across roster.")}
                className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                AUTHORIZE_CONSENSUS
              </button>
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">Integrity_Audit_Stats</p>
              <div className="space-y-4">
                 {[
                   { label: 'Conflict Rate', val: '4.2%', color: 'text-white' },
                   { label: 'Auto-Resolution', val: '92%', color: 'text-emerald-400' },
                   { label: 'Manual Escalate', val: '8%', color: 'text-rose-400' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{stat.label}</span>
                      <span className={`text-[10px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceHub;