
import React, { useState } from 'react';
import { CareRole } from '../types';
import { Translate } from '../components/Translate';
import HiringHub from './hr/HiringHub';
import ComplianceManager from './hr/ComplianceManager';
import CapacityPlanner from './hr/CapacityPlanner';
import StaffManager from './hr/StaffManager';
import WorkforceNexus from './hr/WorkforceNexus';
import RetentionIntelligence from './hr/RetentionIntelligence';
import { MOCK_STAFF } from '../data/careData';

interface Props {
  role: CareRole;
  language: string;
}

const HRPortal: React.FC<Props> = ({ role, language }) => {
  const [activeTab, setActiveTab] = useState<'NEXUS' | 'HIRING' | 'COMPLIANCE' | 'STAFF' | 'RETENTION'>('NEXUS');
  const isHR = [CareRole.HR_SPECIALIST, CareRole.CEO, CareRole.COO].includes(role);

  const tabs = [
    { id: 'NEXUS', label: 'Workforce_Nexus' },
    { id: 'STAFF', label: 'Staff_Mastery' },
    { id: 'COMPLIANCE', label: 'Compliance_Sentinel' },
    { id: 'RETENTION', label: 'Retention_Intel' },
  ];

  const adminTabs = [
    { id: 'HIRING', label: 'Recruitment' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 px-4">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic text-indigo-400">
             <Translate target={language}>RESOURCE_CORE</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">
             <Translate target={language}>Institutional_Human_Capital_Oversight</Translate>
          </p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide shadow-xl">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate target={language}>{tab.label}</Translate>
            </button>
          ))}
          {isHR && adminTabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate target={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-500 px-4">
        {activeTab === 'NEXUS' && <WorkforceNexus staff={MOCK_STAFF} language={language} />}
        {activeTab === 'STAFF' && <StaffManager language={language} />}
        {activeTab === 'COMPLIANCE' && <ComplianceManager language={language} isHR={isHR} />}
        {activeTab === 'HIRING' && <HiringHub language={language} />}
        {activeTab === 'RETENTION' && <RetentionIntelligence staff={MOCK_STAFF} language={language} />}
      </div>
    </div>
  );
};

export default HRPortal;
