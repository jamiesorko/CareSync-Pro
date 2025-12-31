
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
    { name: 'Toby Flenderson', role: CareRole.HR_SPECIALIST },
    { name: 'Kevin Malone', role: CareRole.ACCOUNTANT },
    { name: 'Marcus Bell', role: CareRole.HSS },
    { name: 'Robert Johnson', role: CareRole.COORDINATOR }
  ];

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="alaya-card p-10 rounded-[3rem] w-full max-w-sm shadow-2xl border-white/10">
        <div className="mb-10 text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white mb-6 mx-auto shadow-2xl">CP</div>
          <h1 className="text-2xl font-black tracking-tight uppercase text-white italic leading-none">CareSync Pro</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3">Fleet Deployment Portal</p>
        </div>
        <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          {personas.map(p => (
            <button
              key={p.name + p.role}
              onClick={() => onLogin(p)}
              className="w-full p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-left hover:bg-white/10 transition-all group flex justify-between items-center"
            >
              <div>
                <p className="text-xs font-black text-white uppercase italic tracking-tighter">{p.name}</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 group-hover:text-indigo-400 transition-colors">{p.role}</p>
              </div>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
