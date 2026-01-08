
import React, { useState, useEffect } from 'react';
import { shiftStabilityService, StabilityPrediction } from '../../services/shiftStabilityService';
import { MOCK_STAFF } from '../../data/careData';
/* Changed default import to named import for Translate */
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const StabilityGrid: React.FC<Props> = ({ language }) => {
  const [predictions, setPredictions] = useState<StabilityPrediction[]>([]);

  useEffect(() => {
    const runPredictions = async () => {
      // Simulate predictions for a batch of staff
      const results = await Promise.all(
        MOCK_STAFF.slice(5).map(s => shiftStabilityService.predictStability(s, `shift-${s.id}`))
      );
      setPredictions(results);
    };
    runPredictions();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Shift_Reliability_Grid</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Predictive Burnout & Availability Simulation</p>
        </div>
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[9px] font-black text-emerald-500 uppercase">Secure</span>
           </div>
           <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div>
              <span className="text-[9px] font-black text-rose-500 uppercase">Critical</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((p, i) => {
          const staff = MOCK_STAFF.find(s => `shift-${s.id}` === p.shiftId);
          if (!staff) return null;

          return (
            <div key={i} className={`p-8 rounded-[2.5rem] border transition-all hover:bg-white/5 ${
              p.reliabilityScore < 70 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/[0.03] border-white/5'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">{staff.name}</h4>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">{staff.role}</p>
                </div>
                <div className={`text-xl font-black italic ${p.reliabilityScore < 70 ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {p.reliabilityScore}%
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${p.reliabilityScore < 70 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${p.reliabilityScore}%` }}
                  ></div>
                </div>
                
                {p.riskReason && (
                  <p className="text-[9px] text-rose-400 italic font-bold uppercase">
                    {/* Standardized Translate prop to target */}
                    Risk: <Translate target={language}>{p.riskReason}</Translate>
                  </p>
                )}

                {p.shouldShadowBook && (
                  <button className="w-full mt-4 py-3 bg-rose-600 text-white rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                    Initiate Shadow Booking
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StabilityGrid;
