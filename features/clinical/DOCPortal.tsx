
import React, { useState } from 'react';
import { Client, StaffMember, User } from '../../types';
import Translate from '../../components/Translate';
import TruthMediationSuite from './TruthMediationSuite';
import ProtocolArchitect from '../doc/ProtocolArchitect';
import BioTrajectoryHub from './BioTrajectoryHub';
import { ShieldCheck, Stethoscope, FileText, Activity } from 'lucide-react';

interface Props {
  language: string;
  user: User;
  clients: Client[];
}

const DOCPortal: React.FC<Props> = ({ language, user, clients }) => {
  const [activeTab, setActiveTab] = useState<'TRUTH' | 'FORGE' | 'CHRONO'>('TRUTH');
  const staffName = user.name;

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
               DOC_CLINICAL_COMMAND
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            Clinical Governance & Truth Synthesis • {staffName}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {[
            { id: 'TRUTH', label: 'Truth_Mediation' },
            { id: 'FORGE', label: 'Protocol_Architect' },
            { id: 'CHRONO', label: 'Bio_Trajectory' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-10 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
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
        {activeTab === 'TRUTH' && <TruthMediationSuite language={language} clients={clients} />}
        {activeTab === 'FORGE' && <ProtocolArchitect language={language} />}
        {activeTab === 'CHRONO' && <BioTrajectoryHub language={language} clients={clients} />}
      </div>
    </div>
  );
};

export default DOCPortal;
