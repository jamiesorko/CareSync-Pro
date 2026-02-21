import React, { useState } from 'react';
import { Client, StaffMember, User } from '../../types';
import { Translate } from '../../components/Translate';
import StrategicSimulator from './StrategicSimulator';
import ChairmanCommand from '../executive/ChairmanCommand';
import MarketDominanceHub from './MarketDominanceHub';
import SearchCommand from '../SearchCommand';
import { Search, Globe, Landmark, Activity } from 'lucide-react';

interface Props {
  language: string;
  clients: Client[];
  staff: StaffMember[];
  user: User;
}

const CEOPortal: React.FC<Props> = ({ language, clients, staff, user }) => {
  const [activeView, setActiveView] = useState<'MACRO' | 'SEARCH' | 'STRATEGY' | 'DOMINANCE'>('MACRO');

  const tabs = [
    { id: 'MACRO', label: 'Institutional_Pulse', icon: Landmark },
    { id: 'SEARCH', label: 'Tactical_Search', icon: Search },
    { id: 'STRATEGY', label: 'Scenario_Modeling', icon: Activity },
    { id: 'DOMINANCE', label: 'Market_Expansion', icon: Globe }
  ];

  return (
    <div className="space-y-12 pb-20 px-4 h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeView === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon size={14} />
              <Translate target={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeView === 'MACRO' && <ChairmanCommand language={language} />}
        {activeView === 'SEARCH' && <SearchCommand language={language} onSelectStaff={() => {}} onSelectClient={() => {}} />}
        {activeView === 'STRATEGY' && <StrategicSimulator language={language} />}
        {activeView === 'DOMINANCE' && <MarketDominanceHub language={language} />}
      </div>
    </div>
  );
};

export default CEOPortal;