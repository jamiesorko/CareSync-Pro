
import React from 'react';
import { Client, StaffMember } from '../../types';
import { Translate } from '../../components/Translate';
import ThroughputPulse from './ThroughputPulse';
import RegionalTacticalHUD from '../coordination/RegionalTacticalHUD';
import IoTFleetCommand from '../coordination/IoTFleetCommand';

interface Props {
  language: string;
  clients: Client[];
  staff: StaffMember[];
}

const COOPortal: React.FC<Props> = ({ language, clients, staff }) => {
  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-cyan-400">OPS_COMMAND</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
          <Translate target={language}>Fleet Orchestration & Throughput Optimization</Translate>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <ThroughputPulse language={language} />
        <RegionalTacticalHUD language={language} />
        <IoTFleetCommand language={language} />
      </div>
    </div>
  );
};

export default COOPortal;
