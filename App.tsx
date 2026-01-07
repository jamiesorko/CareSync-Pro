
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
import EthicsAdvisoryBoard from './features/doc/EthicsAdvisoryBoard';
import NeuralSentinelHub from './features/clinical/NeuralSentinelHub';
import AfterActionStation from './features/clinical/AfterActionStation';
import ForensicDiscoveryStation from './features/executive/ForensicDiscoveryStation';
import MarketDominanceHub from './features/ceo/MarketDominanceHub';
import GuardianEscort from './features/psw/GuardianEscort';
import CognitiveMatrix from './features/clinical/CognitiveMatrix';
import { MOCK_CLIENTS } from './data/careData';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [lang, setLang] = useState('English');

  if (!user) return <Login onLogin={setUser} lang={lang} setLang={setLang} />;

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
      case AppTab.STRATEGY:
        return <StrategyTabletop lang={lang} />;
      case AppTab.CLINICAL:
      case AppTab.CLINICAL_COMMAND:
        return (
          <div className="space-y-12">
            <EthicsAdvisoryBoard language={lang} clients={MOCK_CLIENTS} />
            <NeuralSentinelHub language={lang} clients={MOCK_CLIENTS} />
            <AfterActionStation language={lang} clients={MOCK_CLIENTS} />
            <CognitiveMatrix language={lang} clients={MOCK_CLIENTS} />
          </div>
        );
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
      case AppTab.ORG_COMMAND:
        return (
          <div className="space-y-12">
            <MarketDominanceHub language={lang} />
            <ForensicDiscoveryStation language={lang} clients={MOCK_CLIENTS} />
          </div>
        );
      default:
        return <Dashboard language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        lang={lang} 
        onLogout={() => setUser(null)} 
      />
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
          
          {user.role === CareRole.PSW && activeTab === AppTab.DASHBOARD && (
            <div className="mt-12">
               <GuardianEscort language={lang} clients={MOCK_CLIENTS} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
