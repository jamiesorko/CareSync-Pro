
import React, { useState, useEffect } from 'react';
import { StaffMember } from '../../types';
import Translate from '../../components/Translate';
import { workforceResilienceService, MentorshipPairing } from '../../services/workforceResilienceService';

interface Props {
  staff: StaffMember[];
  language: string;
}

const WorkforceNexus: React.FC<Props> = ({ staff, language }) => {
  const [pairings, setPairings] = useState<MentorshipPairing[]>([]);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    const results = await workforceResilienceService.calculateSynergy(staff);
    setPairings(results);
    setLoading(false);
  };

  useEffect(() => {
    runAnalysis();
  }, [staff]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">
            <Translate targetLanguage={language}>Workforce_Nexus</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
            <Translate targetLanguage={language}>Neural Synergy & Resilience Mapping</Translate>
          </p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Translate targetLanguage={language}>{loading ? 'CALIBRATING...' : 'SYNC_PAIRINGS'}</Translate>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">
        <div className="lg:col-span-12 bg-slate-950 border border-white/10 rounded-[4rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide pr-2 relative z-10">
              {pairings.length > 0 ? pairings.map((p, i) => {
                const mentor = staff.find(s => s.id === p.mentorId);
                const mentee = staff.find(s => s.id === p.menteeId);
                return (
                  <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/5 transition-all animate-in slide-in-from-bottom-4">
                     <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-black text-white italic">M</div>
                           <div>
                              <p className="text-sm font-black text-white uppercase italic">{mentor?.name || 'Lead Node'}</p>
                              <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                                <Translate targetLanguage={language}>Master Lead</Translate>
                              </p>
                           </div>
                        </div>
                        <div className="w-8 h-px bg-white/10"></div>
                        <div className="flex items-center space-x-4 text-right">
                           <div>
                              <p className="text-sm font-black text-white uppercase italic">{mentee?.name || 'Field Node'}</p>
                              <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                                <Translate targetLanguage={language}>Clinical Operative</Translate>
                              </p>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] font-black text-white italic">O</div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">
                             <Translate targetLanguage={language}>Focus</Translate>: <Translate targetLanguage={language}>{p.focusArea}</Translate>
                           </p>
                           <p className="text-[11px] text-slate-400 italic font-medium leading-relaxed max-w-md">
                             "<Translate targetLanguage={language}>{p.reason}</Translate>"
                           </p>
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-black text-indigo-400 italic">{p.synergyScore}%</p>
                           <p className="text-[7px] font-black text-slate-600 uppercase">
                             <Translate targetLanguage={language}>Match Score</Translate>
                           </p>
                        </div>
                     </div>
                  </div>
                );
              }) : (
                <div className="h-full flex items-center justify-center opacity-30 italic uppercase text-xs tracking-widest">
                  <Translate targetLanguage={language}>Awaiting Neural Link Calibration...</Translate>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default WorkforceNexus;
