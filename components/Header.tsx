
import React from 'react';
import { AppTab } from '../types';
import { Translate } from './Translate';
import { UserCircle } from 'lucide-react';

// Changed to default export to match Layout.tsx expectation
const Header = ({ active, lang, setLang, user }: any) => {
  return (
    <header className="h-20 bg-transparent border-b border-white/5 flex items-center justify-between px-8 z-40">
      <div className="flex flex-col">
        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em]">Active_Node</p>
        <h2 className="text-sm font-black uppercase tracking-widest text-white italic">
          <Translate target={lang}>{active}</Translate>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <select 
          value={lang} 
          onChange={e => setLang(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-400 outline-none hover:text-white"
        >
          {['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Hindi'].map(l => (
            <option key={l} value={l} className="bg-slate-900">{l}</option>
          ))}
        </select>

        <div className="flex items-center gap-3 pl-2 pr-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
            <UserCircle size={20} />
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-slate-500 uppercase leading-none">Security_ID</p>
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">{user?.name || 'Authorized Operative'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
