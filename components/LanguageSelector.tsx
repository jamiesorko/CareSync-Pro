
import React, { useState, useMemo } from 'react';
import { Search, Globe, Plus, X, Zap, Check } from 'lucide-react';
import Translate, { useTranslate } from './Translate';
import { useTranslation } from '../contexts/TranslationContext';

const LanguageSelector: React.FC = () => {
  const { language: currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  // Fix: useTranslate returns a string directly, not an object with a 'translated' property
  const placeholderText = useTranslate("Search or type ANY language...");

  const commonLanguages = [
    "English", "Spanish", "French", "Chinese", "Hindi", "Arabic", "Portuguese", 
    "Bengali", "Russian", "Japanese", "Punjabi", "German", "Korean", "Vietnamese", 
    "Italian", "Turkish", "Thai", "Urdu", "Swahili", "Tagalog"
  ];

  const filtered = useMemo(() => {
    if (!query) return commonLanguages;
    return commonLanguages.filter(l => l.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleSelect = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
    setQuery('');
  };

  const isCustom = query && !commonLanguages.some(l => l.toLowerCase() === query.toLowerCase());

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all shadow-2xl backdrop-blur-xl group"
      >
        <Globe size={18} className="text-indigo-400 group-hover:rotate-45 transition-transform duration-500" />
        <div className="text-left">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
             <Translate>Global_Linguist</Translate>
          </p>
          <p className="text-[11px] font-black uppercase text-white tracking-tighter">{currentLanguage}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-80 bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-[1000] p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6 px-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
               <Translate>Language_Registry</Translate>
            </p>
            <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-white">
              <X size={14} />
            </button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input 
              autoFocus
              type="text"
              placeholder={placeholderText}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white outline-none focus:border-indigo-500 transition-colors italic"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query) handleSelect(query);
              }}
            />
          </div>
          
          <div className="max-h-72 overflow-y-auto space-y-1 pr-2 scrollbar-hide">
            {isCustom && (
               <button 
                onClick={() => handleSelect(query)}
                className="w-full text-left p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 group hover:bg-indigo-600/20 transition-all mb-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-widest italic">
                     <Translate>Forge</Translate>: "{query}"
                  </span>
                  <Plus size={12} className="text-indigo-400 animate-pulse" />
                </div>
                <p className="text-[8px] text-slate-500 mt-1 uppercase font-bold">
                   <Translate>Initiate neural dialect vector</Translate>
                </p>
              </button>
            )}

            {filtered.map(lang => (
              <button 
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full text-left px-5 py-3 rounded-xl text-[10px] transition-all uppercase font-black tracking-widest flex items-center justify-between group ${
                  currentLanguage === lang ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {lang}
                {currentLanguage === lang && <Check size={12} />}
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2">
             <Zap size={10} className="text-indigo-400" />
             <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">
                <Translate>Supporting Every Global Dialect</Translate>
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;