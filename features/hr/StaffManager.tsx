
import React, { useState } from 'react';
import { MOCK_STAFF } from '../../data/careData';
import Translate from '../../components/Translate';
import { ShieldCheck, AlertTriangle, Search } from 'lucide-react';

interface Props {
  language: string;
}

const StaffManager: React.FC<Props> = ({ language }) => {
  const [query, setQuery] = useState('');

  const filtered = MOCK_STAFF.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="..."
          className="w-full bg-slate-900 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-2xl font-black text-white italic outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => (
          <div key={s.id} className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-8">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-xl ${s.disciplinaryStrikes > 1 ? 'bg-rose-600' : 'bg-indigo-600'}`}>
                  {s.id}
               </div>
               <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i < s.disciplinaryStrikes ? 'bg-rose-600 animate-pulse' : 'bg-white/10'}`} />
                  ))}
               </div>
            </div>
            
            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">{s.name}</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              <Translate targetLanguage={language}>{s.role}</Translate>
            </p>

            <div className="space-y-3 pt-6 border-t border-white/5">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-600 uppercase">
                    <Translate targetLanguage={language}>Sector Lock</Translate>
                  </span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase">{s.homeSector}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-600 uppercase">
                    <Translate targetLanguage={language}>Hours / Week</Translate>
                  </span>
                  <span className="text-[10px] font-black text-white">{s.weeklyHours}h</span>
               </div>
            </div>

            <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/10 transition-all">
               <Translate targetLanguage={language}>View_Full_Mastery_Dossier</Translate>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManager;
