
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import { Sidebar } from './Sidebar';
import { Dashboard } from './features/Dashboard';
import { StrategyTabletop } from './StrategyTabletop';
import { ProtocolArchitect } from './ProtocolArchitect';
import { ZenStation } from './ZenStation';
import { Login } from './Login';
import HRPortal from './features/hr/HRPortal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import DocumentVault from './features/DocumentVault';
import LiveLab from './features/LiveLab';
import CoordinationHub from './features/CoordinationHub';
import { MOCK_CLIENTS } from './data/careData';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [lang, setLang] = useState('English');

  if (!user) return <Login onLogin={setUser} lang={lang} setLang={setLang} />;

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard lang={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
      case AppTab.STRATEGY:
        return <StrategyTabletop lang={lang} />;
      case AppTab.CLINICAL:
        return <ProtocolArchitect lang={lang} />;
      case AppTab.WELLNESS:
        return <ZenStation lang={lang} />;
      case AppTab.HR_HUB:
      case AppTab.RESOURCE:
        return <HRPortal role={user.role} language={lang} />;
      case AppTab.FINANCE:
      case AppTab.FISCAL:
        return <AccountingTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
      case AppTab.VAULT:
        return <DocumentVault role={user.role} language={lang} />;
      case AppTab.LIVE:
        return <LiveLab language={lang} />;
      case AppTab.LOGISTICS:
      case AppTab.COORDINATION:
        return <CoordinationHub language={lang} />;
      default:
        return <Dashboard lang={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden">
      <Sidebar active={activeTab} setActive={setActiveTab} role={user.role} lang={lang} onLogout={() => setUser(null)} />
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
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
