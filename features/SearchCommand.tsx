
import React, { useState, useMemo } from 'react';
import { Search, User, Users, Calendar, ArrowRight } from 'lucide-react';
import { MOCK_STAFF, MOCK_CLIENTS } from '../data/careData';
import { StaffMember, Client } from '../types';
import Translate from '../components/Translate';

interface Props {
  language: string;
  onSelectStaff: (staff: StaffMember) => void;
  onSelectClient: (client: Client) => void;
}

const SearchCommand: React.FC<Props> = ({ language, onSelectStaff, onSelectClient }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (query.length < 2) return { staff: [], clients: [] };
    const q = query.toLowerCase();
    return {
      staff: MOCK_STAFF.filter(s => s.name.toLowerCase().includes(q) || s.anonymizedId.toLowerCase().includes(q)),
      clients: MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(q) || c.anonymizedId.toLowerCase().includes(q))
    };
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] p-2 flex items-center shadow-2xl">
          <div className="w-14 h-14 flex items-center justify-center text-slate-500">
            <Search size={20} />
          </div>
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Field Staff or Patient by name..."
            className="flex-1 bg-transparent border-none text-xl font-bold text-white outline-none placeholder:text-slate-700 italic px-4"
          />
          <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/5 mr-2">
            <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none">Status</p>
            <p className="text-[10px] font-black text-white uppercase mt-1">Intercept_Active</p>
          </div>
        </div>
      </div>

      {(results.staff.length > 0 || results.clients.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Staff Results */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4 flex items-center gap-2">
              <Users size={12} /> Personnel_Intercepts
            </h4>
            {results.staff.map(s => (
              <button 
                key={s.id}
                onClick={() => onSelectStaff(s)}
                className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/10 hover:border-indigo-500/30 transition-all flex justify-between items-center group"
              >
                <div className="text-left">
                  <p className="text-sm font-black text-white uppercase italic">{s.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{s.role} • {s.homeSector}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Interrogate_Schedule</span>
                  <ArrowRight size={16} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Client Results */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4 flex items-center gap-2">
              <User size={12} /> Census_Matrix
            </h4>
            {results.clients.map(c => (
              <button 
                key={c.id}
                onClick={() => onSelectClient(c)}
                className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/10 hover:border-emerald-500/30 transition-all flex justify-between items-center group"
              >
                <div className="text-left">
                  <p className="text-sm font-black text-white uppercase italic">{c.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{c.sector} • Acuity: {c.risk?.level || 'STD'}</p>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Pull_Dossier</span>
                   <ArrowRight size={16} className="text-slate-700 group-hover:text-emerald-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : query.length >= 2 ? (
        <div className="p-20 text-center bg-white/[0.02] border border-dashed border-white/5 rounded-[3rem] opacity-30 italic">
          <p className="text-sm">No clinical signals matched "{query}"</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchCommand;
