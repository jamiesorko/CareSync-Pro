
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Login } from './features/Login';
import { Dashboard } from './features/Dashboard';
import { StrategyTabletop } from './features/StrategyTabletop';
import { ClinicalHub } from './features/ClinicalHub';
import { FleetCommand } from './features/FleetCommand';
import { FiscalLedger } from './features/FiscalLedger';
import { NeuralVault } from './features/NeuralVault';
import { PatientZen } from './features/PatientZen';
import { ResourceCore } from './features/ResourceCore';
import { DirectLink } from './features/DirectLink';
import { StrategicMoat } from './features/StrategicMoat';

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
      case AppTab.CLINICAL: return <ClinicalHub lang={language} />;
      case AppTab.LOGISTICS: return <FleetCommand lang={language} />;
      case AppTab.FISCAL: return <FiscalLedger lang={language} />;
      case AppTab.VAULT: return <NeuralVault lang={language} />;
      case AppTab.WELLNESS: return <PatientZen lang={language} />;
      case AppTab.RESOURCE: return <ResourceCore lang={language} />;
      case AppTab.LIVE: return <DirectLink lang={language} />;
      case AppTab.ORG_COMMAND: return <StrategicMoat lang={language} />;
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
        <Header active={activeTab} lang={language} setLang={setLanguage} user={user} />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
