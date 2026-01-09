
import React, { useState } from 'react';
import { Client, StaffMember, User } from '../../types';
import Translate from '../../components/Translate';
import TruthMediationSuite from './TruthMediationSuite';
import ProtocolArchitect from '../doc/ProtocolArchitect';
import BioTrajectoryHub from './BioTrajectoryHub';
import SearchCommand from '../SearchCommand';
import { ShieldCheck, Stethoscope, FileText, Activity, Search } from 'lucide-react';

interface Props {
  language: string;
  user: User;
  clients: Client[];
}

const DOCPortal: React.FC<Props> = ({ language, user, clients }) => {
  const [activeTab, setActiveTab] = useState<'SEARCH' | 'TRUTH' | 'FORGE' | 'CHRONO'>('SEARCH');
  const [focusTarget, setFocusTarget] = useState<Client | StaffMember | null>(null);

  const stats = [
    { label: 'Clinical Fidelity', val: '99.8%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Acuity Drift', val: '-4.2%', icon: Activity, color: 'text-sky-400' },
    { label: 'Waitlist Mass', val: '142', icon: Stethoscope, color: 'text-rose-400' },
    { label: 'Active Protocols', val: '88', icon: FileText, color: 'text-white' }
  ];

  return (
    <div className="h-full space-y-10 animate-in fade-in duration-700 pb-24 px-4 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-rose-500">
               DOC_COMMAND
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            Governance & Interrogative Search • {user.name}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {[
            { id: 'SEARCH', label: 'Census_Search', icon: Search },
            { id: 'TRUTH', label: 'Truth_Mediation', icon: Activity },
            { id: 'FORGE', label: 'Protocol_Architect', icon: FileText },
            { id: 'CHRONO', label: 'Bio_Trajectory', icon: Activity }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-white italic tracking-tighter mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeTab === 'SEARCH' && (
          <div className="max-w-4xl mx-auto space-y-12">
             <div className="text-center py-10 opacity-50 italic">
               <p className="text-sm font-medium">Interrogate specific personnel or patient signals to view rosters.</p>
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
