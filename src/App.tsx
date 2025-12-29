
import React, { useState } from 'react';
import CEODashboard from './features/ceo/Dashboard';
import { CareRole, User } from './types';
import { LayoutDashboard, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [user] = useState<User>({ name: 'Jamie Sorko', role: CareRole.CEO });

  return (
    <div className="flex h-screen w-full bg-[#010411] text-slate-100 overflow-hidden">
      <aside className="w-24 bg-black border-r border-white/5 flex flex-col items-center py-10 gap-10">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-2xl">CP</div>
        <nav className="flex flex-col gap-6">
          <button className="p-4 rounded-2xl bg-white text-black shadow-2xl scale-110">
            <LayoutDashboard size={22} strokeWidth={2.5} />
          </button>
        </nav>
        <button className="mt-auto p-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all">
          <LogOut size={22} />
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {user.role === CareRole.CEO && <CEODashboard />}
      </main>
    </div>
  );
};

export default App;
