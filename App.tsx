
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Dashboard } from './features/Dashboard';
import RNCommand from './features/rn/RNCommand';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import HRPortal from './features/HRPortal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import DocumentVault from './features/DocumentVault';
import LiveLab from './features/LiveLab';
import CoordinationHub from './features/CoordinationHub';
import Login from './features/Login';
import PatientWellnessHub from './features/client/PatientWellnessHub';
import MarketDominanceHub from './features/ceo/MarketDominanceHub';
import ForensicDiscoveryStation from './features/executive/ForensicDiscoveryStation';
import CEODashboard from './features/ceo/CEODashboard';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState('English');

  if (!user) {
    return <Login onLogin={setUser} language={language} onLanguageChange={setLanguage} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        if (user.role === CareRole.CEO) return <CEODashboard />;
        return <Dashboard language={language} staffName={user.name} clients={MOCK_CLIENTS} />;
      
      case AppTab.CLINICAL:
      case AppTab.CLINICAL_COMMAND:
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} language={language} />;
      
      case AppTab.LOGISTICS:
        return <CoordinationHub language={language} />;
      
      case AppTab.RESOURCE:
      case AppTab.HR_HUB:
      case AppTab.HR_PORTAL:
        return <HRPortal role={user.role} language={language} />;
      
      case AppTab.FISCAL:
      case AppTab.FINANCE:
      case AppTab.FINANCIAL:
        return <AccountingTerminal language={language} staffName={user.name} clients={MOCK_CLIENTS} />;
      
      case AppTab.VAULT:
        return <DocumentVault role={user.role} language={language} />;
      
      case AppTab.WELLNESS:
        return <PatientWellnessHub language={language} clients={MOCK_CLIENTS} />;
      
      case AppTab.LIVE:
        return <LiveLab language={language} />;
      
      case AppTab.ORG_COMMAND:
        return (
          <div className="space-y-16">
            <MarketDominanceHub language={language} />
            <ForensicDiscoveryStation language={language} clients={MOCK_CLIENTS} />
          </div>
        );

      case AppTab.SCHEDULE:
        return <ProfessionalTerminal clients={MOCK_CLIENTS} role={user.role} staffName={user.name} language={language} />;

      default:
        return <Dashboard language={language} staffName={user.name} clients={MOCK_CLIENTS} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={user.role} 
        onLogout={() => setUser(null)} 
        language={language}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header 
          activeTab={activeTab} 
          language={language} 
          onLanguageChange={setLanguage} 
          onLogout={() => setUser(null)} 
        />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-8 relative">
          <div className="max-w-7xl mx-auto pb-24">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
