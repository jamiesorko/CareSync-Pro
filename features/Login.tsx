
import React from 'react';
import { CareRole, User } from '../types';
import { Fingerprint } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const personas = [
    { name: 'Jamie Sorko', role: CareRole.CEO },
    { name: 'Tom Hardy', role: CareRole.RN },
    { name: 'Elena R.', role: CareRole.PSW }
  ];

  return (
    <div className="h-full flex items-center justify-center p-8 bg-[#010411]">
      <div className="tactical-glass p-16 rounded-[4rem] w-full max-w-md shadow-2xl">
        <div className="mb-12">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white mb-6">CP</div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase text-white">CareSync_Pro</h1>
          <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mt-2">Identity_Handshake</p>
        </div>

        <div className="space-y-3">
          {personas.map(p => (
            <button
              key={p.name}
              onClick={() => onLogin(p)}
              className="w-full p-6 tactical-glass rounded-3xl text-left hover:bg-white/5 transition-all group border border-white/5"
            >
              <p className="text-sm font-black text-white">{p.name}</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 group-hover:text-sky-400">{p.role}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
