
import React from 'react';
import { Client, StaffMember, User } from '../../types';
import { Translate } from '../../components/Translate';
import NeuralHuddleRoom from '../clinical/NeuralHuddleRoom';
import TruthMediationBridge from '../clinical/TruthMediationBridge';
import PatientDigitalTwin from '../clinical/PatientDigitalTwin';

interface Props {
  language: string;
  clients: Client[];
  user: User;
}

const RNPortal: React.FC<Props> = ({ language, clients, user }) => {
  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-sky-500">CLINICAL_COMMAND</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
          <Translate target={language}>Precision Assessment & Multi-Agent Care Coordination</Translate>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <NeuralHuddleRoom language={language} clients={clients} />
        <TruthMediationBridge language={language} clients={clients} />
        <PatientDigitalTwin language={language} clients={clients} />
      </div>
    </div>
  );
};

export default RNPortal;
