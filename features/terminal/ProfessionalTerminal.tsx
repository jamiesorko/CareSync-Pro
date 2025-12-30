
import React, { useState } from 'react';
import { Client, CareRole } from '../../types';
import PSWRoster from '../psw/PSWRoster';
import PSWVisitConsole from '../psw/PSWVisitConsole';
import PSWSelfService from '../psw/PSWSelfService';

interface Props {
  clients: Client[];
  role: CareRole;
  staffName: string;
}

const ProfessionalTerminal: React.FC<Props> = ({ clients, role, staffName }) => {
  const [view, setView] = useState<'ROSTER' | 'VISIT' | 'SELF'>('ROSTER');
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  // Determine accent color based on professional scope
  const getRoleTheme = () => {
    switch (role) {
      case CareRole.RN: case CareRole.RPN: return 'text-sky-400 border-sky-500/20 bg-sky-600';
      case CareRole.HSS: return 'text-purple-400 border-purple-500/20 bg-purple-600';
      default: return 'text-orange-500 border-orange-500/20 bg-orange-600';
    }
  };

  const theme = getRoleTheme();
  const themeColor = theme.split(' ').pop();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className={`text-5xl font-black tracking-tighter uppercase italic leading-none ${theme.split(' ')[0]}`}>
            {role === CareRole.RN || role === CareRole.RPN ? 'CLINICAL_NODE' : role === CareRole.HSS ? 'SOCIAL_NEXUS' : 'STATION_ALPHA'}
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
            {role} Operational Command • {staffName}
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shadow-sm">
          <button 
            onClick={() => setView('ROSTER')}
            className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${view === 'ROSTER' ? `${themeColor} text-white shadow-xl` : 'text-slate-500 hover:text-white'}`}
          >
            Roster
          </button>
          <button 
            onClick={() => setView('SELF')}
            className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${view === 'SELF' ? `${themeColor} text-white shadow-xl` : 'text-slate-500 hover:text-white'}`}
          >
            Self_Service
          </button>
        </div>
      </div>

      <div className="min-h-[700px]">
        {view === 'ROSTER' && (
          <PSWRoster 
            clients={clients} 
            onStartVisit={(client) => { setActiveClient(client); setView('VISIT'); }} 
          />
        )}
        {view === 'VISIT' && activeClient && (
          <PSWVisitConsole 
            client={activeClient} 
            language="English"
            onClockOut={() => { setActiveClient(null); setView('ROSTER'); }}
            onAlert={(type, content) => console.log(`Alert: ${type} - ${content}`)}
          />
        )}
        {view === 'SELF' && <PSWSelfService language="English" />}
      </div>
    </div>
  );
};

export default ProfessionalTerminal;
