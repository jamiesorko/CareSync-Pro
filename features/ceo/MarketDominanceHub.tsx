import React, { useState } from 'react';
import { marketDominanceService } from '../../services/marketDominanceService';
import { DominanceStrategy } from '../../types';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const MarketDominanceHub: React.FC<Props> = ({ language }) => {
  const [strategy, setStrategy] = useState<DominanceStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState('Toronto East');
  const [service, setService] = useState('Complex Wound Care');

  const runDominanceScan = async () => {
    setLoading(true);
    try {
      const result = await marketDominanceService.forgeDominanceStrategy(region, service);
      setStrategy(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-amber-500">
             <Translate target={language}>Market_Dominance_Hub</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
             <Translate target={language}>Grounded_Competitive_Intelligence_&_Strategic_Bid_Forge</Translate>
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
           <button 
            disabled={loading}
            onClick={runDominanceScan}
            className="px-10 py-4 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
           >
             {loading ? <Translate target={language}>CALCULATING_DOMINANCE</Translate> : <Translate target={language}>FORGE_MARKET_STRATEGY</Translate>}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4">
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl flex flex-col">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-10 italic">
                 <Translate target={language}>Target_Vector_Input</Translate>
              </h3>
              <div className="space-y-8">
                 <div>
                    <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">
                       <Translate target={language}>Expansion_Region</Translate>
                    </label>
                    <input 
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-3">
                       <Translate target={language}>Specialized_Service_Pivot</Translate>
                    </label>
                    <div className="relative">
                      <input 
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest"><Translate target={language}>Currently_Analyzing</Translate>:</span>
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest italic">
                          <Translate target={language}>{service}</Translate>
                        </span>
                      </div>
                    </div>
                 </div>
              </div>
           </div>

           {strategy && (
             <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-600/30 animate-in slide-in-from-left-4">
                <p className="text-[9px] font-black uppercase tracking-widest mb-6 opacity-60">
                   <Translate target={language}>Bid_Confidence_Score</Translate>
                </p>
                <p className="text-8xl font-black italic tracking-tighter">
                   <Translate target={language}>{String(strategy.bidConfidence)}</Translate>%
                </p>
             </div>
           )}
        </div>

        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[650px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                <div className="w-24 h-24 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em] animate-pulse">
                   <Translate target={language}>Scanning_Global_Competitor_Landscape</Translate>
                </p>
             </div>
           ) : strategy && (
             <div className="flex-1 flex flex-col relative z-10 animate-in zoom-in duration-700">
                <div className="flex justify-between items-start mb-16">
                   <div>
                      <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                         <Translate target={language}>Attack_Surface</Translate>: <Translate target={language}>{strategy.region}</Translate>
                      </h3>
                      <p className="mt-4 text-xs font-bold uppercase text-slate-500">
                        <Translate target={language}>Service_Line</Translate>: <Translate target={language}>{strategy.targetServiceLine}</Translate>
                      </p>
                   </div>
                   <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-center">
                      <p className="text-[8px] font-black text-slate-500 uppercase">
                         <Translate target={language}>Competitive_Density</Translate>
                      </p>
                      <p className="text-lg font-black text-white italic">
                         <Translate target={language}>LOW</Translate>
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                   <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] group">
                      <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-6 italic">
                         <Translate target={language}>Competitor_Failure_Vector</Translate>
                      </p>
                      <p className="text-xl font-bold text-white leading-relaxed italic uppercase">
                         "<Translate target={language}>{strategy.competitorWeakness}</Translate>"
                      </p>
                   </div>
                   <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem]">
                      <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-6 italic">
                         <Translate target={language}>Grounded_Market_Logic</Translate>
                      </p>
                      <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                         "<Translate target={language}>{strategy.marketGroundedLogic}</Translate>"
                      </p>
                   </div>
                </div>

                <div className="flex-1 bg-white/5 border border-white/5 rounded-[3.5rem] p-10 flex flex-col">
                   <h4 className="text-xl font-black text-white italic tracking-tighter uppercase mb-8">
                      <Translate target={language}>Draft_Value_Proposition</Translate>
                   </h4>
                   <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 overflow-y-auto scrollbar-hide text-base text-slate-200 leading-relaxed font-medium italic">
                      "<Translate target={language}>{strategy.draftedValueProposition}</Translate>"
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default MarketDominanceHub;