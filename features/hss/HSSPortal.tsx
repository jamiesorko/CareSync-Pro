
import React from 'react';
import { Client } from '../../types';
import { Translate } from '../../components/Translate';
import AdaptivePlanningHub from '../clinical/AdaptivePlanningHub';
import NeighborhoodBioSentinel from '../coo/NeighborhoodBioSentinel';

interface Props {
  language: string;
  clients: Client[];
}

const HSSPortal: React.FC<Props> = ({ language, clients }) => {
  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-purple-400">HUMAN_NEXUS</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
          <Translate target={language}>Bio-Social Intercept & Neighborhood Surveillance</Translate>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <AdaptivePlanningHub language={language} clients={clients} />
        <NeighborhoodBioSentinel language={language} />
      </div>
    </div>
  );
};

export default HSSPortal;
