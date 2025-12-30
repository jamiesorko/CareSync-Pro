
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

  const getRoleBranding = () => {
    switch (role) {
      case CareRole.RN: return { title: 'CLINICAL_INTEL_NODE', color: 'text-sky-400', theme: 'bg-sky-600', sub: 'Nursing Leadership & Critical Assessment' };
      case CareRole.RPN: return { title: 'CLINICAL_PRACTICE_NODE', color: 'text-cyan-400', theme: 'bg-cyan-600', sub: 'Nursing Practice & Stabilization' };
      case CareRole.HSS: return { title: 'BIO_SOCIAL_NEXUS', color: 'text-purple-400', theme: 'bg-purple-600', sub: 'Social Determinants & Resource Linkage' };
      default: return { title: 'FIELD_STATION_ALPHA', color: 'text-orange-500', theme: 'bg-orange-600', sub: 'Personal Support & ADL Care' };
    }
  };

  const branding = getRoleBranding();

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full ${branding.color.replace('text-', 'bg-')} animate-pulse`}></div>
             <h1 className={`text-5xl font-black tracking-tighter uppercase italic leading-none ${branding.color}`}>
               {branding.title}
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
            {branding.sub} • {staffName}
          </p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          <button 
            onClick={() => setView('ROSTER')}
            className={`px-10 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'ROSTER' ? `${branding.theme} text-white shadow-xl` : 'text-slate-500 hover:text-white'}`}
          >
            My_Roster
          </button>
          <button 
            onClick={() => setView('SELF')}
            className={`px-10 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'SELF' ? `${branding.theme} text-white shadow-xl` : 'text-slate-500 hover:text-white'}`}
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
            role={role}
            onClockOut={() => { setActiveClient(null); setView('ROSTER'); }}
            onAlert={(type, content) => console.log(`[SIGNAL]: ${type} - ${content}`)}
          />
        )}
        {view === 'SELF' && <PSWSelfService language="English" />}
      </div>
    </div>
  );
};

export default ProfessionalTerminal;
