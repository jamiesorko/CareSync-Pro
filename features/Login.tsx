
import React from 'react';
import { CareRole, User } from '../types';
import { Fingerprint, ShieldCheck } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

interface Props {
  onLogin: (user: User) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const Login: React.FC<Props> = ({ onLogin, language, onLanguageChange }) => {
  const personas: User[] = [
    { name: 'Jamie Sorko', role: CareRole.CEO },
    { name: 'Sarah Walker', role: CareRole.DOC },
    { name: 'Elena R.', role: CareRole.PSW },
    { name: 'Tom Hardy', role: CareRole.RN },
    { name: 'Kevin Malone', role: CareRole.ACCOUNTANT },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-[#020617] relative">
      <div className="absolute top-10 right-10 z-50">
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
      </div>

      <div className="w-full max-w-md bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"></div>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/40">
            <Fingerprint size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">CareSync_Pro</h1>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Authorization Required</p>
        </div>

        <div className="space-y-3">
          {personas.map(p => (
            <button
              key={p.name}
              onClick={() => onLogin(p)}
              className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all group"
            >
              <div>
                <p className="text-sm font-black text-white uppercase italic tracking-tight">{p.name}</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase flex items-center gap-2 mt-1">
                  <ShieldCheck size={10} className="text-indigo-400" /> {p.role}
                </p>
              </div>
              <span className="text-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
