
import React from 'react';
import { CareRole, User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const personas = [
    { name: 'Jamie Sorko', role: CareRole.CEO },
    { name: 'Tom Hardy', role: CareRole.RN },
    { name: 'Elena R.', role: CareRole.PSW },
    { name: 'Marcus Bell', role: CareRole.HSS },
    // Fix: Corrected enum member name from COORD to COORDINATOR
    { name: 'Robert Johnson', role: CareRole.COORDINATOR } // Coordinator/Client role for demo
  ];

  return (
    <div className="h-screen flex items-center justify-center p-8 bg-[#010411]">
      <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] w-full max-w-lg shadow-2xl backdrop-blur-xl">
        <div className="mb-12">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white mb-6 shadow-[0_0_20px_rgba(79,70,229,0.4)]">CP</div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase text-white leading-none">CareSync_Pro</h1>
          <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mt-3">Institutional_Fleet_Handshake</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {personas.map(p => (
            <button
              key={p.name}
              onClick={() => onLogin(p)}
              className="w-full p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-left hover:bg-white/5 transition-all group relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-sm font-black text-white uppercase italic">{p.name}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 group-hover:text-sky-400">{p.role}</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="text-4xl font-black italic">{p.role[0]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
