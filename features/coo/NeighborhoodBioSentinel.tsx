import React, { useState, useEffect } from 'react';
import { bioSurveillanceService } from '../../services/bioSurveillanceService';
import { OutbreakZone } from '../../types';

interface Props {
  language: string;
}

const NeighborhoodBioSentinel: React.FC<Props> = ({ language }) => {
  const [zones, setZones] = useState<OutbreakZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState('Toronto');

  const fetch = async () => {
    setLoading(true);
    try {
      const results = await bioSurveillanceService.scanOutbreaks(activeRegion);
      setZones(results);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [activeRegion]);

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-rose-500">Bio_Sentinel</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Regional Outbreak Intercept</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
           {['Toronto', 'Hamilton', 'Ottawa'].map(r => (
             <button key={r} onClick={() => setActiveRegion(r)} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${activeRegion === r ? 'bg-rose-600 text-white shadow-2xl' : 'text-slate-500 hover:text-white'}`}>{r}</button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-rose-500/10 border-t-rose-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest animate-pulse">Ingesting_Public_Health_Telemetry</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {zones.map((zone, i) => (
                  <div key={i} className={`p-8 rounded-[3rem] border transition-all ${zone.severity === 'CRITICAL' ? 'bg-rose-600/10 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.1)]' : 'bg-white/[0.03] border-white/5'}`}>
                    <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none mb-2">{zone.postalCode}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-6">{zone.threatType} Threat • {zone.severity}</p>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                       <div className={`h-full ${zone.severity === 'CRITICAL' ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${zone.intensity}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {zone.mandatoryPPE.map(item => (
                         <span key={item} className="px-3 py-1 bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded text-[8px] font-black uppercase">{item}</span>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
           )}
        </div>
        <div className="lg:col-span-4 bg-rose-600 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col group">
           <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">Enforcement_Protocol</h3>
           <p className="text-sm font-bold italic leading-relaxed mb-10">"Neural Intercept enabled. Staff entering Critical zones must verify PPE via Vision Scan before authorization."</p>
           <button onClick={() => alert("PPE enforcement updated.")} className="w-full py-5 bg-white text-rose-600 rounded-2xl font-black text-[10px] uppercase shadow-xl hover:scale-105 active:scale-95 transition-all">AUTHORIZE_LOCKDOWN</button>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodBioSentinel;