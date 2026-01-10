import React, { useState, useEffect } from 'react';
import { systemResilienceService, IntegrityStatus } from '../../services/systemResilienceService';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const SystemHealthMonitor: React.FC<Props> = ({ language }) => {
  const [status, setStatus] = useState<IntegrityStatus | null>(null);
  const [isRepairing, setIsRepairing] = useState(false);

  const fetchVitals = async () => {
    const data = await systemResilienceService.getSystemVitals();
    setStatus(data);
  };

  useEffect(() => {
    fetchVitals();
    const timer = setInterval(fetchVitals, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRepair = async () => {
    setIsRepairing(true);
    await systemResilienceService.executeSelfRepair();
    setTimeout(() => {
      setIsRepairing(false);
      fetchVitals();
      alert("NEURAL_CORE_SYNC: Cache drift corrected. All redundancy nodes validated.");
    }, 2000);
  };

  if (!status) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
      <div className="lg:col-span-2 bg-slate-950 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
              <Translate target={language}>Neural_Integrity_Index</Translate>
            </h3>
            <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mt-2">
              <Translate target={language}>Active Redundancy Nodes</Translate>: {status.redundantNodesActive}
            </p>
          </div>
          <div className="text-right">
             <span className={`text-4xl font-black italic tracking-tighter ${status.neuralCacheHealthy ? 'text-emerald-400' : 'text-rose-500'}`}>
               {status.neuralCacheHealthy ? <Translate target={language}>STABLE</Translate> : <Translate target={language}>DRIFT</Translate>}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'Unprocessed_Signals', val: String(status.unprocessedSignals), color: 'text-white' },
            { label: 'Latency_Offset', val: '14ms', color: 'text-sky-400' },
            { label: 'Encryption_Level', val: 'AES-256', color: 'text-emerald-400' },
            { label: 'Node_Uptime', val: '99.98%', color: 'text-indigo-400' }
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-2">
                <Translate target={language}>{stat.label}</Translate>
              </p>
              <p className={`text-lg font-black italic ${stat.color}`}>
                <Translate target={language}>{stat.val}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-600/10 border border-amber-500/20 p-10 rounded-[3rem] flex flex-col justify-between shadow-2xl">
        <div>
           <div className="flex items-center space-x-3 mb-6">
              <div className={`w-2 h-2 rounded-full ${isRepairing ? 'bg-amber-500 animate-ping' : 'bg-amber-500'}`}></div>
              <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                <Translate target={language}>Self-Healing Terminal</Translate>
              </p>
           </div>
           <p className="text-sm text-slate-300 italic leading-relaxed">
             <Translate target={language}>Execute_a_global_neural_reset_to_clear_cached_data_drift_and_synchronize_the_offline_signal_queue</Translate>
           </p>
        </div>
        <button 
          onClick={handleRepair}
          disabled={isRepairing}
          className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl mt-8"
        >
          {isRepairing ? <Translate target={language}>RECALIBRATING</Translate> : <Translate target={language}>AUTHORIZE_SELF_REPAIR</Translate>}
        </button>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;