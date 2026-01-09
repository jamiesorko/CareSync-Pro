
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
  const { translated: placeholder } = useTranslate("Search by Personnel Name or Patient ID", language);
  const { translated: resultsHeaderStaff } = useTranslate("Personnel Records Found", language);
  const { translated: resultsHeaderClients } = useTranslate("Census Matrix Found", language);

  const results = useMemo(() => {
    if (query.length < 2) return { staff: [], clients: [] };
    const q = query.toLowerCase();
    return {
      staff: MOCK_STAFF.filter(s => s.name.toLowerCase().includes(q) || s.anonymizedId.toLowerCase().includes(q)),
      clients: MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(q) || c.anonymizedId.toLowerCase().includes(q))
    };
  }, [query]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-[3rem]"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-3 flex items-center shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 flex items-center justify-center text-indigo-500">
            <Search size={24} />
          </div>
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none text-xl font-black text-white outline-none placeholder:text-slate-700 italic px-4"
          />
        </div>
      </div>

      {(results.staff.length > 0 || results.clients.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-6">{resultsHeaderStaff}</h4>
            {results.staff.map(s => (
              <button 
                key={s.id}
                onClick={() => onSelectStaff(s)}
                className="w-full p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/5 hover:border-indigo-500/30 transition-all flex justify-between items-center group text-left"
              >
                <div>
                  <p className="text-lg font-black text-white uppercase italic tracking-tighter">{s.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">
                    <Translate target={language}>{s.role}</Translate> • <Translate target={language}>{s.homeSector}</Translate>
                  </p>
                </div>
                <ArrowRight size={18} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-6">{resultsHeaderClients}</h4>
            {results.clients.map(c => (
              <button 
                key={c.id}
                onClick={() => onSelectClient(c)}
                className="w-full p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/5 hover:border-emerald-500/30 transition-all flex justify-between items-center group text-left"
              >
                <div>
                  <p className="text-lg font-black text-white uppercase italic tracking-tighter">{c.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">
                    <Translate target={language}>{c.sector}</Translate>
                  </p>
                </div>
                <ArrowRight size={18} className="text-slate-700 group-hover:text-emerald-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ) : query.length >= 2 ? (
        <div className="p-24 text-center opacity-30 italic">
          <Translate target={language}>No signals found in the registry.</Translate>
        </div>
      ) : (
        <div className="p-32 text-center opacity-10 flex flex-col items-center">
          <Shield size={64} strokeWidth={1} className="mb-6" />
          <p className="text-sm font-black uppercase tracking-widest italic">
            <Translate target={language}>Enter credentials to interrogate registry</Translate>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchCommand;
