import React, { useState } from 'react';
import { CareRole } from '../../types';
import Translate from '../../components/Translate';
import HiringHub from './HiringHub';
import ComplianceManager from './ComplianceManager';
import CapacityPlanner from './CapacityPlanner';
import StaffManager from './StaffManager';
import WorkforceNexus from './WorkforceNexus';
import RetentionIntelligence from './RetentionIntelligence';
import TalentSourcingNode from './TalentSourcingNode';
import { MOCK_STAFF } from '../../data/careData';

interface Props {
  role: CareRole;
  language: string;
}

const HRPortal: React.FC<Props> = ({ role, language }) => {
  const [activeTab, setActiveTab] = useState<'HIRING' | 'COMPLIANCE' | 'CAPACITY' | 'STAFF' | 'NEXUS' | 'RETENTION' | 'SOURCING'>('NEXUS');
  const isHR = role === CareRole.HR_SPECIALIST || role === CareRole.CEO;

  const tabs = [
    { id: 'NEXUS', label: 'Workforce Nexus' },
    { id: 'RETENTION', label: 'Talent Intel' },
    { id: 'SOURCING', label: 'Sourcing' },
    { id: 'COMPLIANCE', label: 'Compliance' },
  ];

  const adminTabs = [
    { id: 'HIRING', label: 'Hiring' },
    { id: 'STAFF', label: 'Personnel' },
    { id: 'CAPACITY', label: 'Capacity' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Resource Core</h2>
          <p className="text-sm text-slate-500">Institutional capital and human performance</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-white/5 overflow-x-auto scrollbar-hide shadow-sm">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
          {isHR && adminTabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'NEXUS' && <WorkforceNexus staff={MOCK_STAFF} language={language} />}
        {activeTab === 'RETENTION' && <RetentionIntelligence staff={MOCK_STAFF} language={language} />}
        {activeTab === 'SOURCING' && <TalentSourcingNode language={language} />}
        {activeTab === 'COMPLIANCE' && <ComplianceManager language={language} isHR={isHR} />}
        {activeTab === 'HIRING' && isHR && <HiringHub language={language} />}
        {activeTab === 'STAFF' && isHR && <StaffManager language={language} />}
        {activeTab === 'CAPACITY' && isHR && <CapacityPlanner language={language} />}
      </div>
    </div>
  );
};

export default HRPortal;