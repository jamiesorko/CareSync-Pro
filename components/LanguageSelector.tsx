import React, { useState, useMemo } from 'react';
import { Search, Globe, Zap, X, Plus } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Primary Global List (The standard 60+ most used)
  const commonLanguages = [
    "English", "Spanish", "French", "Chinese (Mandarin)", "Chinese (Cantonese)", "Hindi", "Arabic", 
    "Portuguese", "Bengali", "Russian", "Japanese", "Punjabi", "German", "Javanese", "Malay", 
    "Telugu", "Vietnamese", "Korean", "Marathi", "Tamil", "Urdu", "Turkish", "Italian", 
    "Thai", "Gujarati", "Persian", "Polish", "Pashto", "Kannada", "Malayalam", "Sundanese", 
    "Hausa", "Burmese", "Odia", "Ukrainian", "Tagalog", "Yoruba", "Maithili", "Uzbek", 
    "Sindhi", "Amharic", "Fula", "Romanian", "Oromo", "Igbo", "Azerbaijani", "Dutch", 
    "Kurdish", "Serbo-Croatian", "Malagasy", "Nepali", "Sinhalese", "Khmer", "Turkmen", 
    "Somali", "Greek", "Czech", "Zulu", "Swedish", "Hebrew", "Finnish", "Danish", "Norwegian"
  ];

  const filtered = useMemo(() => {
    if (!query) return commonLanguages.slice(0, 15);
    return commonLanguages.filter(l => l.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleSelect = (lang: string) => {
    onLanguageChange(lang);
    setIsOpen(false);
    setQuery('');
  };

  const isQueryNew = query && !commonLanguages.some(l => l.toLowerCase() === query.toLowerCase());

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all shadow-2xl backdrop-blur-xl group"
      >
        <Globe size={18} className="text-indigo-400 group-hover:rotate-12 transition-transform" />
        <div className="text-left">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Neural_Linguist</p>
          <p className="text-[11px] font-black uppercase text-white tracking-tighter">{currentLanguage}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-80 bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-[500] p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Language_Registry</p>
            <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input 
              autoFocus
              type="text"
              placeholder="Search or type ANY language..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700 italic"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query) handleSelect(query);
              }}
            />
          </div>
          
          <div className="max-h-72 overflow-y-auto space-y-1 pr-2 scrollbar-hide">
            {isQueryNew && (
               <button 
                onClick={() => handleSelect(query)}
                className="w-full text-left p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 group hover:bg-indigo-600/20 transition-all mb-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-widest italic">Intercept: "{query}"</span>
                  <Plus size={12} className="text-indigo-400 animate-pulse" />
                </div>
                <p className="text-[8px] text-slate-500 mt-1 uppercase font-bold">Forge neural translation vector</p>
              </button>
            )}

            {filtered.map(lang => (
              <button 
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full text-left px-5 py-3 rounded-xl text-[10px] transition-all uppercase font-black tracking-widest ${
                  currentLanguage === lang ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
            
            {filtered.length === 0 && !isQueryNew && (
              <p className="text-[10px] text-slate-700 text-center py-10 italic">Awaiting dialect signal...</p>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/5">
             <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest text-center leading-relaxed">
               Supporting 7,100+ global languages<br/>via zero-latency neural intercept
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;