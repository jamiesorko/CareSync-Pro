import React, { useState, useEffect } from 'react';
import { StaffMember, Client } from '../../types';
import { rapportAnalyticsService, RapportPulse } from '../../services/rapportAnalyticsService';

interface Props {
  language: string;
  staff: StaffMember[];
  clients: Client[];
}

const RapportMatrixHUD: React.FC<Props> = ({ language, staff, clients }) => {
  const [pulse, setPulse] = useState<RapportPulse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(staff[7]?.id || ''); // Elena R.

  const runAnalysis = async () => {
    setLoading(true);
    const sMember = staff.find(s => s.id === selectedStaffId);
    const client = clients[0];
    if (!sMember || !client) return;

    const mockLogs = [
      "Patient requested Elena specifically for the morning bath.",
      "Laughter heard in common areas during Hoyer transfer.",
      "Elena spent extra 10 mins reading the news to Robert."
    ];

    try {
      const result = await rapportAnalyticsService.computeRapport(sMember, client, mockLogs);
      setPulse(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    runAnalysis();
  }, [selectedStaffId]);

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-sky-400">Rapport_Matrix</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Neural Circle-of-Care Cohesion Telemetry</p>
        </div>
        <select 
          value={selectedStaffId}
          onChange={(e) => setSelectedStaffId(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-[10px] font-black uppercase text-slate-200 outline-none"
        >
          {staff.filter(s => s.role.includes('PSW')).map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[550px]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest animate-pulse">Analyzing_Interpersonal_Vectors</p>
             </div>
           ) : pulse && (
             <div className="space-y-12 relative z-10 animate-in zoom-in">
                <div className="flex justify-center">
                   <div className={`w-64 h-64 rounded-full border-4 flex items-center justify-center transition-all ${pulse.score > 80 ? 'border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.2)]' : 'border-rose-500 shadow-[0_0_80px_rgba(244,63,94,0.2)]'}`}>
                      <div className="text-center">
                         <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Rapport Index</p>
                         <p className="text-8xl font-black italic tracking-tighter text-white">{pulse.score}%</p>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-4 tracking-widest">Dominant_Atmosphere</p>
                      <p className="text-xl font-black italic text-sky-400 uppercase tracking-tighter">{pulse.dominantEmotion}</p>
                   </div>
                   <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-4 tracking-widest">Clash Probability</p>
                      <p className={`text-xl font-black italic tracking-tighter uppercase ${pulse.isClashRisk ? 'text-rose-500' : 'text-emerald-400'}`}>
                        {pulse.isClashRisk ? 'ELEVATED' : 'NOMINAL'}
                      </p>
                   </div>
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 bg-sky-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col group">
           <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">Strategic_Retention_Insight</h3>
           <div className="space-y-8 relative z-10">
              <p className="text-lg font-bold italic leading-relaxed">
                "{pulse?.strategicInsight || "Correlating relationship vectors..."}"
              </p>
              <button 
               onClick={() => alert("SIGNAL_LOCKED: Match score committed to Global Roster. Roster stabilization protocol active.")}
               className="w-full py-5 bg-white text-sky-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                AUTHORIZE_MATCH_LOCK
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RapportMatrixHUD;