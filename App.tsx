
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import { Sidebar } from './Sidebar';
import Header from './components/Header';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { StrategyTabletop } from './StrategyTabletop';
import DOCSupervision from './features/doc/DOCSupervision';
import CoordinationHub from './features/CoordinationHub';
import AccountingHub from './features/accounting/AccountingHub';
import DocumentVault from './features/DocumentVault';
import { ZenStation } from './ZenStation';
import HRPortal from './features/HRPortal';
import LiveLab from './features/LiveLab';
import BoardDirectorTerminal from './features/executive/BoardDirectorTerminal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState('English');

  if (!user) {
    return <Login onLogin={setUser} lang={language} setLang={setLanguage} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD: return <Dashboard lang={language} />;
      case AppTab.STRATEGY: return <StrategyTabletop lang={language} />;
      case AppTab.CLINICAL: return <DOCSupervision language={language} />;
      case AppTab.LOGISTICS: return <CoordinationHub language={language} />;
      case AppTab.FISCAL: return <AccountingHub language={language} />;
      case AppTab.VAULT: return <DocumentVault role={user.role} language={language} />;
      case AppTab.WELLNESS: return <ZenStation lang={language} />;
      case AppTab.RESOURCE: return <HRPortal role={user.role} language={language} />;
      case AppTab.LIVE: return <LiveLab language={language} />;
      case AppTab.ORG_COMMAND: return <BoardDirectorTerminal language={language} />;
      default: return <Dashboard lang={language} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        lang={language}
        onLogout={() => setUser(null)}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header 
          active={activeTab} 
          lang={language} 
          setLang={setLanguage} 
          user={user} 
        />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
