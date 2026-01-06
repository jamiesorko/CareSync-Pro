
import React from 'react';
import { CareRole, User } from './types';
import { Fingerprint } from 'lucide-react';

export const Login = ({ onLogin, lang, setLang }: any) => {
  const personas: User[] = [
    { name: 'Jamie Sorko', role: CareRole.CEO },
    { name: 'Sarah Walker', role: CareRole.DOC },
    { name: 'Elena R.', role: CareRole.PSW },
    { name: 'Kevin Malone', role: CareRole.ACCOUNTANT },
  ];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#020617] p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"></div>
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Fingerprint size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">CareSync_Pro</h1>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Identity_Validation_Required</p>
        </div>

        <div className="space-y-4 mb-10">
           {personas.map(p => (
             <button
              key={p.name}
              onClick={() => onLogin(p)}
              className="w-full p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all group"
             >
                <div className="text-left">
                  <p className="text-sm font-black text-white uppercase italic">{p.name}</p>
                  <p className="text-[8px] font-bold text-slate-500 uppercase">{p.role}</p>
                </div>
                <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
             </button>
           ))}
        </div>

        <select 
          value={lang} 
          onChange={e => setLang(e.target.value)}
          className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-[10px] font-black uppercase text-center text-slate-500 outline-none hover:text-white transition-colors"
        >
          {['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Hindi'].map(l => <option key={l} value={l} className="bg-slate-900">{l}</option>)}
        </select>
      </div>
    </div>
  );
};
