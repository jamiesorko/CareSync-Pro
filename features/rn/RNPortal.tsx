
import React, { useState } from 'react';
import { Client, StaffMember, User } from '../../types';
import { Translate } from '../../components/Translate';
import NeuralHuddleRoom from '../clinical/NeuralHuddleRoom';
import TruthMediationBridge from '../clinical/TruthMediationBridge';
import PatientDigitalTwin from '../clinical/PatientDigitalTwin';
import AfterActionStation from '../doc/AfterActionStation';
import { ShieldCheck, Activity, Users, Database } from 'lucide-react';

interface Props {
  language: string;
  clients: Client[];
  user: User;
}

const RNPortal: React.FC<Props> = ({ language, clients, user }) => {
  const [activeTab, setActiveTab] = useState<'HUDDLE' | 'TRUTH' | 'TWIN' | 'AAR'>('HUDDLE');

  const tabs = [
    { id: 'HUDDLE', label: 'CLINICAL_HUDDLE', icon: Users },
    { id: 'TRUTH', label: 'TRUTH_MEDIATION', icon: ShieldCheck },
    { id: 'TWIN', label: 'DIGITAL_TWIN_SIM', icon: Activity },
    { id: 'AAR', label: 'INCIDENT_REVIEW', icon: Database }
  ];

  return (
    <div className="space-y-12 pb-20 px-4 h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-sky-400">
               <Translate target={language}>CLINICAL_COMMAND_NODE</Translate>
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            <Translate target={language}>PRECISION_ASSESSMENT_&_GOVERNANCE</Translate> • {user.name}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon size={14} />
              <Translate target={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeTab === 'HUDDLE' && <NeuralHuddleRoom language={language} clients={clients} />}
        {activeTab === 'TRUTH' && <TruthMediationBridge language={language} clients={clients} />}
        {activeTab === 'TWIN' && <PatientDigitalTwin language={language} clients={clients} />}
        {activeTab === 'AAR' && <AfterActionStation language={language} clients={clients} />}
      </div>
    </div>
  );
};

export default RNPortal;
