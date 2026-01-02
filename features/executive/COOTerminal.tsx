
import React, { useState } from 'react';
import { Client, StaffMember } from '../../types';
import Translate from '../../components/Translate';
import ThroughputPulse from '../coo/ThroughputPulse';
import StabilityGrid from '../coo/StabilityGrid';
import NeighborhoodBioSentinel from '../coo/NeighborhoodBioSentinel';
import { Activity, Zap, BarChart3, Globe, ShieldAlert } from 'lucide-react';

interface Props {
  language: string;
  staffName: string;
  clients: Client[];
  staff: StaffMember[];
}

const COOTerminal: React.FC<Props> = ({ language, staffName, clients, staff }) => {
  const [activeLayer, setActiveLayer] = useState<'VELOCITY' | 'STABILITY' | 'BIO_SENTINEL'>('VELOCITY');

  const stats = [
    { label: 'Agency Velocity', val: '94.2%', icon: Zap, color: 'text-cyan-400' },
    { label: 'Fleet Latency', val: '115m', icon: Activity, color: 'text-emerald-400' },
    { label: 'System Density', val: 'Optimal', icon: Globe, color: 'text-sky-400' },
    { label: 'Node Load', val: 'Nominal', icon: ShieldAlert, color: 'text-white' }
  ];

  return (
    <div className="h-full space-y-10 animate-in fade-in duration-700 pb-24 px-4 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-cyan-400">
               COO_OPERATIONAL_COMMAND
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            Strategic Fleet Orchestration • {staffName}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {[
            { id: 'VELOCITY', label: 'Fleet_Throughput' },
            { id: 'STABILITY', label: 'Roster_Grid' },
            { id: 'BIO_SENTINEL', label: 'Epidemiology' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveLayer(tab.id as any)}
              className={`px-10 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeLayer === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl group hover:border-cyan-500/30 transition-all">
            <s.icon className={`${s.color} mb-4`} size={22} />
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-white italic tracking-tighter mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeLayer === 'VELOCITY' && <ThroughputPulse language={language} />}
        {activeLayer === 'STABILITY' && <StabilityGrid language={language} />}
        {activeLayer === 'BIO_SENTINEL' && <NeighborhoodBioSentinel language={language} />}
      </div>
    </div>
  );
};

export default COOTerminal;
