
import React from 'react';
import { CareRole, User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const personas: User[] = [
    { name: 'Jamie Sorko', role: CareRole.CEO },
    { name: 'Tom Hardy', role: CareRole.RN },
    { name: 'Elena R.', role: CareRole.PSW },
    { name: 'Marcus Bell', role: CareRole.HSS },
    { name: 'Robert Johnson', role: CareRole.COORDINATOR }
  ];

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="alaya-card p-10 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="mb-8 text-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white mb-4 mx-auto">CP</div>
          <h1 className="text-2xl font-bold tracking-tight uppercase text-white">CareSync Pro</h1>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">Fleet Deployment Portal</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {personas.map(p => (
            <button
              key={p.name}
              onClick={() => onLogin(p)}
              className="w-full p-4 bg-white/5 border border-white/5 rounded-xl text-left hover:bg-white/10 transition-all group"
            >
              <p className="text-xs font-bold text-white uppercase">{p.name}</p>
              <p className="text-[9px] font-medium text-slate-500 uppercase mt-0.5 group-hover:text-indigo-400">{p.role}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
