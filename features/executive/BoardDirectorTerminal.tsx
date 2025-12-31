
import React, { useState, useEffect } from 'react';
import { boardGovernanceService } from '../../services/boardGovernanceService';
import { ChairmanMandate } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const BoardDirectorTerminal: React.FC<Props> = ({ language }) => {
  const [mandate, setMandate] = useState<ChairmanMandate | null>(null);
  const [loading, setLoading] = useState(true);

  const runAudit = async () => {
    setLoading(true);
    const mockMetrics = {
      revenue: 1240000,
      staffRetention: '84%',
      clinicalIncidents: 4,
      regulatoryCompliance: '99.2%'
    };
    try {
      const result = await boardGovernanceService.synthesizeInstitutionalVitality(mockMetrics);
      setMandate(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { runAudit(); }, []);

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-1000 pb-12 font-serif">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Chairman_Command</h2>
          <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.4em] mt-2">Board of Directors • Institutional Sovereignty Matrix</p>
        </div>
        <button 
          onClick={runAudit}
          className="px-8 py-3 bg-slate-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-slate-700 transition-all shadow-2xl"
        >
          {loading ? 'INGESTING_SIGNALS...' : 'REFRESH_BOARD_VECTORS'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-[#0a0f1e] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.8em] animate-pulse">Forging_Chairman_Consensus</p>
             </div>
           ) : mandate && (
             <div className="space-y-10 relative z-10 animate-in slide-in-from-bottom-8 duration-700">
                <section>
                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Institutional_Fragility_Points</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mandate.institutionalFragilityPoints.map((f, i) => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-rose-500/5 transition-all">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="w-1 h-1 rounded-full bg-rose-500 group-hover:animate-ping"></div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vector 0{i+1}</p>
                           </div>
                           <p className="text-xs text-slate-200 font-medium italic leading-relaxed">"{f}"</p>
                        </div>
                      ))}
                   </div>
                </section>

                <section className="pt-8 border-t border-white/5">
                   <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest mb-10">Market_Grounded_Outlook</p>
                   <div className="p-8 bg-sky-600/5 border border-sky-500/10 rounded-3xl">
                      <p className="text-base text-slate-200 leading-relaxed font-medium italic italic">"{mandate.marketSentimentGrounded}"</p>
                   </div>
                </section>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-[#1e1b4b] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group flex-1">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60">Strategic_Risk_Index</h3>
              <div className="flex items-baseline space-x-3 mb-8">
                 <p className={`text-8xl font-black italic tracking-tighter ${mandate && mandate.strategicRiskIndex > 50 ? 'text-rose-500' : 'text-emerald-400'}`}>
                   {mandate?.strategicRiskIndex || '--'}
                 </p>
                 <span className="text-xs font-black opacity-40 uppercase">Safe</span>
              </div>
              <p className="text-xs font-bold italic leading-relaxed opacity-80 mb-8">
                "Directives issued to CEO: Focus on Sector 4 retention to preserve 12% annual margin."
              </p>
              <button className="w-full py-4 bg-white text-indigo-900 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                AUTHORIZE_BOARD_DECREE
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// Fix: Corrected export name to BoardDirectorTerminal (line 105)
export default BoardDirectorTerminal;
