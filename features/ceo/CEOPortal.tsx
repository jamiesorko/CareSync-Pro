
import React from 'react';
import { Client, StaffMember, User } from '../../types';
import { Translate } from '../../components/Translate';
import StrategicSimulator from './StrategicSimulator';
import ChairmanCommand from '../executive/ChairmanCommand';
import MarketDominanceHub from './MarketDominanceHub';

interface Props {
  language: string;
  clients: Client[];
  staff: StaffMember[];
}

const CEOPortal: React.FC<Props> = ({ language, clients, staff }) => {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">CEO_COMMAND</h1>
          <p className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.4em] mt-2">
            <Translate target={language}>Institutional Sovereignty Matrix</Translate>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <ChairmanCommand language={language} />
        <StrategicSimulator language={language} />
        <MarketDominanceHub language={language} />
      </div>
    </div>
  );
};

export default CEOPortal;
