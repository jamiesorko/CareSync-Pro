
import React, { useState } from 'react';
import { Client, EthicsConsult } from '../../types';
import { clinicalEthicsAdvisoryService } from '../../services/clinicalEthicsAdvisoryService';

interface Props {
  language: string;
  clients: Client[];
}

const EthicsAdvisoryHUD: React.FC<Props> = ({ language, clients }) => {
  const [consult, setConsult] = useState<EthicsConsult | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const runConsult = async () => {
    setLoading(true);
    try {
      const result = await clinicalEthicsAdvisoryService.arbitrateDilemma(clients[0], input);
      setConsult(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-slate-400">Ethics_Advisory</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Moral Liability & Dilemma Arbitration Matrix</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           <div className="space-y-10 relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 italic">Moral_Conflict_Ingest</h3>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g. Patient with advanced dementia repeatedly refuses mandatory wound dressing change. Risk of sepsis is 40% but patient becomes physically aggressive during intervention."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-[3rem] p-8 text-sm text-white focus:outline-none focus:border-white/30 transition-all italic placeholder:text-slate-800"
              />
              <button 
                onClick={runConsult}
                disabled={loading || !input.trim()}
                className="w-full py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
              >
                {loading ? 'WEIGHING_ETHICAL_VECTORS...' : 'INITIATE_MORAL_CONSULT'}
              </button>
           </div>

           {consult && (
             <div className="mt-12 space-y-10 relative z-10 animate-in slide-in-from-bottom-8">
                <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                   <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-4">Conflict_Synthesis</p>
                   <p className="text-2xl font-bold text-white leading-relaxed italic uppercase tracking-tighter">"{consult.moralConflict}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {consult.stakeholderPerspectives.map((p: any, i: number) => (
                     <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                        <p className="text-[8px] font-black text-slate-500 uppercase mb-2">{p.entity}</p>
                        <p className="text-[10px] text-slate-300 italic">"{p.focus}"</p>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-white/10 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col group">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <span className="text-7xl font-black italic uppercase">Duty</span>
           </div>
           <h3 className="text-xs font-black uppercase tracking-widest mb-10 text-slate-400 italic">Consensus_Directive</h3>
           <div className="flex-1 space-y-8 relative z-10">
              <p className="text-lg font-bold italic leading-relaxed">
                "{consult?.consensusDirective || "Awaiting dilemma ingest to calculate moral path..."}"
              </p>
              {consult && (
                <div className="p-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl">
                   <p className="text-[8px] font-black text-sky-400 uppercase mb-2">Legislative_Guardrail</p>
                   <p className="text-xs font-bold text-white uppercase tracking-tighter">{consult.legislativeGuardrail}</p>
                </div>
              )}
              <button 
                onClick={() => alert("SIGNAL_LOCKED: Ethical directive committed to patient record.")}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                AUTHORIZE_DIRECTIVE
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsAdvisoryHUD;
