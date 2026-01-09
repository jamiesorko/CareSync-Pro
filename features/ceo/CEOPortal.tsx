
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
}

const CEOPortal: React.FC<Props> = ({ language, clients, staff }) => {
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
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
            CEO_COMMAND
          </h1>
          <p className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.4em] mt-3 italic">
            Institutional Sovereignty Matrix • v6.4
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
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
        {activeView === 'MACRO' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-emerald-600/10 border border-emerald-500/20 p-10 rounded-[3rem] text-center shadow-xl">
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Net Solvency</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter">$1.42M</p>
               </div>
               <div className="bg-indigo-600/10 border border-indigo-500/20 p-10 rounded-[3rem] text-center shadow-xl">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Agency Health</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter">98.4%</p>
               </div>
               <div className="bg-rose-600/10 border border-rose-500/20 p-10 rounded-[3rem] text-center shadow-xl">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2">Market Exposure</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter">LOW</p>
               </div>
            </div>
            <ChairmanCommand language={language} />
          </div>
        )}

        {activeView === 'SEARCH' && (
          <div className="max-w-4xl mx-auto space-y-12">
             <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] text-center space-y-6">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Tactical_Intelligence_Core</h3>
                <p className="text-sm text-slate-500 font-medium italic max-w-md mx-auto">Interrogate the Global Census Matrix or Personnel Dossiers to visualize operational rosters.</p>
             </div>
             <SearchCommand 
               language={language}
               onSelectStaff={(s) => alert(`Signal Locked: Displaying roster for operative ${s.name}`)}
               onSelectClient={(c) => alert(`Dossier Open: Displaying clinical path for ${c.name}`)}
             />
          </div>
        )}

        {activeView === 'STRATEGY' && <StrategicSimulator language={language} />}
        {activeView === 'DOMINANCE' && <MarketDominanceHub language={language} />}
      </div>
    </div>
  );
};

export default CEOPortal;
