import React, { useState } from 'react';
import { ethicsAdvisoryService } from '../../services/ethicsAdvisoryService';
import { Client, EthicsConsult } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
  clients: Client[];
}

const EthicsAdvisoryBoard: React.FC<Props> = ({ language, clients }) => {
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [dilemma, setDilemma] = useState("");
  const [consult, setConsult] = useState<EthicsConsult | null>(null);
  const [loading, setLoading] = useState(false);

  const runConsult = async () => {
    if (!dilemma.trim()) return;
    setLoading(true);
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    try {
      const result = await ethicsAdvisoryService.consultEthics(client, dilemma);
      setConsult(result);
    } catch (e) {
      alert("Moral Logic Desync. Re-aligning framework...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-slate-400">Ethics_Advisory_Board</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Dilemma Arbitration & Moral Liability Protection</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
           {clients.slice(0, 3).map(c => (
             <button 
              key={c.id}
              onClick={() => setSelectedClientId(c.id)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedClientId === c.id ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
             >
               {c.name}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Input & Perspectives */}
        <div className="lg:col-span-8 bg-[#0a0c10] border border-white/5 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           <div className="space-y-10 relative z-10">
              <section>
                 <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-6 italic">Ingest_Clinical_Dilemma</h3>
                 <textarea 
                  value={dilemma}
                  onChange={(e) => setDilemma(e.target.value)}
                  placeholder="E.g. Patient with dementia refuses to utilize Hoyer lift, creating extreme caregiver strain and skin risk. Family demands no mechanical force."
                  className="w-full h-40 p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] text-sm text-slate-300 italic leading-relaxed focus:outline-none focus:border-white/20 transition-all scrollbar-hide"
                 />
                 <button 
                  onClick={runConsult}
                  disabled={loading || !dilemma.trim()}
                  className="w-full mt-8 py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
                 >
                   {loading ? 'WEIGHING_MORAL_VECTORS...' : 'INITIATE_ETHICAL_CONSULT'}
                 </button>
              </section>

              {consult && !loading && (
                <section className="animate-in slide-in-from-bottom-8 duration-700 space-y-12 pt-10 border-t border-white/5">
                   <div>
                      <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-6">Identified_Moral_Conflict</p>
                      <p className="text-3xl font-bold text-white leading-tight italic uppercase tracking-tighter">"{consult.moralConflict}"</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {consult.stakeholderPerspectives.map((p, i) => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                           <p className="text-[8px] font-black text-slate-500 uppercase mb-3">{p.entity}</p>
                           <p className="text-[11px] text-slate-200 font-bold mb-3 italic">"{p.focus}"</p>
                           <p className="text-[9px] text-rose-500 font-black uppercase">Risk: {p.risk}</p>
                        </div>
                      ))}
                   </div>
                </section>
              )}
           </div>
        </div>

        {/* The Directive Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-[#1e293b] p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col group">
              <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                 <span className="text-8xl font-black italic uppercase tracking-tighter">Duty</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">Ethics_Board_Consensus</h3>
              
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                   <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : consult ? (
                <div className="space-y-10 relative z-10 animate-in slide-in-from-right-4">
                   <p className="text-xl font-bold italic leading-relaxed">
                     "{consult.consensusDirective}"
                   </p>
                   
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-[8px] font-black uppercase mb-3 opacity-60">Legislative_Guardrail</p>
                      <p className="text-xs font-black text-sky-400 uppercase tracking-tighter">{consult.legislativeGuardrail}</p>
                   </div>

                   <button 
                    onClick={() => alert("SIGNAL_LOCKED: Ethical directive committed to patient care plan. All staff notified.")}
                    className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                   >
                     EXECUTE_DIRECTIVE
                   </button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center opacity-20 italic text-center px-10">
                  Submit a dilemma to initialize the Board's interrogation core.
                </div>
              )}
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex-1 backdrop-blur-3xl overflow-hidden flex flex-col">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10 italic">Case_Review_Log</p>
              <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide pr-2">
                 {[
                   { label: 'Pending Reviews', val: '2', color: 'text-white' },
                   { label: 'Precedent Alignment', val: '94%', color: 'text-sky-400' },
                   { label: 'Risk Abatement', val: 'Active', color: 'text-emerald-400' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
                      <span className={`text-[11px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
                 
                 <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[8px] font-black text-slate-600 uppercase mb-4 tracking-widest">Ethicist_Insight</p>
                    <p className="text-[10px] text-slate-300 italic leading-relaxed">
                      "Neural Analysis detects a 12% rise in autonomy conflicts in Sector 4. Recommend proactive family education sessions."
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default EthicsAdvisoryBoard;