import React, { useState, useEffect } from 'react';
import { fraudDetectionService, FraudAlert } from '../../services/fraudDetectionService';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const FinancialSentinel: React.FC<Props> = ({ language }) => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const runSweep = async () => {
    setLoading(true);
    // Mocked batch data representing impossible visit overlaps or ghost billing patterns
    const mockDataset = [
      { id: 'v-101', staff: 's-92', duration: 120, dist: 45, pattern: 'Impossible Travel' },
      { id: 'v-102', staff: 's-44', duration: 15, dist: 0, pattern: 'Short Duration Complexity' }
    ];
    const results = await fraudDetectionService.scanForAnomalies(mockDataset);
    setAlerts(results);
    setLoading(false);
  };

  useEffect(() => {
    runSweep();
  }, []);

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-rose-500">Fiscal_Sentinel</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Real-Time Fraud Intercept & Impossible Billing Logic Detector</p>
        </div>
        <button 
          onClick={runSweep}
          disabled={loading}
          className="px-10 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-3xl hover:bg-rose-500 transition-all"
        >
          {loading ? 'INTERROGATING_LEDGERS...' : 'EXECUTE_GLOBAL_AUDIT'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px]">
        {/* Alerts Matrix */}
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-12 relative z-10">Anomalous_Signal_Matrix</h3>
           
           <div className="flex-1 space-y-6 relative z-10 overflow-y-auto scrollbar-hide pr-2">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                   <div className="w-16 h-16 border-4 border-rose-500/10 border-t-rose-500 rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.6em] animate-pulse">Analyzing_14,000_Transactions</p>
                </div>
              ) : alerts.length > 0 ? (
                alerts.map((alert, i) => (
                  <div key={i} className="p-8 bg-rose-600/5 border border-rose-500/20 rounded-3xl group hover:bg-rose-600/10 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                     <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                           <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${alert.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-600/20 text-amber-500'}`}>{alert.severity}</span>
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vector: {alert.actorId}</span>
                        </div>
                        <h4 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">{alert.type.replace('_', ' ')}</h4>
                        <p className="text-xs text-slate-400 mt-4 italic font-medium">"{alert.description}"</p>
                     </div>
                     <div className="flex gap-4 shrink-0">
                        <button className="px-6 py-2 bg-white text-black rounded-xl text-[9px] font-black uppercase shadow-xl">Audit_Logs</button>
                        <button className="px-6 py-2 bg-rose-600 text-white rounded-xl text-[9px] font-black uppercase hover:bg-rose-500 transition-all shadow-xl">Flag_Entry</button>
                     </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-center opacity-20 italic">
                   <p className="text-sm font-bold text-white uppercase tracking-widest leading-relaxed">No high-probability financial anomalies detected in current cycle.</p>
                </div>
              )}
           </div>
        </div>

        {/* Global Strategy Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-rose-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-rose-600/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <span className="text-7xl font-black italic">STOP</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60">Revenue_Guard_Directive</h3>
              <div className="space-y-8 relative z-10">
                 <p className="text-base font-bold italic leading-relaxed">
                   "Neural Intercept identifies a recurring 4% leakage in Sector 4 mileage claims. GPS drift indicates padding at 8:00 AM nodes. Initiating automated payroll hold for review."
                 </p>
                 <div className="p-6 bg-white/10 rounded-2xl border border-white/10 text-center">
                    <p className="text-[8px] font-black uppercase mb-4 opacity-60">Estimated Reclaimed Capital</p>
                    <p className="text-5xl font-black italic tracking-tighter">$1,240<span className="text-xs ml-1 opacity-50 font-normal">CAD</span></p>
                 </div>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex-1 backdrop-blur-3xl overflow-hidden flex flex-col">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10 italic">Integrity_Pulse_Log</p>
              <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pr-2">
                 {[
                   { label: 'Ghost Billing Probability', val: 'Minimal', color: 'text-emerald-400' },
                   { label: 'GPS Precision Match', val: '99.8%', color: 'text-sky-400' },
                   { label: 'Unbilled complex kit gap', val: '$840.00', color: 'text-amber-500' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
                      <span className={`text-[11px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
                 
                 <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[8px] font-black text-slate-600 uppercase mb-4 tracking-widest">Forensic_Auditor_Note</p>
                    <p className="text-[10px] text-slate-300 italic leading-relaxed">
                      "Cross-referencing Scribe audio with billed supplies. Detected 'Wound Dressing kit' usage mentioned verbally but missing from invoice line items."
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default FinancialSentinel;