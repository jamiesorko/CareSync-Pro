
import React, { useState, useEffect } from 'react';
import { capitalGovernorService, CapitalPulse } from '../../services/capitalGovernorService';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const CapitalGovernorHUD: React.FC<Props> = ({ language }) => {
  const [pulse, setPulse] = useState<CapitalPulse | null>(null);
  const [loading, setLoading] = useState(true);

  const runFiscalAudit = async () => {
    setLoading(true);
    try {
      const mockMetrics = { reserves: 620000, currentRev: 245000, region: 'Ontario' };
      const data = await capitalGovernorService.forecastStrategicCapital(mockMetrics, "Toronto");
      setPulse(data);
    } catch (e) {
      console.error("Fiscal sync failure.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { runFiscalAudit(); }, []);

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-1000 pb-12">
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none text-emerald-400">Capital_Governor</h2>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Neural CFO & Macro-Economic Leverage Matrix</p>
        </div>
        <button 
          onClick={runFiscalAudit}
          disabled={loading}
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          {loading ? 'CALCULATING...' : 'REFRESH_VECTORS'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-12 h-12 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Ingesting_Economic_Signals</p>
             </div>
           ) : pulse && (
             <div className="space-y-10 relative z-10 animate-in slide-in-from-bottom-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">Fiscal_Runway</p>
                      <p className="text-5xl font-black italic tracking-tighter text-white">{pulse.runwayMonths}<span className="text-base ml-1 text-slate-700">MO</span></p>
                   </div>
                   <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">Burn_Rate</p>
                      <p className="text-xl font-black italic text-rose-500">${pulse.burnRateWeekly.toLocaleString()}</p>
                   </div>
                   <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">Leverage</p>
                      <p className="text-3xl font-black italic text-sky-400">{pulse.marketLeverageScore}%</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {pulse.strategicPivots.map((pivot, i) => (
                     <div key={i} className="p-8 bg-emerald-600/5 border border-emerald-500/20 rounded-3xl group hover:bg-emerald-600/10 transition-all">
                        <h4 className="text-lg font-black text-white italic tracking-tighter uppercase mb-3">{pivot.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium italic mb-4">"{pivot.rationale}"</p>
                        <div className="flex justify-between items-center">
                           <span className="text-[7px] font-black text-rose-500 uppercase">Risk: {pivot.risk}</span>
                           <button className="text-[7px] font-black text-sky-400 uppercase border-b border-sky-400/20">Model_Expansion</button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-emerald-600 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-xs font-black uppercase tracking-widest mb-8 opacity-60 italic">Expansion_Capacity</h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black italic tracking-tighter">${pulse ? (pulse.expansionCapacity / 1000).toFixed(0) : '--'}k</p>
                    <span className="text-[9px] font-black opacity-50 uppercase">Deployable</span>
                 </div>
                 <p className="text-xs font-bold italic leading-relaxed opacity-90">
                   "Restructure Sector 1 debt to unlock +12% expansion runway for Sector 4 nodes."
                 </p>
                 <button 
                  onClick={() => alert("SIGNAL_LOCKED: Financial directive transmitted to Treasury Node.")}
                  className="w-full py-4 bg-white text-emerald-900 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                 >
                   AUTHORIZE_FINANCING_PIVOT
                 </button>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex-1">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Macro_Telemetry</p>
              <div className="space-y-4">
                 {[
                   { label: 'Inflation Offset', val: '+2.4%', color: 'text-rose-400' },
                   { label: 'Sovereignty', val: 'High', color: 'text-emerald-400' },
                   { label: 'Competitor Burn', val: 'Accelerating', color: 'text-sky-400' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
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

export default CapitalGovernorHUD;
