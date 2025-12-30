
import React from 'react';
import { Client } from '../../types';
import AdaptivePlanningHub from '../clinical/AdaptivePlanningHub';

interface Props {
  clients: Client[];
}

const HSSCommand: React.FC<Props> = ({ clients }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-purple-400">HUMAN_NEXUS</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">Bio-Social Synthesis & Neighborhood Guard</p>
      </div>

      <AdaptivePlanningHub clients={clients} language="English" />
    </div>
  );
};

export default HSSCommand;
