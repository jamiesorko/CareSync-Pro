
import React from 'react';
import { CareRole, User } from '../types';
import Translate from '../components/Translate';
import LanguageSelector from '../components/LanguageSelector';
import { ShieldCheck, Lock, Fingerprint, ChevronRight } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const Login: React.FC<Props> = ({ onLogin, language, onLanguageChange }) => {
  const personas: User[] = [
    { name: 'Jamie Sorko', role: CareRole.CEO },
    { name: 'Michael Scott', role: CareRole.COO },
    { name: 'Sarah Walker', role: CareRole.DOC },
    { name: 'Kevin Malone', role: CareRole.ACCOUNTANT },
    { name: 'Toby Flenderson', role: CareRole.HR_SPECIALIST },
    { name: 'Robert Johnson', role: CareRole.CLIENT },
    { name: 'Tom Hardy', role: CareRole.RN },
    { name: 'Elena R.', role: CareRole.PSW },
    { name: 'Marcus Bell', role: CareRole.COORDINATOR }
  ];

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#010411]">
      <div className="absolute top-8 right-8 z-50">
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-40"></div>
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="glass-card p-12 rounded-[4rem] w-full max-w-lg shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/5 relative z-10 group overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 scanner-line"></div>
        
        <div className="mb-12 text-center relative">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(99,102,241,0.4)] border-4 border-white/10 transition-transform duration-700 group-hover:rotate-[360deg]">
            <Fingerprint size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white italic leading-none mb-4 text-glow-indigo">CareSync_Pro</h1>
          <div className="flex items-center justify-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
                <Translate targetLanguage={language}>Fleet_Deployment_Portal</Translate>
             </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4 text-center italic">
            <Translate targetLanguage={language}>Authorization_Required_for_Sector_Access</Translate>
          </p>
          
          <div className="grid grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-2 scrollbar-hide">
            {personas.map(p => (
              <button
                key={p.name + p.role}
                onClick={() => onLogin(p)}
                className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl text-left hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all group/item flex justify-between items-center relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="text-sm font-black text-white uppercase italic tracking-tight group-hover/item:text-glow-indigo transition-all">{p.name}</p>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1 group-hover/item:text-indigo-400 transition-colors flex items-center gap-2">
                    <ShieldCheck size={10} /> <Translate targetLanguage={language}>{p.role}</Translate>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all translate-x-4 group-hover/item:translate-x-0 relative z-10 shadow-lg">
                  <ChevronRight size={16} className="text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 opacity-30">
            <Lock size={12} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">AES_256_Encrypted</span>
          </div>
          <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Auth_Node: 12.92.11.X</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
