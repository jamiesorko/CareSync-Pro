
import React, { useState } from 'react';
import Translate from '../../components/Translate';
import DailyEfficiencyGauges from './DailyEfficiencyGauges';
import ThroughputPulse from './ThroughputPulse';
import StabilityGrid from './StabilityGrid';

interface Props {
  language: string;
}

const OperationsMatrix: React.FC<Props> = ({ language }) => {
  const [activeLayer, setActiveLayer] = useState<'OVERVIEW' | 'RELIABILITY' | 'COMPLIANCE'>('OVERVIEW');

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-cyan-400">Operations_Matrix</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Daily_Efficiency_Gauges & Strategic Operational Insight</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shadow-sm">
          {['OVERVIEW', 'RELIABILITY', 'COMPLIANCE'].map(layer => (
            <button 
              key={layer}
              onClick={() => setActiveLayer(layer as any)}
              className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/30' : 'text-slate-500 hover:text-white'}`}
            >
              {/* Fix: Changed targetLanguage to target to match components/Translate.tsx props */}
              <Translate target={language}>{layer}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeLayer === 'OVERVIEW' && (
            <div className="space-y-12">
                <DailyEfficiencyGauges />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                     <ThroughputPulse language={language} />
                  </div>
                  <div className="lg:col-span-4 bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl shadow-3xl flex flex-col justify-between group">
                    <div className="relative z-10">
                       <h4 className="text-xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">Strategic_Operational_Insight</h4>
                       <p className="text-sm text-slate-300 font-medium italic leading-relaxed">
                         "Neural Analysis identifies an 8% throughput bottleneck in Sector 4 during shift-swap windows. Recommend autonomous re-balancing of the redundancy pool."
                       </p>
                    </div>
                    <div className="mt-12 space-y-4 relative z-10">
                       <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Dispatch Precision</span>
                          <span className="text-[10px] font-black text-emerald-400">99.8%</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Sector Drift</span>
                          <span className="text-[10px] font-black text-amber-500">LOW</span>
                       </div>
                       <button className="w-full py-4 mt-6 bg-cyan-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl">Model_Re-Balance</button>
                    </div>
                  </div>
                </div>
            </div>
        )}
        {activeLayer === 'RELIABILITY' && <StabilityGrid language={language} />}
        {activeLayer === 'COMPLIANCE' && (
          <div className="bg-slate-950 border border-white/10 rounded-[4rem] p-24 text-center relative overflow-hidden shadow-3xl">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
             <p className="text-xl font-black text-white uppercase tracking-[0.3em] italic">Regulatory_Telemetry_Syncing...</p>
             <p className="text-xs font-bold text-slate-600 uppercase mt-4">Consulting Legislative Sentinel for drift updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationsMatrix;
