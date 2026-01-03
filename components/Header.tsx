
import React from 'react';
import { AppTab } from '../types';
import { Search, Bell, Settings, Command, UserCircle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import Translate from './Translate';

interface Props {
  activeTab: AppTab;
  language: string;
  onLanguageChange: (lang: string) => void;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ activeTab, language, onLanguageChange, onLogout }) => {
  return (
    <header className="h-20 bg-transparent border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-40">
      <div className="flex items-center gap-8 flex-1">
        <div className="flex flex-col">
          <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-0.5">
            <Translate targetLanguage={language}>Active_Node</Translate>
          </p>
          <h2 className="text-sm font-black uppercase tracking-widest text-white italic">
            <Translate targetLanguage={language}>{activeTab}</Translate>
          </h2>
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-2xl w-[500px] focus-within:border-indigo-500/50 focus-within:bg-white/[0.05] transition-all group">
          <Search size={16} className="text-slate-500 group-focus-within:text-indigo-400" />
          <input 
            type="text" 
            placeholder="..." 
            className="bg-transparent border-none text-xs text-slate-200 outline-none w-full placeholder:text-slate-600 font-medium"
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
            <Command size={10} className="text-slate-500" />
            <span className="text-[9px] font-bold text-slate-500">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />

        <div className="h-8 w-px bg-white/5 mx-2"></div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative group">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-black shadow-[0_0_8px_#6366f1]"></span>
          </button>
          
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Settings size={18} />
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 pl-2 pr-4 py-2 bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-2xl transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
            <UserCircle size={20} />
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-slate-500 uppercase leading-none">
              <Translate targetLanguage={language}>Security_ID</Translate>
            </p>
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">Jamie Sorko</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
