
'use client';

import React from 'react';
import { CareRole } from '../types';
import { Shield, UserCheck, Fingerprint } from 'lucide-react';

interface Props {
  onLogin: (role: CareRole, name: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const personas = [
    { name: 'Tom Hardy', role: CareRole.RN },
    { name: 'Linda White', role: CareRole.PSW },
    { name: 'Sam Gamgee', role: CareRole.RPN },
    { name: 'Robert Johnson', role: CareRole.CLIENT }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 bg-[#010411] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="bg-[#0a0f1e]/80 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 shadow-[0_0_120px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <Fingerprint size={200} />
          </div>
          
          <div className="mb-16">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-2xl mb-8">
              CP
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">CareSync_Pro</h1>
            <p className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-[0.5em] flex items-center gap-3">
              <span className="w-2 h-px bg-indigo-500/50"></span>
              Identity_Handshake
              <span className="w-2 h-px bg-indigo-500/50"></span>
            </p>
          </div>

          <div className="space-y-3">
            {personas.map(p => (
              <button
                key={p.name}
                onClick={() => onLogin(p.role, p.name)}
                className="w-full p-6 bg-white/5 border border-white/5 rounded-[2rem] text-left hover:bg-indigo-600 transition-all duration-300 group flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-black text-white mb-1 group-hover:translate-x-1 transition-transform">{p.name}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-indigo-200 transition-colors">{p.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                  <UserCheck size={18} className="text-slate-600 group-hover:text-white" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="text-[8px] font-black text-slate-700 text-center uppercase tracking-[0.2em] italic">
              Encrypted institutional session via AES-256
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
