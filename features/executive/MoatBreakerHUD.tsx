import React, { useState, useEffect, useRef } from 'react';
import { Client, SyntheticInsight, DeviceReading, RegulatoryPatch } from '../../types';
import { syntheticHistoryService } from '../../services/syntheticHistoryService';
import { hardwareVisionService } from '../../services/hardwareVisionService';
import { regulatoryArbitrageService } from '../../services/regulatoryArbitrageService';
import Translate from '../../components/Translate';

interface Props {
  language: string;
  clients: Client[];
}

const MoatBreakerHUD: React.FC<Props> = ({ language, clients }) => {
  const [insight, setInsight] = useState<SyntheticInsight | null>(null);
  const [reading, setReading] = useState<DeviceReading | null>(null);
  const [patches, setPatches] = useState<RegulatoryPatch[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runSyntheticHistory = async () => {
    setLoading(true);
    try {
      const result = await syntheticHistoryService.bridgeHistoricalGap(clients[0]);
      setInsight(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDeviceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(',')[1];
      setLoading(true);
      try {
        const res = await hardwareVisionService.interceptHardwareScreen(base64);
        setReading(res);
      } catch (e) { alert("Vision intercept failure."); }
      finally { setLoading(false); }
    };
    reader.readAsDataURL(file);
  };

  const runRegulatoryScan = async () => {
    setLoading(true);
    try {
      const result = await regulatoryArbitrageService.interceptNewDirectives("Ontario");
      setPatches(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-indigo-500">Institutional_Disruptor</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Leapfrogging Legacy Goliaths via Neural Arbitrage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Legacy Data Moat Breaker */}
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <span className="text-8xl font-black italic uppercase">History</span>
           </div>
           
           <div className="flex justify-between items-center relative z-10 mb-12">
              <div>
                 <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Synthetic_History_Engine</h3>
                 <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mt-3">Global Clinical Grounding vs Legacy Data Gaps</p>
              </div>
              <button 
                onClick={runSyntheticHistory}
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[9px] font-black uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {loading ? 'SIMULATING_HORIZON...' : 'EXECUTE_HISTORICAL_BRIDGE'}
              </button>
           </div>

           {insight && (
             <div className="flex-1 space-y-10 relative z-10 animate-in slide-in-from-bottom-8">
                <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Scientific Peer Correlation</p>
                   <p className="text-sm text-slate-200 leading-relaxed font-medium italic">"{insight.globalPeerComparison}"</p>
                </div>
                <div className="p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl">
                   <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-4">Neural 10-Year Prediction</p>
                   <p className="text-sm text-white italic font-bold">"{insight.predictedLongTermTrajectory}"</p>
                </div>
                <div className="flex flex-wrap gap-2">
                   {insight.scientificCitations.map((c, i) => (
                     <a key={i} href={c.uri} target="_blank" className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-black text-sky-400 uppercase italic">Source: {c.title}</a>
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* Hardware & Reg Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           {/* Hardware Vision */}
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8 italic">Device_Vision_Intercept</h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-black/40 border-4 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center cursor-pointer group hover:border-sky-500/50 transition-all mb-8"
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">📷</span>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Scan Legacy Screen</p>
                <input ref={fileInputRef} type="file" hidden onChange={handleDeviceUpload} accept="image/*" />
              </div>

              {reading && (
                <div className="space-y-6 animate-in zoom-in">
                   <div className="flex justify-between items-center">
                      <p className="text-sm font-black text-white italic uppercase tracking-tighter">{reading.deviceName}</p>
                      <span className="text-xl font-black text-emerald-400 italic">{reading.detectedValue}</span>
                   </div>
                   <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <p className="text-[8px] font-black text-emerald-400 uppercase mb-2">FHIR_R4_INTEROP_MAPPING</p>
                      <p className="text-[7px] font-mono text-emerald-100 opacity-50 truncate">{reading.fhirMappedJson}</p>
                   </div>
                </div>
              )}
           </div>

           {/* Regulatory Arbitrage */}
           <div className="bg-rose-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-rose-600/30 flex flex-col flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <span className="text-7xl font-black italic uppercase">Law</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60">Arbitrage_Sentinel</h3>
              
              <div className="space-y-8 relative z-10 flex-1">
                 <p className="text-sm font-bold italic leading-relaxed">
                   "Neural Core is scraping 42 government gazettes to detect legislative drift. While the giants lobby, we automate compliance."
                 </p>
                 <button 
                  onClick={runRegulatoryScan}
                  className="w-full py-5 bg-white text-rose-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                 >
                   EXECUTE_COMPLIANCE_INTERCEPT
                 </button>

                 <div className="space-y-4">
                    {patches.map(p => (
                      <div key={p.id} className="p-4 bg-black/20 rounded-2xl border border-white/10">
                         <p className="text-[8px] font-black uppercase mb-1">Drift_Detected</p>
                         <p className="text-xs font-bold italic">"{p.newLawReference}"</p>
                         <p className="text-[7px] text-rose-300 mt-2 font-black uppercase">Patch Ready for SOP: {p.affectedSOPs[0]}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MoatBreakerHUD;