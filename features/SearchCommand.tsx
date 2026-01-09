
import React, { useState, useMemo } from 'react';
import { Search, User, Users, ArrowRight, Shield } from 'lucide-react';
import { MOCK_STAFF, MOCK_CLIENTS } from '../data/careData';
import { StaffMember, Client } from '../types';
import Translate, { useTranslate } from '../components/Translate';

interface Props {
  language: string;
  onSelectStaff: (staff: StaffMember) => void;
  onSelectClient: (client: Client) => void;
}

const SearchCommand: React.FC<Props> = ({ language, onSelectStaff, onSelectClient }) => {
  const [query, setQuery] = useState('');
  const { translated: placeholder } = useTranslate("Search_Field_Staff_or_Patient_by_name", language);

  const results = useMemo(() => {
    if (query.length < 2) return { staff: [], clients: [] };
    const q = query.toLowerCase();
    return {
      staff: MOCK_STAFF.filter(s => s.name.toLowerCase().includes(q) || s.anonymizedId.toLowerCase().includes(q)),
      clients: MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(q) || c.anonymizedId.toLowerCase().includes(q))
    };
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-3 flex items-center shadow-2xl backdrop-blur-2xl">
          <div className="w-16 h-16 flex items-center justify-center text-indigo-500">
            <Search size={24} />
          </div>
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none text-2xl font-black text-white outline-none placeholder:text-slate-700 italic px-4 tracking-tighter"
          />
          <div className="hidden md:flex flex-col items-end px-8 border-l border-white/5">
            <p className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.4em] leading-none mb-1">
              <Translate target={language}>INTERCEPT_STATUS</Translate>
            </p>
            <p className="text-[10px] font-black text-white uppercase tracking-widest">
              <Translate target={language}>ACTIVE_HANDSHAKE</Translate>
            </p>
          </div>
        </div>
      </div>

      {(results.staff.length > 0 || results.clients.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-6 duration-700">
          {/* Staff Results */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 flex items-center gap-3">
              <Users size={14} className="text-indigo-400" /> <Translate target={language}>PERSONNEL_RECORDS</Translate>
            </h4>
            {results.staff.map(s => (
              <button 
                key={s.id}
                onClick={() => onSelectStaff(s)}
                className="w-full p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/5 hover:border-indigo-500/30 transition-all flex justify-between items-center group text-left"
              >
                <div>
                  <p className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-2">{s.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <Translate target={language}>{s.role}</Translate> • <Translate target={language}>{s.homeSector}</Translate>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    <Translate target={language}>Interrogate_Schedule</Translate>
                  </span>
                  <ArrowRight size={18} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Client Results */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 flex items-center gap-3">
              <User size={14} className="text-emerald-400" /> <Translate target={language}>CENSUS_MATRIX</Translate>
            </h4>
            {results.clients.map(c => (
              <button 
                key={c.id}
                onClick={() => onSelectClient(c)}
                className="w-full p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/5 hover:border-emerald-500/30 transition-all flex justify-between items-center group text-left"
              >
                <div>
                  <p className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-2">{c.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <Translate target={language}>{c.sector}</Translate> • <Translate target={language}>Risk</Translate>: <Translate target={language}>{c.risk?.level || 'STD'}</Translate>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                     <Translate target={language}>Open_Dossier</Translate>
                   </span>
                   <ArrowRight size={18} className="text-slate-700 group-hover:text-emerald-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : query.length >= 2 ? (
        <div className="p-24 text-center bg-white/[0.02] border border-dashed border-white/5 rounded-[4rem] opacity-30 italic">
          <p className="text-base font-medium">
            <Translate target={language}>NO_SIGNALS_DETECTED_FOR</Translate> "{query}"
          </p>
        </div>
      ) : (
        <div className="p-32 text-center opacity-10 flex flex-col items-center">
          <Shield size={64} strokeWidth={1} className="mb-6" />
          <p className="text-sm font-black uppercase tracking-[0.3em] italic">
            <Translate target={language}>AWAITING_AUTHORIZATION_QUERY</Translate>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchCommand;
