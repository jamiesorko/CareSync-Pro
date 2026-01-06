import React, { useState } from 'react';
import { CareRole, User, AppTab } from './types';
import Sidebar from './components/Sidebar';
import Login from './features/Login';
import Dashboard from './features/Dashboard';
import { Search, Bell, Settings, UserCircle } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD: return <Dashboard />;
      default: return (
        <div className="h-full flex items-center justify-center opacity-30 italic">
          <p className="text-xl uppercase tracking-widest font-black">Vector_{activeTab.replace(' ', '_')}_Locked</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden select-none">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={user.role} 
        onLogout={() => setUser(null)}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 backdrop-blur-xl">
          <div className="flex flex-col">
            <p className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-0.5">Active Protocol</p>
            <h2 className="text-sm font-black text-white uppercase italic tracking-widest">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-2xl group focus-within:border-indigo-500/50 transition-all">
              <Search size={16} className="text-slate-500 group-focus-within:text-indigo-400" />
              <input type="text" placeholder="..." className="bg-transparent border-none text-xs text-slate-200 outline-none w-48 font-medium" />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-400 hover:text-white transition-all"><Bell size={18} /></button>
              <button className="p-2.5 text-slate-400 hover:text-white transition-all"><Settings size={18} /></button>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-white uppercase italic leading-none">{user.name}</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <UserCircle size={22} />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto scrollbar-hide p-10">
          <div className="max-w-[1400px] mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
