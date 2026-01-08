
import React, { useState, useEffect } from 'react';
import { MOCK_STAFF } from '../../data/careData';
import { telemetryService } from '../../services/telemetryService';
import { Scan, ShieldAlert, Radio, Search, AlertCircle } from 'lucide-react';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const WarRoom: React.FC<Props> = ({ language }) => {
  const [liveStaff, setLiveStaff] = useState(MOCK_STAFF);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStaff(prev => telemetryService.generateLivePositions(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredStaff = liveStaff.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-1000">
      {/* Header Intercept */}
      <div className="bg-rose-600/10 border border-rose-500/30 p-8 rounded-[3rem] shadow-2xl flex justify-between items-center relative overflow-hidden">
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
               <ShieldAlert className="text-white" size={32} />
            </div>
            <div>
               <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">WAR_ROOM: SECTOR_GTA</h2>
               <p className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.4em] mt-2 italic">Active Fleet Telemetry • Zero-PII Neural Proxy</p>
            </div>
         </div>
         <div className="relative w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Personnel by Name or ID..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-rose-500 italic"
            />
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Map Intercept */}
        <div className="lg:col-span-8 bg-[#020617] border border-white/10 rounded-[3rem] relative overflow-hidden group shadow-3xl">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full border border-white/10">
                 {[...Array(144)].map((_, i) => <div key={i} className="border border-white/5"></div>)}
              </div>
           </div>
           
           {/* Live Pings */}
           {filteredStaff.map((s, i) => (
             <div 
               key={s.id}
               className="absolute transition-all duration-[3000ms] ease-linear"
               style={{ left: `${40 + (s.lat || 0) * 100 % 40}%`, top: `${30 + (s.lng || 0) * 100 % 40}%` }}
             >
                <div className="relative">
                   <div className="w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_20px_#f43f5e] border-2 border-white"></div>
                   <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 border border-white/10 px-3 py-1 rounded-lg">
                      <p className="text-[8px] font-black text-white uppercase">{s.name}</p>
                   </div>
                   <div className="absolute -inset-4 bg-rose-500/20 rounded-full animate-ping opacity-30"></div>
                </div>
             </div>
           ))}

           <div className="absolute bottom-8 left-8 p-6 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                 <Radio size={14} className="text-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black text-white uppercase tracking-widest">Fleet_Sovereignty_Sync</p>
              </div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Signal Stability: 99.8%</p>
           </div>
        </div>

        {/* Personnel Records & Strikes */}
        <div className="lg:col-span-4 bg-slate-900 border border-white/10 rounded-[3rem] p-10 flex flex-col overflow-hidden">
           <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-8">Personnel_Audit_Log</h3>
           <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
              {filteredStaff.map(s => (
                <div key={s.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <p className="text-xs font-black text-white uppercase italic">{s.name}</p>
                         <p className="text-[8px] text-slate-600 font-bold uppercase">{s.role} • {s.homeSector}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < s.disciplinaryStrikes ? 'bg-rose-600 shadow-[0_0_8px_#f43f5e]' : 'bg-white/10'}`}></div>
                        ))}
                      </div>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black text-slate-600 uppercase">Strikes: {s.disciplinaryStrikes} / 3</span>
                      <button className="text-[8px] font-black text-sky-400 uppercase tracking-widest border-b border-sky-400/20">Open_Record</button>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 p-6 bg-rose-600/5 border border-rose-500/20 rounded-2xl flex items-center gap-4">
              <AlertCircle className="text-rose-500 shrink-0" size={18} />
              <p className="text-[10px] text-slate-300 font-medium italic">
                Strikes automatically trigger "Neural Performance Forge" requirements.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
