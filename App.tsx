
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { StrategyTabletop } from './StrategyTabletop';
import { ProtocolArchitect } from './ProtocolArchitect';
import { ZenStation } from './ZenStation';
import { Login } from './Login';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [lang, setLang] = useState('English');

  if (!user) return <Login onLogin={setUser} lang={lang} setLang={setLang} />;

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden">
      <Sidebar active={activeTab} setActive={setActiveTab} role={user.role} lang={lang} />
      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide relative">
        <div className="max-w-7xl mx-auto space-y-10">
          <header className="flex justify-between items-center border-b border-white/5 pb-8">
            <div>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-1">Vector_Active</p>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">{activeTab}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-white uppercase italic">{user.name}</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase">{user.role}</p>
            </div>
          </header>

          {activeTab === AppTab.DASHBOARD && <Dashboard lang={lang} />}
          {activeTab === AppTab.STRATEGY && <StrategyTabletop lang={lang} />}
          {activeTab === AppTab.CLINICAL && <ProtocolArchitect lang={lang} />}
          {activeTab === AppTab.WELLNESS && <ZenStation lang={lang} />}
        </div>
      </main>
    </div>
  );
}
