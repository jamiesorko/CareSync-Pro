import React, { useState, useEffect } from 'react';
import { epidemiologySentinelService } from '../../services/epidemiologySentinelService';
import { RegionalViralPulse } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const EpidemiologySentinelNode: React.FC<Props> = ({ language }) => {
  const [pulse, setPulse] = useState<RegionalViralPulse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState('Toronto');

  const runScan = async () => {
    setLoading(true);
    const result = await epidemiologySentinelService.scanRegionalViralPulse(activeRegion);
    setPulse(result);
    setLoading(false);
  };

  useEffect(() => {
    runScan();
  }, [activeRegion]);

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-rose-500">Epidemiology_Sentinel</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Grounded Regional Outbreak Intercept & PPE Enforcement</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
           {['Toronto', 'Peel', 'York', 'Durham'].map(r => (
             <button 
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeRegion === r ? 'bg-rose-600 text-white shadow-2xl shadow-rose-600/30' : 'text-slate-500 hover:text-white'}`}
             >
               {r}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           <div className="flex justify-between items-start relative z-10 mb-16">
              <div>
                 <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Viral_Intensity_Matrix</h3>
                 <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-2">Target Node: {activeRegion}</p>
              </div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Link Confidence</p>
                 <p className="text-lg font-black text-emerald-400 italic">Grounded (Search)</p>
              </div>
           </div>

           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                <div className="w-16 h-16 border-4 border-rose-500/10 border-t-rose-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.6em] animate-pulse">Ingesting_Public_Health_Vectors</p>
             </div>
           ) : pulse && (
             <div className="flex-1 space-y-16 relative z-10 animate-in slide-in-from-bottom-8 duration-700">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-10">
                      <div className="relative h-64 flex items-center justify-center">
                         <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${pulse.surgeIntensity > 50 ? 'border-rose-500 shadow-[0_0_80px_rgba(244,63,94,0.3)] animate-pulse' : 'border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.1)]'}`}>
                            <div className="text-center">
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{pulse.threatType} Surge</p>
                               <p className={`text-7xl font-black italic tracking-tighter ${pulse.surgeIntensity > 50 ? 'text-rose-500' : 'text-emerald-400'}`}>{pulse.surgeIntensity}%</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col justify-center space-y-12">
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[3rem]">
                         <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-6">Mandatory_PPE_Intercept</p>
                         <div className="flex flex-wrap gap-3">
                            {pulse.ppeMandate.map(item => (
                              <span key={item} className="px-4 py-2 bg-rose-600/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase rounded-xl">
                                {item}
                              </span>
                            ))}
                         </div>
                      </div>

                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[3rem]">
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Grounded_Source</p>
                         <a href={pulse.sourceUri} target="_blank" className="text-xs font-bold text-sky-400 italic hover:underline truncate block">
                           {pulse.sourceUri}
                         </a>
                      </div>
                   </div>
                </div>

                <div className="mt-auto p-10 bg-black/40 border border-white/5 rounded-[3.5rem] group hover:bg-white/5 transition-all">
                   <div className="flex items-center space-x-4 mb-6">
                      <div className="w-1.5 h-10 bg-rose-600 rounded-full group-hover:animate-ping"></div>
                      <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Operational_Impact_Advisory</h4>
                   </div>
                   <p className="text-base text-slate-200 leading-relaxed font-medium italic">"{pulse.fleetImpactAdvisory}"</p>
                </div>
             </div>
           )}
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-rose-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-rose-600/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <span className="text-7xl font-black italic">ALERT</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">Fleet_Guard_Directive</h3>
              <div className="space-y-8 relative z-10">
                 <p className="text-sm font-bold italic leading-relaxed">
                   "Search Grounding identifies a 12% increase in viral hospitalizations in {activeRegion}. Activating PPE verification at visit start for all staff nodes in this sector."
                 </p>
                 <button 
                  onClick={() => alert("SIGNAL_LOCKED: Sector-wide PPE Intercept protocol enabled. All mobile terminals restricted until Vision Scan validation.")}
                  className="w-full py-5 bg-white text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                 >
                   AUTHORIZE_SECTOR_LOCKDOWN
                 </button>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex-1 backdrop-blur-3xl overflow-hidden flex flex-col">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10 italic">Regional_Vitality_Log</p>
              <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide pr-2">
                 {[
                   { label: 'Outbreak Probability', val: 'High', color: 'text-rose-500' },
                   { label: 'PPE Burn Rate', val: '8.4 Units/Day', color: 'text-white' },
                   { label: 'Fleet Immunity', val: 'Active', color: 'text-emerald-400' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
                      <span className={`text-[11px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
                 
                 <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[8px] font-black text-slate-600 uppercase mb-4 tracking-widest">Epidemiologist_Note</p>
                    <p className="text-[10px] text-slate-300 italic leading-relaxed">
                      "Cross-referencing viral signals with staff sick-call patterns suggests a 48-hour peak. Recommend standby coordinator support for Sector 4."
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default EpidemiologySentinelNode;