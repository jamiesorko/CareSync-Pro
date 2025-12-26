import React, { useState } from 'react';
import { protocolArchitectService } from '../../services/protocolArchitectService';
import { ProtocolDraft } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const ProtocolArchitect: React.FC<Props> = ({ language }) => {
  const [directive, setDirective] = useState('');
  const [focusArea, setFocusArea] = useState('Clinical Safety');
  const [draft, setDraft] = useState<ProtocolDraft | null>(null);
  const [loading, setLoading] = useState(false);

  const runForge = async () => {
    if (!directive.trim()) return;
    setLoading(true);
    try {
      const result = await protocolArchitectService.forgeProtocol(directive, focusArea);
      setDraft(result);
    } catch (e) {
      alert("Neural forge desync. Re-calibrating logic patterns...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-sky-400">Protocol_Architect</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3">Synthesizing Regulatory-Aligned Clinical Operating Procedures</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Architect Terminal */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-10 italic">Blueprint_Parameters</h3>
              <div className="space-y-8 flex-1">
                 <div>
                    <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">Domain_Focus</label>
                    <select 
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-sky-500 appearance-none cursor-pointer"
                    >
                       <option className="bg-slate-900">Clinical Safety</option>
                       <option className="bg-slate-900">Hygiene & Sanitation</option>
                       <option className="bg-slate-900">Mobility & Lifts</option>
                       <option className="bg-slate-900">Crisis De-escalation</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">Directive_Vector</label>
                    <textarea 
                      value={directive}
                      onChange={(e) => setDirective(e.target.value)}
                      placeholder="E.g. Create a new protocol for morning insulin verification in private residences for non-RN staff."
                      className="w-full h-48 bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm text-white focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-700 italic"
                    />
                 </div>
              </div>
              <button 
                onClick={runForge}
                disabled={loading || !directive.trim()}
                className="w-full mt-10 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
              >
                {loading ? 'FORGING_BluePrint...' : 'INITIATE_PROTOCOL_FORGE'}
              </button>
           </div>

           <div className="bg-sky-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-sky-600/30">
              <p className="text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Architect_Directive</p>
              <p className="text-sm font-bold italic leading-relaxed">
                "The Architect uses Gemini 3 Pro reasoning to ensure every workflow step is forensic-ready and clinically valid. Review carefully before publishing to the fleet."
              </p>
           </div>
        </div>

        {/* Forge Output Matrix */}
        <div className="lg:col-span-7 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[750px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {!draft && !loading ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                <span className="text-9xl mb-8">🏗️</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Awaiting Blueprint Signal</h3>
                <p className="text-sm font-bold text-slate-500 mt-4 max-w-sm">The Protocol Architect synthesizes full SOPs from human directives with regulatory alignment check.</p>
             </div>
           ) : loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                <div className="w-24 h-24 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin shadow-[0_0_50px_rgba(14,165,233,0.2)]"></div>
                <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.8em] animate-pulse">Forging_Master_Directive</p>
             </div>
           ) : draft && (
             <div className="flex-1 flex flex-col relative z-10 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-start mb-12">
                   <div>
                      <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{draft.title}</h3>
                      <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mt-4 italic">Status: Draft v1.0 • Neuralized</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-center">
                      <p className="text-[8px] font-black text-slate-500 uppercase">Alignment_Vector</p>
                      <p className="text-lg font-black text-emerald-400 italic">SECURE</p>
                   </div>
                </div>

                <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl mb-12">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Core_Clinical_Objective</p>
                   <p className="text-sm text-slate-200 font-medium leading-relaxed italic">"{draft.objective}"</p>
                </div>

                <div className="space-y-6 mb-12">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Workflow_Sequence</p>
                   <div className="space-y-4">
                      {draft.workflowSteps.map((step, i) => (
                        <div key={i} className={`p-6 rounded-2xl border transition-all flex items-center gap-6 group hover:bg-white/5 ${step.critical ? 'bg-rose-600/5 border-rose-500/30' : 'bg-white/[0.02] border-white/5'}`}>
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${step.critical ? 'bg-rose-600 text-white' : 'bg-white/10 text-slate-400'}`}>{i+1}</div>
                           <div className="flex-1">
                              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{step.role}</p>
                              <p className="text-xs text-white font-bold italic">"{step.task}"</p>
                           </div>
                           {step.critical && <span className="text-[7px] font-black text-rose-500 uppercase animate-pulse">Critical_Check</span>}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto">
                   <div className="p-8 bg-amber-600/5 border border-amber-500/20 rounded-3xl">
                      <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-6 italic">Regulatory_Reference</p>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed italic">"{draft.regulatoryAlignment}"</p>
                   </div>
                   <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-3xl">
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-6 italic">Audit_Checklist</p>
                      <div className="space-y-2">
                         {draft.auditChecklist.map((item, i) => (
                           <div key={i} className="flex items-center space-x-2">
                              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                              <p className="text-[10px] text-slate-400 font-bold">{item}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button 
                    onClick={() => alert("SIGNAL_LOCKED: Protocol published to Agency SOP manual. All staff mobile stations updated.")}
                    className="flex-[2] py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] transition-all"
                   >
                     AUTHORIZE_&_PUBLISH
                   </button>
                   <button className="flex-1 py-6 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
                     Export_to_PDF
                   </button>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ProtocolArchitect;