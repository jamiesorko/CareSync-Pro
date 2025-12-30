
import React, { useState } from 'react';
import { CareRole } from '../../types';
import Translate from '../../components/Translate';
import HiringHub from './HiringHub';
import ComplianceManager from './ComplianceManager';
import CapacityPlanner from './CapacityPlanner';
import StaffManager from './StaffManager';
import WorkforceNexus from './WorkforceNexus';
import RetentionIntelligence from './RetentionIntelligence';
import PayrollSystem from '../accounting/PayrollSystem';

interface Props {
  role: CareRole;
  language: string;
}

const HRPortal: React.FC<Props> = ({ role, language }) => {
  const [activeTab, setActiveTab] = useState<'NEXUS' | 'HIRING' | 'COMPLIANCE' | 'CAPACITY' | 'STAFF' | 'PAYROLL'>('NEXUS');
  const isHR = role === CareRole.HR_SPECIALIST || role === CareRole.CEO;

  const tabs = [
    { id: 'NEXUS', label: 'Workforce Nexus' },
    { id: 'STAFF', label: 'Staff Mastery' },
    { id: 'COMPLIANCE', label: 'Compliance' },
    { id: 'PAYROLL', label: 'Financials' },
  ];

  const adminTabs = [
    { id: 'HIRING', label: 'Recruitment' },
    { id: 'CAPACITY', label: 'Forecasting' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 h-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Resource_Core</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Institutional human capital & financial stewardship</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-hide shadow-sm">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-500 hover:text-white'
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

      <div className="min-h-[600px]">
        {activeTab === 'NEXUS' && <WorkforceNexus staff={[]} language={language} />}
        {activeTab === 'STAFF' && <StaffManager />}
        {activeTab === 'COMPLIANCE' && <ComplianceManager />}
        {activeTab === 'HIRING' && isHR && <HiringHub language={language} />}
        {activeTab === 'CAPACITY' && isHR && <CapacityPlanner />}
        {activeTab === 'PAYROLL' && <PayrollSystem />}
      </div>
    </div>
  );
};

export default HRPortal;
