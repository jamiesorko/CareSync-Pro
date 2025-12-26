import React, { useState } from 'react';
import { protocolArchitectService } from '../../services/protocolArchitectService';
import { ProtocolDraft } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const ProtocolForge: React.FC<Props> = ({ language }) => {
  const [directive, setDirective] = useState('');
  const [draft, setDraft] = useState<ProtocolDraft | null>(null);
  const [loading, setLoading] = useState(false);

  const forge = async () => {
    if (!directive.trim()) return;
    setLoading(true);
    try {
      const result = await protocolArchitectService.forgeProtocol(directive, "Clinical Quality");
      setDraft(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-sky-400">Protocol_Forge</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Neural SOP Synthesis & Regulatory Alignment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl flex flex-col">
           <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8 italic">Directive_Vector_Input</h3>
           <textarea 
            value={directive}
            onChange={(e) => setDirective(e.target.value)}
            placeholder="E.g. Protocol for verifying morning insulin delivery for non-RN staff."
            className="w-full h-48 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-sm text-white focus:outline-none focus:border-sky-500 transition-all italic placeholder:text-slate-800"
           />
           <button 
            onClick={forge}
            disabled={loading || !directive.trim()}
            className="w-full mt-10 py-6 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
           >
             {loading ? 'FORGING_PROTOCOLS...' : 'INITIATE_SOP_FORGE'}
           </button>
        </div>

        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {!draft && !loading ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                <span className="text-9xl mb-8">🏗️</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Awaiting Blueprint Signal</h3>
                <p className="text-sm font-bold text-slate-500 mt-4 max-w-sm">The Forge turns executives' clinical intent into formal, legally-aligned standard operating procedures.</p>
             </div>
           ) : loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                <div className="w-24 h-24 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.8em] animate-pulse">Architecting_Legal_Fidelity</p>
             </div>
           ) : draft && (
             <div className="flex-1 space-y-12 relative z-10 animate-in zoom-in duration-700">
                <div className="flex justify-between items-start">
                   <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{draft.title}</h3>
                   <span className="px-3 py-1 bg-emerald-600 text-white text-[8px] font-black rounded uppercase">Aligned</span>
                </div>
                <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                   <p className="text-[9px] font-black text-slate-500 uppercase mb-4">Core_Objective</p>
                   <p className="text-sm text-slate-200 font-medium italic">"{draft.objective}"</p>
                </div>
                <div className="space-y-4">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Workflow_Sequence</p>
                   {draft.workflowSteps.map((step, i) => (
                     <div key={i} className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/5 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-[10px] font-black text-sky-400 italic">{i+1}</div>
                        <div>
                           <p className="text-[9px] font-black text-slate-600 uppercase mb-1">{step.role}</p>
                           <p className="text-xs text-white font-bold italic">"{step.task}"</p>
                        </div>
                     </div>
                   ))}
                </div>
                <button 
                  onClick={() => alert("SIGNAL_LOCKED: SOP published to Global Neural Library. Field terminals updated.")}
                  className="w-full py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  AUTHORIZE_SOP_PUBLICATION
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProtocolForge;