
import React, { useState } from 'react';
import { CareRole } from '../../types';
import Translate from '../../components/Translate';
import WorkforceNexus from './WorkforceNexus';
import StaffManager from './StaffManager';
import ComplianceManager from './ComplianceManager';
import HiringHub from './HiringHub';
import RetentionIntelligence from './RetentionIntelligence';
import { MOCK_STAFF } from '../../data/careData';
import { UserRoundSearch, ShieldCheck, GraduationCap, UsersRound, BrainCircuit } from 'lucide-react';

interface Props {
  language: string;
  staffName: string;
}

const HRTerminal: React.FC<Props> = ({ language, staffName }) => {
  const [activeSubTab, setActiveSubTab] = useState<'NEXUS' | 'STAFF' | 'COMPLIANCE' | 'RECRUITMENT' | 'RETENTION'>('NEXUS');

  const tabs = [
    { id: 'NEXUS', label: 'Workforce_Nexus', icon: UserRoundSearch },
    { id: 'STAFF', label: 'Roster_Logic', icon: UsersRound },
    { id: 'COMPLIANCE', label: 'Verification', icon: ShieldCheck },
    { id: 'RECRUITMENT', label: 'Recruitment', icon: GraduationCap },
    { id: 'RETENTION', label: 'Retention', icon: BrainCircuit }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-indigo-400">
               RESOURCE_CORE_TERMINAL
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
            Human Capital Stewardship • {staffName}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSubTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon size={14} />
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] px-4 pb-20">
        {activeSubTab === 'NEXUS' && <WorkforceNexus staff={MOCK_STAFF} language={language} />}
        {activeSubTab === 'STAFF' && <StaffManager language={language} />}
        {activeSubTab === 'COMPLIANCE' && <ComplianceManager language={language} isHR={true} />}
        {activeSubTab === 'RECRUITMENT' && <HiringHub language={language} />}
        {activeSubTab === 'RETENTION' && <RetentionIntelligence staff={MOCK_STAFF} language={language} />}
      </div>
    </div>
  );
};

export default HRTerminal;
