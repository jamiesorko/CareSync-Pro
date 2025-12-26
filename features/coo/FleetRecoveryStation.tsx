import React, { useState, useEffect } from 'react';
import { Client, StaffMember, RecoveryVector } from '../../types';
import { fleetRecoveryService } from '../../services/fleetRecoveryService';
import Translate from '../../components/Translate';

interface Props {
  language: string;
  clients: Client[];
  staff: StaffMember[];
}

const FleetRecoveryStation: React.FC<Props> = ({ language, clients, staff }) => {
  const [recovery, setRecovery] = useState<RecoveryVector | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeFailure, setActiveFailure] = useState<StaffMember | null>(null);

  const initiateRecovery = async (failedStaff: StaffMember) => {
    setLoading(true);
    setActiveFailure(failedStaff);
    
    // Pool for potential rescuers
    const rescuerPool = staff.filter(s => s.id !== failedStaff.id && s.status === 'ONLINE');
    
    try {
      const result = await fleetRecoveryService.computeRecoveryVector(
        failedStaff, 
        "Scarborough, Ontario", 
        rescuerPool
      );
      setRecovery(result);
    } catch (e) {
      alert("Recovery Intercept Drift. Signal lost in sector grid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-rose-500">Fleet_Recovery_Station</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3">Autonomous Emergency Intercept & Mobile Asset Restoration</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
           <div className="px-6 py-2 text-center">
              <p className="text-[8px] font-black text-slate-500 uppercase">Sector Status</p>
              <p className="text-lg font-black text-emerald-400 italic">NOMINAL</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Active Failures Queue */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl flex flex-col flex-1">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-10 italic">Incapacitated_Asset_Inbound</h3>
              <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide pr-2">
                 {staff.filter(s => s.role.includes('PSW') || s.role.includes('RN')).slice(0, 3).map((s, i) => (
                   <div 
                    key={s.id} 
                    onClick={() => initiateRecovery(s)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer group ${activeFailure?.id === s.id ? 'bg-rose-600/20 border-rose-500 shadow-xl' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}`}
                   >
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{s.name}</h4>
                            <p className="text-[9px] text-slate-600 font-bold uppercase">{s.role}</p>
                         </div>
                         <span className="text-[8px] font-black text-rose-500 uppercase bg-rose-500/10 px-2 py-0.5 rounded">FAILURE_REPORTED</span>
                      </div>
                      <div className="mt-6 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                         <span className="text-[8px] font-black text-sky-400 uppercase">Calculate Recovery</span>
                         <span className="text-xs">→</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Sector_Impedance</p>
              <div className="space-y-4">
                 {[
                   { label: 'Traffic Density', val: 'Heavy', color: 'text-amber-500' },
                   { label: 'Weather Delay', val: 'None', color: 'text-emerald-400' },
                   { label: 'Avg Intercept', val: '22m', color: 'text-sky-400' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</span>
                      <span className={`text-[10px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Recovery Matrix */}
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {!recovery && !loading ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                <span className="text-9xl mb-8">🚐</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Awaiting Recovery Trigger</h3>
                <p className="text-sm font-bold text-slate-500 mt-4 max-w-sm">Select a failed asset from the queue to run emergency neural re-routing.</p>
             </div>
           ) : loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="w-24 h-24 border-4 border-rose-500/10 border-t-rose-500 rounded-full animate-spin shadow-[0_0_50px_rgba(244,63,94,0.2)]"></div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.8em] animate-pulse">Calculating_Intercept_Vectors</p>
             </div>
           ) : recovery && (
             <div className="flex-1 flex flex-col relative z-10 animate-in zoom-in duration-700">
                <div className="flex justify-between items-start mb-16">
                   <div>
                      <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Intercept_Protocol: {recovery.failureType}</h3>
                      <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-4 italic">Active Recovery Link: {recovery.staffName}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black text-slate-500 uppercase">Rescue ETA</p>
                      <p className="text-5xl font-black text-emerald-400 italic tracking-tighter">{recovery.rescueEtaMinutes}<span className="text-xs ml-2 text-slate-700">MIN</span></p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                   <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] group">
                      <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-6 italic">Grounded_Repair_Node</p>
                      <p className="text-xl font-bold text-white leading-relaxed italic uppercase tracking-tighter">"{recovery.nearestRepairShop}"</p>
                      <button className="mt-8 text-[8px] font-black text-slate-600 uppercase hover:text-white transition-all">Direct_Towing_Dispatch →</button>
                   </div>
                   <div className="p-10 bg-indigo-600/10 border border-indigo-500/30 rounded-[3rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                         <span className="text-6xl font-black italic">WIN</span>
                      </div>
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-6 italic">Rescuer_Intercept_Assigned</p>
                      <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">{recovery.reassignedStaffName}</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase">Position: 4.2km from target</p>
                   </div>
                </div>

                <div className="flex-1 bg-black/40 border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col group">
                   <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
                   <div className="flex items-center space-x-4 mb-8">
                      <div className="w-1.5 h-10 bg-rose-600 rounded-full group-hover:animate-ping"></div>
                      <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Recovery_Strategic_Directive</h4>
                   </div>
                   <div className="flex-1 space-y-6">
                      <p className="text-base text-slate-200 leading-relaxed font-medium italic">
                        "Emergency re-routing authorized for {recovery.reassignedStaffName}. Predicted continuity drift for original visits: &lt;18m. Towing node confirmed for failed unit."
                      </p>
                      <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                         <div className="text-center">
                            <p className="text-[7px] font-black text-slate-600 uppercase mb-1">Impact Level</p>
                            <span className="text-[10px] font-black text-amber-500 uppercase">MODERATE</span>
                         </div>
                         <div className="text-center border-x border-white/5">
                            <p className="text-[7px] font-black text-slate-600 uppercase mb-1">Signal Lock</p>
                            <span className="text-[10px] font-black text-emerald-500 uppercase">YES</span>
                         </div>
                         <div className="text-center">
                            <p className="text-[7px] font-black text-slate-600 uppercase mb-1">Manual Override</p>
                            <span className="text-[10px] font-black text-rose-500 uppercase">NO</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button 
                    onClick={() => alert("SIGNAL_LOCKED: Emergency recovery protocol initialized. Field staff re-routed. Client families notified.")}
                    className="flex-[2] py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                   >
                     AUTHORIZE_RECOVERY_VECTORS
                   </button>
                   <button className="flex-1 py-6 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
                     Log_Incident_Report
                   </button>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default FleetRecoveryStation;