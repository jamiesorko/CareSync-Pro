
import React, { useState } from 'react';
import { CareRole } from '../../types';
import Translate from '../../components/Translate';
import HiringHub from './HiringHub';
import ComplianceManager from './ComplianceManager';
import CapacityPlanner from './CapacityPlanner';
import WorkforceNexus from './WorkforceNexus';
import RetentionIntelligence from './RetentionIntelligence';
import { MOCK_STAFF } from '../../data/careData';

interface Props {
  role: CareRole;
  language: string;
}

const HRPortal: React.FC<Props> = ({ role, language }) => {
  const [activeTab, setActiveTab] = useState<'NEXUS' | 'HIRING' | 'COMPLIANCE' | 'CAPACITY' | 'RETENTION'>('NEXUS');
  const isHR = role === CareRole.HR_SPECIALIST || role === CareRole.CEO;

  const tabs = [
    { id: 'NEXUS', label: 'Workforce Nexus' },
    { id: 'RETENTION', label: 'Retention Intel' },
    { id: 'COMPLIANCE', label: 'Compliance' },
  ];

  const adminTabs = [
    { id: 'HIRING', label: 'Recruitment' },
    { id: 'CAPACITY', label: 'Acuity Planning' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Resource_Core</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Institutional human capital & clinical mastery oversight</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-hide shadow-sm">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
          {isHR && adminTabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] bg-slate-900/50 border border-white/5 rounded-[4rem] p-10 backdrop-blur-3xl overflow-hidden shadow-2xl">
        {activeTab === 'NEXUS' && <WorkforceNexus staff={MOCK_STAFF} language={language} />}
        {activeTab === 'RETENTION' && <RetentionIntelligence staff={MOCK_STAFF} language={language} />}
        {activeTab === 'COMPLIANCE' && <ComplianceManager language={language} isHR={isHR} />}
        {activeTab === 'HIRING' && isHR && <HiringHub language={language} />}
        {activeTab === 'CAPACITY' && isHR && <CapacityPlanner language={language} />}
      </div>
    </div>
  );
};

export default HRPortal;
