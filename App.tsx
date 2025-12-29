
import React, { useState } from 'react';
import { User, CareRole } from './types';
import Login from './features/Login';
import CEODashboard from './features/ceo/Dashboard';
import { LayoutDashboard, Shield, Database, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="flex h-screen w-full bg-[#010411] text-slate-100 overflow-hidden">
      {/* Tactical Mini-Sidebar */}
      <aside className="w-24 bg-black border-r border-white/5 flex flex-col items-center py-10 gap-10">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-2xl shadow-indigo-500/20">CP</div>
        
        <nav className="flex flex-col gap-6">
          <button className="p-4 rounded-2xl bg-white text-black shadow-2xl scale-110">
            <LayoutDashboard size={22} strokeWidth={2.5} />
          </button>
          <button className="p-4 rounded-2xl text-slate-600 hover:text-white hover:bg-white/5 transition-all">
            <Database size={22} strokeWidth={2.5} />
          </button>
          <button className="p-4 rounded-2xl text-slate-600 hover:text-white hover:bg-white/5 transition-all">
            <Shield size={22} strokeWidth={2.5} />
          </button>
        </nav>

        <button onClick={() => setUser(null)} className="mt-auto p-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all">
          <LogOut size={22} />
        </button>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 overflow-y-auto">
        {user.role === CareRole.CEO && <CEODashboard />}
        {user.role !== CareRole.CEO && (
          <div className="h-full flex items-center justify-center opacity-20 italic">
            <h2 className="text-2xl font-black uppercase tracking-[0.5em]">Sector_{user.role}_Active</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
