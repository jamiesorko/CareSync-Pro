
import React, { useState } from 'react';
import { Client, StaffMember, User } from '../../types';
import Translate from '../../components/Translate';
import TruthMediationSuite from './TruthMediationSuite';
import ProtocolArchitect from '../doc/ProtocolArchitect';
import BioTrajectoryHub from './BioTrajectoryHub';
import SearchCommand from '../SearchCommand';
import { ShieldCheck, Stethoscope, FileText, Activity, Search, ShieldAlert } from 'lucide-react';

interface Props {
  language: string;
  user: User;
  clients: Client[];
}

const DOCPortal: React.FC<Props> = ({ language, user, clients }) => {
  const [activeTab, setActiveTab] = useState<'SEARCH' | 'TRUTH' | 'FORGE' | 'CHRONO'>('SEARCH');
  const [focusTarget, setFocusTarget] = useState<Client | StaffMember | null>(null);

  const stats = [
    { label: 'Clinical_Fidelity', val: '99.8%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Acuity_Drift', val: '-4.2%', icon: Activity, color: 'text-sky-400' },
    { label: 'Waitlist_Mass', val: '142', icon: Stethoscope, color: 'text-rose-400' },
    { label: 'Active_Protocols', val: '88', icon: FileText, color: 'text-white' }
  ];

  return (
    <div className="h-full space-y-10 animate-in fade-in duration-700 pb-24 px-4 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-rose-500">
               <Translate target={language}>DOC_COMMAND_CORE</Translate>
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            <Translate target={language}>Governance_&_Interrogative_Search</Translate> • {user.name}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {[
            { id: 'SEARCH', label: 'CENSUS_SEARCH', icon: Search },
            { id: 'TRUTH', label: 'TRUTH_MEDIATION', icon: Activity },
            { id: 'FORGE', label: 'PROTOCOL_ARCHITECT', icon: FileText },
            { id: 'CHRONO', label: 'BIO_TRAJECTORY', icon: Activity }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setFocusTarget(null); }}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate target={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl group hover:border-rose-500/30 transition-all">
            <s.icon className={`${s.color} mb-4`} size={22} />
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              <Translate target={language}>{s.label}</Translate>
            </p>
            <p className="text-3xl font-black text-white italic tracking-tighter mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeTab === 'SEARCH' && (
          <div className="max-w-4xl mx-auto space-y-12">
             <div className="text-center py-12 flex flex-col items-center">
                <ShieldAlert size={48} className="text-rose-500/30 mb-6" />
                <h3 className="text-xl font-black text-white uppercase tracking-widest">
                  <Translate target={language}>SECURE_REGISTRY_GATEWAY</Translate>
                </h3>
                <p className="text-sm text-slate-500 font-medium italic mt-2 max-w-md">
                  <Translate target={language}>Interrogate_specific_personnel_or_patient_signals_to_visualize_clinical_rosters</Translate>
                </p>
             </div>
             <SearchCommand 
               language={language}
               onSelectClient={(c) => { setFocusTarget(c); setActiveTab('CHRONO'); }}
               onSelectStaff={(s) => { alert(`Signal Intercept: Opening schedule for ${s.name}`); }}
             />
          </div>
        )}
        {activeTab === 'TRUTH' && <TruthMediationSuite language={language} clients={clients} />}
        {activeTab === 'FORGE' && <ProtocolArchitect language={language} />}
        {activeTab === 'CHRONO' && <BioTrajectoryHub language={language} clients={clients} />}
      </div>
    </div>
  );
};

export default DOCPortal;
