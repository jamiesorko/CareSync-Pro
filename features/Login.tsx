
import React from 'react';
import { CareRole, User } from '../types';
import { ShieldCheck, UserCircle, Users, Activity, HeartPulse, Wallet, GraduationCap } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import Translate from '../components/Translate';
import Logo from '../components/Logo';

interface Props {
  onLogin: (user: User) => void;
  // Added optional language and onLanguageChange props to satisfy usage in app/page.tsx while maintaining compatibility with App.tsx
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

const Login: React.FC<Props> = ({ onLogin, language, onLanguageChange }) => {
  const personas: (User & { icon: any, color: string })[] = [
    { name: 'Jamie Sorko', role: CareRole.CEO, icon: Activity, color: 'text-indigo-400' },
    { name: 'Sarah Walker', role: CareRole.DOC, icon: ShieldCheck, color: 'text-rose-400' },
    { name: 'Tom Hardy', role: CareRole.RN, icon: HeartPulse, color: 'text-sky-400' },
    { name: 'Jared Leto', role: CareRole.RPN, icon: Activity, color: 'text-cyan-400' },
    { name: 'Marcus Bell', role: CareRole.HSS, icon: Users, color: 'text-purple-400' },
    { name: 'Elena R.', role: CareRole.PSW, icon: UserCircle, color: 'text-orange-400' },
    { name: 'Kevin Malone', role: CareRole.ACCOUNTANT, icon: Wallet, color: 'text-emerald-400' },
    { name: 'Robert Johnson', role: CareRole.CLIENT, icon: Activity, color: 'text-teal-400' },
    { name: 'Toby F.', role: CareRole.HR_SPECIALIST, icon: GraduationCap, color: 'text-indigo-400' },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full"></div>
      
      <div className="absolute top-10 right-10 z-50">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"></div>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Logo className="w-14 h-14" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            <Translate>CareSync_Pro</Translate>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">
             <Translate>IDENTITY_VALIDATION_REQUIRED</Translate>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto scrollbar-hide pr-2">
          {personas.map(p => (
            <button
              key={p.role}
              onClick={() => onLogin({ name: p.name, role: p.role })}
              className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-white/5 ${p.color}`}>
                   <p.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase italic tracking-tight">{p.name}</p>
                  <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">
                    <Translate>{p.role}</Translate>
                  </p>
                </div>
              </div>
              <span className="text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-all">→</span>
            </button>
          ))}
        </div>
      </div>
      
      <p className="mt-8 text-[10px] font-bold text-slate-700 uppercase tracking-widest italic opacity-50">
        <Translate>Institutional_Sovereignty_Node_v8.0</Translate>
      </p>
    </div>
  );
};

export default Login;
