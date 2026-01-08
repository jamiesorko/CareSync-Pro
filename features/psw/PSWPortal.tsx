
import React, { useState } from 'react';
import { Client, StaffMember, CareRole } from '../../types';
import PSWRoster from './PSWRoster';
import PSWVisitConsole from './PSWVisitConsole';
import GuardianEscort from './GuardianEscort';
import HandoverStudio from './HandoverStudio';

interface Props {
  language: string;
  clients: Client[];
}

const PSWPortal: React.FC<Props> = ({ language, clients }) => {
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [view, setView] = useState<'ROSTER' | 'VISIT' | 'GUARDIAN'>('ROSTER');

  if (view === 'VISIT' && activeClient) {
    return (
      <PSWVisitConsole 
        client={activeClient}
        language={language}
        role={CareRole.PSW}
        onClockOut={() => setView('ROSTER')}
        onAlert={(type, content) => console.log(type, content)}
      />
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-orange-500">STATION_ALPHA</h1>
        <button 
          onClick={() => setView(view === 'GUARDIAN' ? 'ROSTER' : 'GUARDIAN')}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-orange-400"
        >
          {view === 'GUARDIAN' ? 'EXIT_ESCORT' : 'SAFETY_ESCORT'}
        </button>
      </div>

      {view === 'GUARDIAN' ? (
        <GuardianEscort language={language} clients={clients} />
      ) : (
        <PSWRoster 
          clients={clients} 
          language={language} 
          onStartVisit={(c) => { setActiveClient(c); setView('VISIT'); }} 
        />
      )}
    </div>
  );
};

export default PSWPortal;
