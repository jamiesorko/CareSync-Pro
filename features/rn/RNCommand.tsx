
import React from 'react';
import { Client, CareRole } from '../../types';
import TruthMediationSuite from '../clinical/TruthMediationSuite';
import CaseConferenceRoom from '../clinical/CaseConferenceRoom';
import NeuralSentinelHub from '../clinical/NeuralSentinelHub';

interface Props {
  clients: Client[];
  role: CareRole;
  language: string;
}

const RNCommand: React.FC<Props> = ({ clients, role, language }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-sky-400">CLINICAL_CORE</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">Precision Evidence & Multi-Agent Triage</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <TruthMediationSuite clients={clients} language={language} />
        <CaseConferenceRoom clients={clients} language={language} userRole={role} />
        <NeuralSentinelHub clients={clients} language={language} />
      </div>
    </div>
  );
};

export default RNCommand;
