import React, { useState, useEffect } from 'react';
import { boardGovernanceService } from '../../services/boardGovernanceService';
import { ChairmanMandate } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const ChairmanCommand: React.FC<Props> = ({ language }) => {
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
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24 font-serif">
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            <Translate target={language}>Chairman_Command</Translate>
          </h2>
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mt-3">
             <Translate target={language}>Board_of_Directors</Translate> • <Translate target={language}>Institutional_Sovereignty_Matrix</Translate>
          </p>
        </div>
        <button 
          onClick={runAudit}
          className="px-10 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-slate-700 transition-all shadow-3xl"
        >
          {loading ? <Translate target={language}>INGESTING_SIGNALS</Translate> : <Translate target={language}>REFRESH_BOARD_VECTORS</Translate>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-[#0a0f1e] border border-white/5 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="w-20 h-20 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.8em] animate-pulse">
                   <Translate target={language}>Forging_Chairman_Consensus</Translate>
                </p>
             </div>
           ) : mandate && (
             <div className="space-y-16 relative z-10 animate-in slide-in-from-bottom-8 duration-700">
                <section>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">
                      <Translate target={language}>Institutional_Fragility_Points</Translate>
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {mandate.institutionalFragilityPoints.map((f, i) => (
                        <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl group hover:bg-rose-500/5 transition-all">
                           <div className="flex items-center gap-4 mb-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:animate-ping"></div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                 <Translate target={language}>Failure_Vector</Translate> 0{i+1}
                              </p>
                           </div>
                           <p className="text-sm text-slate-200 font-medium italic">
                              <Translate target={language}>{f}</Translate>
                           </p>
                        </div>
                      ))}
                   </div>
                </section>

                <section className="pt-10 border-t border-white/5">
                   <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-10">
                      <Translate target={language}>Market_Grounded_Outlook</Translate>
                   </p>
                   <div className="p-10 bg-sky-600/5 border border-sky-500/10 rounded-[3rem]">
                      <p className="text-lg text-slate-200 leading-relaxed font-medium italic italic">
                         <Translate target={language}>{mandate.marketSentimentGrounded}</Translate>
                      </p>
                   </div>
                </section>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-[#1e1b4b] p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex-1">
              <h3 className="text-xs font-black uppercase tracking-widest mb-12 opacity-60">
                 <Translate target={language}>Strategic_Risk_Index</Translate>
              </h3>
              <div className="flex items-baseline space-x-3 mb-10">
                 <p className={`text-9xl font-black italic tracking-tighter ${mandate && mandate.strategicRiskIndex > 50 ? 'text-rose-500' : 'text-emerald-400'}`}>
                   <Translate target={language}>{String(mandate?.strategicRiskIndex || '--')}</Translate>
                 </p>
                 <span className="text-xs font-black opacity-40 uppercase">
                    <Translate target={language}>Risk_Level</Translate>
                 </span>
              </div>
              <p className="text-sm font-bold italic leading-relaxed opacity-80 mb-10">
                <Translate target={language}>Directives_issued_to_CEO_Focus_on_Sector_4_retention_to_preserve_12_annual_margin</Translate>
              </p>
              <button className="w-full py-5 bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                <Translate target={language}>AUTHORIZE_BOARD_DECREE</Translate>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChairmanCommand;