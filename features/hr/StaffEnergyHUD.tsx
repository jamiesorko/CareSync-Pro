import React, { useState, useEffect } from 'react';
import { staffEnergyService, BurnoutPrediction } from '../../services/staffEnergyService';
import { StaffMember } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
  staff: StaffMember[];
}

const StaffEnergyHUD: React.FC<Props> = ({ language, staff }) => {
  const [predictions, setPredictions] = useState<BurnoutPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        staff.slice(0, 5).map(s => staffEnergyService.calculateBurnoutRisk(s, "Staff feeling slightly overwhelmed with the new Sector 4 volume."))
      );
      setPredictions(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { runAnalysis(); }, [staff]);

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-sky-400">Staff_Energy_Sentinel</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Neural Burnout Prediction & Turnover Horizon Mapping</p>
        </div>
        <button 
          onClick={runAnalysis}
          className="px-10 py-4 bg-sky-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          {loading ? 'WEIGHING_EMOTIONAL_VECTORS...' : 'RE-SYNC_ENERGY_LEDGER'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10 relative z-10">Resignation_Risk_Matrix</h3>
           
           <div className="flex-1 space-y-6 relative z-10 overflow-y-auto scrollbar-hide pr-2">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                   <div className="w-16 h-16 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest animate-pulse">Correlating_Vocal_Fatigue</p>
                </div>
              ) : (
                predictions.map((p, i) => {
                  const sMember = staff.find(s => s.id === p.staffId);
                  return (
                    <div key={i} className={`p-8 rounded-[2.5rem] border transition-all ${p.riskScore > 60 ? 'bg-rose-600/10 border-rose-500/50' : 'bg-white/[0.03] border-white/5'}`}>
                       <div className="flex justify-between items-start mb-8">
                          <div>
                             <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{sMember?.name}</h4>
                             <p className="text-[9px] font-bold text-slate-600 uppercase mt-2">{sMember?.role}</p>
                          </div>
                          <div className="text-right">
                             <p className={`text-4xl font-black italic tracking-tighter ${p.riskScore > 60 ? 'text-rose-500' : 'text-emerald-400'}`}>{p.riskScore}%</p>
                             <p className="text-[7px] font-black text-slate-500 uppercase mt-1">Burnout probability</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-[9px] font-bold text-slate-500 uppercase">Vocal Fatigue</span>
                                <span className={`text-[9px] font-black uppercase ${p.vocalFatigueDetected ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                                  {p.vocalFatigueDetected ? 'DETECTED' : 'NOMINAL'}
                                </span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-[9px] font-bold text-slate-500 uppercase">Retention Horizon</span>
                                <span className="text-[9px] font-black text-white uppercase italic">{p.horizonDays} Days</span>
                             </div>
                          </div>
                          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
                             <p className="text-[8px] font-black text-sky-400 uppercase mb-3 italic">Autonomous_ manuever</p>
                             <p className="text-xs text-slate-300 font-medium italic">"{p.recommendation}"</p>
                             <button className="w-full mt-4 py-2 bg-white text-black rounded-lg font-black text-[8px] uppercase tracking-widest shadow-xl">Apply_Incentive</button>
                          </div>
                       </div>
                    </div>
                  );
                })
              )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-sky-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="text-7xl font-black italic uppercase">BND</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">Fleet_Cohesion_Index</h3>
              <div className="space-y-10 relative z-10 flex-1">
                 <div className="flex items-baseline gap-2">
                    <p className="text-9xl font-black italic tracking-tighter">84</p>
                    <span className="text-xs font-black opacity-50 uppercase">Safety_Floor</span>
                 </div>
                 <p className="text-sm font-bold italic leading-relaxed">
                   "Neural sentiment across Sector 4 indicates a 14% rise in empathetic fatigue. Recommending mandatory 1-hour administrative relief blocks for all PSW nodes."
                 </p>
                 <button 
                  onClick={() => alert("SIGNAL_LOCKED: Administrative buffer published to coordination grid.")}
                  className="w-full py-5 bg-white text-sky-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                 >
                   EXECUTE_RELIEF_PROTOCOL
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StaffEnergyHUD;