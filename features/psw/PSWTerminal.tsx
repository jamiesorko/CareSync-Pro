
import React from 'react';
import { Client } from '../../types';
import GuardianEscort from './GuardianEscort';
import MasteryForge from '../hr/MasteryForge';
import { MOCK_STAFF } from '../../data/careData';

interface Props {
  clients: Client[];
}

const PSWTerminal: React.FC<Props> = ({ clients }) => {
  const activeStaff = MOCK_STAFF[1]; // Linda White

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-orange-500">OP_STATION_ALPHA</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">Field Tactics & Safety Sentinel</p>
        </div>
        <div className="bg-orange-500 text-black px-6 py-3 rounded-2xl font-black uppercase text-xs">Duty Status: Active</div>
      </div>

      <GuardianEscort clients={clients} language="English" />
      <MasteryForge staffMember={activeStaff} language="English" />
    </div>
  );
};

export default PSWTerminal;
