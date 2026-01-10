import React, { useState } from 'react';
import { StaffMember } from '../../types';
import Translate from '../../components/Translate';
import { ShieldCheck, UserRound, ArrowLeft } from 'lucide-react';
import SearchCommand from '../SearchCommand';

interface Props {
  language: string;
}

const StaffManager: React.FC<Props> = ({ language }) => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  if (selectedStaff) {
    return (
      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
        <button 
          onClick={() => setSelectedStaff(null)}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all mb-8"
        >
          <ArrowLeft size={14} /> <Translate target={language}>Back_to_Personnel_Registry</Translate>
        </button>

        <div className="bg-slate-900 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <UserRound size={200} />
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
              <div className="space-y-6">
                 <div>
                    <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-[8px] font-black rounded-lg uppercase tracking-[0.2em] mb-4 inline-block">
                      <Translate target={language}>Authorized_Operative</Translate>
                    </span>
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">{selectedStaff.name}</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4">
                      <Translate target={language}>{String(selectedStaff.role)}</Translate> • <Translate target={language}>{selectedStaff.homeSector}</Translate>
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                       <p className="text-[8px] font-black text-slate-500 uppercase mb-2">
                         <Translate target={language}>Weekly_Load</Translate>
                       </p>
                       <p className="text-2xl font-black text-white italic">{selectedStaff.weeklyHours}h</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                       <p className="text-[8px] font-black text-slate-500 uppercase mb-2">
                         <Translate target={language}>Strikes</Translate>
                       </p>
                       <p className={`text-2xl font-black italic ${selectedStaff.disciplinaryStrikes > 0 ? 'text-rose-500' : 'text-emerald-400'}`}>{selectedStaff.disciplinaryStrikes}</p>
                    </div>
                 </div>
              </div>

              <div className="flex-1 bg-black/40 border border-white/5 p-10 rounded-[3rem] w-full md:max-w-md">
                 <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 italic flex items-center gap-2">
                   <ShieldCheck size={14} className="text-indigo-400" /> <Translate target={language}>Active_Verification</Translate>
                 </h3>
                 <div className="space-y-3">
                    {['CNO Status Verified', 'Vulnerable Sector Valid', 'Vaccination Node Synchronized'].map(check => (
                      <div key={check} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                         <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                           <Translate target={language}>{check}</Translate>
                         </span>
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 h-full pb-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
           <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
             <Translate target={language}>Personnel_Verification_Terminal</Translate>
           </h2>
           <p className="text-sm text-slate-500 font-medium italic">
             <Translate target={language}>Authorized HR Intercept Required to Pull Staff Dossier</Translate>
           </p>
        </div>
        
        <SearchCommand 
          language={language} 
          onSelectStaff={setSelectedStaff} 
          onSelectClient={() => {}} 
        />
      </div>
    </div>
  );
};

export default StaffManager;