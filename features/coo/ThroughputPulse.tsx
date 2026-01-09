
import React, { useState, useEffect } from 'react';
import { logisticsThroughputService, ThroughputMetric } from '../../services/logisticsThroughputService';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const ThroughputPulse: React.FC<Props> = ({ language }) => {
  const [metric, setMetric] = useState<ThroughputMetric | null>(null);

  useEffect(() => {
    const fetchMetric = async () => {
      const data = await logisticsThroughputService.getOfficeHealth();
      setMetric(data);
    };
    fetchMetric();
    const timer = setInterval(fetchMetric, 10000);
    return () => clearInterval(timer);
  }, []);

  if (!metric) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl animate-in fade-in duration-700">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
            <Translate target={language}>Operational_Throughput_Pulse</Translate>
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
            <Translate target={language}>Office_Coordination_Audit_Latency_Telemetry</Translate>
          </p>
        </div>
        <div className="px-6 py-2 bg-cyan-600/20 border border-cyan-500/30 rounded-xl">
           <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">
             <Translate target={language}>Active_Bottleneck_Check</Translate>
           </p>
           <p className="text-xs font-black text-white uppercase italic">
             <Translate target={language}>{metric.bottleneckDetected ? 'ALARM_ACTIVE' : 'VELOCITY_OPTIMAL'}</Translate>
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
           <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem]">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
                <Translate target={language}>Validation_Delay_AVG</Translate>
              </p>
              <div className="flex items-baseline space-x-2">
                 <p className="text-6xl font-black text-white tracking-tighter">{metric.avgResolutionTimeMinutes}</p>
                 <span className="text-xs text-slate-600 uppercase font-black tracking-widest">
                   <Translate target={language}>Minutes</Translate>
                 </span>
              </div>
              <div className="mt-8 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className={`h-full transition-all duration-1000 ${metric.avgResolutionTimeMinutes > 100 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: '65%' }}></div>
              </div>
           </div>

           <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem]">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
                <Translate target={language}>Audit_Queue_Depth</Translate>
              </p>
              <div className="flex items-baseline space-x-2">
                 <p className="text-6xl font-black text-cyan-400 tracking-tighter">{metric.pendingAuditsCount}</p>
                 <span className="text-xs text-slate-600 uppercase font-black tracking-widest">
                   <Translate target={language}>Visits</Translate>
                 </span>
              </div>
           </div>
        </div>

        <div className="bg-cyan-600/10 border border-cyan-500/20 p-10 rounded-[3.5rem] flex flex-col justify-between">
           <div>
              <div className="flex items-center space-x-3 mb-8">
                 <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                 <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                   <Translate target={language}>Autonomous_Resource_Directive</Translate>
                 </h4>
              </div>
              
              {metric.bottleneckDetected ? (
                <div className="space-y-6">
                  <p className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    <Translate target={language}>Saturation_detected_in</Translate> <Translate target={language}>{metric.sectorFocusRequired || 'General_Sector'}</Translate>.
                  </p>
                  <p className="text-sm text-slate-400 font-medium italic">
                    <Translate target={language}>Queue_depth_exceeds_threshold_Initiating_temporary_redistribution_of_office_specialists</Translate>
                  </p>
                  <button 
                    onClick={() => logisticsThroughputService.triggerEmergencyRelocation('Ops', 'Audit')}
                    className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
                  >
                    <Translate target={language}>Execute_Resource_Relocation</Translate>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xl font-black text-emerald-400 uppercase italic tracking-tighter leading-tight">
                    <Translate target={language}>Fleet_coordination_operating_at_peak_velocity</Translate>
                  </p>
                  <p className="text-sm text-slate-400 font-medium italic">
                    <Translate target={language}>No_corrective_operational_maneuvers_required_at_this_timestamp_Systems_nominal</Translate>
                  </p>
                </div>
              )}
           </div>
           
           <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                <Translate target={language}>Target_Resolution_Objective</Translate>: &lt;45m
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ThroughputPulse;
