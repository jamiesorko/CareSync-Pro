
import React, { useState } from 'react';
import { CareRole } from '../types';
import Translate from '../components/Translate';
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
  const [activeTab, setActiveTab] = useState<'HIRING' | 'COMPLIANCE' | 'CAPACITY' | 'STAFF' | 'NEXUS' | 'RETENTION'>('NEXUS');
  const isHR = [CareRole.HR_SPECIALIST, CareRole.CEO, CareRole.COO].includes(role);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 h-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Resource_Core</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Institutional Human Capital & Compliance Stewardship</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('NEXUS')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeTab === 'NEXUS' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Workforce Nexus
          </button>
          <button 
            onClick={() => setActiveTab('STAFF')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeTab === 'STAFF' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Staff Mastery
          </button>
          <button 
            onClick={() => setActiveTab('COMPLIANCE')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeTab === 'COMPLIANCE' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Compliance
          </button>
          {isHR && (
            <>
              <button 
                onClick={() => setActiveTab('HIRING')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeTab === 'HIRING' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
              >
                Recruitment
              </button>
              <button 
                onClick={() => setActiveTab('CAPACITY')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeTab === 'CAPACITY' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
              >
                Forecasting
              </button>
            </>
          )}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'NEXUS' && <WorkforceNexus staff={MOCK_STAFF} language={language} />}
        {activeTab === 'STAFF' && <StaffManager language={language} />}
        {activeTab === 'COMPLIANCE' && <ComplianceManager language={language} isHR={isHR} />}
        {activeTab === 'HIRING' && isHR && <HiringHub language={language} />}
        {activeTab === 'CAPACITY' && isHR && <CapacityPlanner language={language} />}
        {activeTab === 'RETENTION' && <RetentionIntelligence staff={MOCK_STAFF} language={language} />}
      </div>
    </div>
  );
};

export default HRPortal;
