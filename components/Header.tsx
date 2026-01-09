
import React from 'react';
import { AppTab } from '../types';
import Translate from './Translate';
import LanguageSelector from './LanguageSelector';
import { UserCircle } from 'lucide-react';

interface Props {
  active: AppTab;
  lang: string;
  setLang: (lang: string) => void;
  user: any;
}

const Header: React.FC<Props> = ({ active, lang, setLang, user }) => {
  return (
    <header className="h-24 bg-transparent border-b border-white/5 flex items-center justify-between px-8 z-40 shrink-0">
      <div className="flex flex-col">
        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em]">Active_Node</p>
        <h2 className="text-sm font-black uppercase tracking-widest text-white italic leading-none mt-1">
          <Translate target={lang}>{active}</Translate>
        </h2>
      </div>

      <div className="flex items-center gap-8">
        <LanguageSelector currentLanguage={lang} onLanguageChange={setLang} />

        <div className="flex items-center gap-3 pl-4 pr-6 py-3 bg-white/5 border border-white/10 rounded-[1.5rem] shadow-xl backdrop-blur-xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <UserCircle size={22} />
          </div>
          <div className="text-left">
            <p className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">Authenticated</p>
            <p className="text-[11px] font-black text-white uppercase tracking-tighter italic">
               {user?.name || 'Authorized_Operative'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
