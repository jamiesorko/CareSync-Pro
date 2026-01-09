import React, { useState } from 'react';
import { StaffMember } from '../../types';
import Translate from '../../components/Translate';
import SearchCommand from '../SearchCommand';
import WorkforceNexus from './WorkforceNexus';
import { UserRoundSearch, ShieldCheck, GraduationCap, UsersRound, BrainCircuit } from 'lucide-react';

interface Props {
  language: string;
  staffName: string;
  staff: StaffMember[];
}

const HRTerminal: React.FC<Props> = ({ language, staffName, staff }) => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'SEARCH' | 'ANALYSIS'>('SEARCH');

  return (
    <div className="space-y-10 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-indigo-400">
               <Translate target={language}>RESOURCE_SIGMA_NODE</Translate>
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            <Translate target={language}>Human_Capital_Sovereignty</Translate> • {staffName}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <button 
              onClick={() => setActiveSubTab('SEARCH')}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'SEARCH' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate target={language}>Personnel_Search</Translate>
            </button>
            <button 
              onClick={() => setActiveSubTab('ANALYSIS')}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'ANALYSIS' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate target={language}>Regional_Intelligence</Translate>
            </button>
        </div>
      </div>

      <div className="min-h-[600px] px-4 pb-24">
        {activeSubTab === 'SEARCH' ? (
          selectedStaff ? (
             <div className="bg-slate-900 border border-white/10 p-12 rounded-[4rem] animate-in zoom-in duration-500">
                <button onClick={() => setSelectedStaff(null)} className="text-[9px] font-black uppercase text-indigo-400 mb-8 tracking-widest">
                   ← <Translate target={language}>Return_to_Search</Translate>
                </button>
                <div className="flex justify-between items-start">
                   <div>
                      <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">{selectedStaff.name}</h2>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4">
                         <Translate target={language}>Authorized_operative_dossier_accessible</Translate>.
                      </p>
                   </div>
                   <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-2 rounded-xl text-center">
                      <p className="text-[8px] font-black text-emerald-500 uppercase">
                         <Translate target={language}>Weekly_Hours</Translate>
                      </p>
                      <p className="text-2xl font-black text-white italic">{selectedStaff.weeklyHours}h</p>
                   </div>
                </div>
             </div>
          ) : (
            <SearchCommand 
              language={language} 
              onSelectStaff={setSelectedStaff} 
              onSelectClient={() => {}} 
            />
          )
        ) : (
          <WorkforceNexus staff={staff} language={language} />
        )}
      </div>
    </div>
  );
};

export default HRTerminal;