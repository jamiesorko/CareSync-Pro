
import React, { useState } from 'react';
import { Client, AppTab } from '../../types';
import PSWRoster from './PSWRoster';
import PSWVisitConsole from './PSWVisitConsole';
import PSWSelfService from './PSWSelfService';
import { MOCK_STAFF } from '../../data/careData';

interface Props {
  clients: Client[];
}

const PSWTerminal: React.FC<Props> = ({ clients }) => {
  const [view, setView] = useState<'ROSTER' | 'VISIT' | 'SELF'>('ROSTER');
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const activeStaff = MOCK_STAFF[1]; // Linda White

  const handleStartVisit = (client: Client) => {
    setActiveClient(client);
    setView('VISIT');
  };

  const handleEndVisit = () => {
    setActiveClient(null);
    setView('ROSTER');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-orange-500 leading-none">STATION_ALPHA</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">Personal Support Worker Operational Node</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shadow-sm">
          <button 
            onClick={() => setView('ROSTER')}
            className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${view === 'ROSTER' ? 'bg-orange-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Roster
          </button>
          <button 
            onClick={() => setView('SELF')}
            className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${view === 'SELF' ? 'bg-orange-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Self_Service
          </button>
        </div>
      </div>

      <div className="min-h-[700px]">
        {view === 'ROSTER' && <PSWRoster clients={clients} onStartVisit={handleStartVisit} />}
        {view === 'VISIT' && activeClient && (
          <PSWVisitConsole 
            client={activeClient} 
            language="English"
            onClockOut={handleEndVisit}
            onAlert={(type, content) => console.log(`Alert: ${type} - ${content}`)}
          />
        )}
        {view === 'SELF' && <PSWSelfService language="English" />}
      </div>
    </div>
  );
};

export default PSWTerminal;
