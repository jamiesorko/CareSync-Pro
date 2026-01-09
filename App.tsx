
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';

// Modular Feature Portals
import CEOPortal from './features/ceo/CEOPortal';
import COOPortal from './features/executive/COOTerminal';
import DOCPortal from './features/clinical/DOCPortal';
import RNPortal from './features/rn/RNPortal';
import PSWPortal from './features/psw/PSWPortal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import ClientPortal from './features/client/ClientPortal';
import HSSPortal from './features/hss/HSSPortal';
import HRTerminal from './features/hr/HRTerminal';
import CoordinationHub from './features/CoordinationHub';

// Shared Utilities
import VideoLab from './features/VideoLab';
import LiveLab from './features/LiveLab';
import DocumentVault from './features/DocumentVault';
import StrategicSimulator from './features/ceo/StrategicSimulator';

import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState('English');

  if (!user) {
    return <Login onLogin={setUser} language={language} onLanguageChange={setLanguage} />;
  }

  const renderActiveProgram = () => {
    const props = { language, clients: MOCK_CLIENTS, staff: MOCK_STAFF, user, role: user.role, staffName: user.name };
    
    // Core Navigation Override
    switch (activeTab) {
      case AppTab.LIVE: return <LiveLab language={language} />;
      case AppTab.WELLNESS: return <VideoLab language={language} />;
      case AppTab.VAULT: return <DocumentVault {...props} />;
      case AppTab.STRATEGY: return <StrategicSimulator language={language} />;
      case AppTab.RESOURCE: return <HRTerminal {...props} />;
      case AppTab.LOGISTICS: return <CoordinationHub language={language} />;
      case AppTab.FISCAL: 
        if (user.role === CareRole.DOC) break; 
        return <AccountingTerminal {...props} />;
    }

    // Role-Based Landing Logic
    switch (user.role) {
      case CareRole.CEO: return <CEOPortal {...props} />;
      case CareRole.COO: return <COOPortal {...props} />;
      case CareRole.DOC: return <DOCPortal {...props} />;
      case CareRole.RN: 
      case CareRole.RPN: return <RNPortal {...props} />;
      case CareRole.PSW: return <PSWPortal {...props} />;
      case CareRole.ACCOUNTANT: return <AccountingTerminal {...props} />;
      case CareRole.CLIENT: return <ClientPortal {...props} />;
      case CareRole.HSS: return <HSSPortal {...props} />;
      case CareRole.COORDINATOR: return <CoordinationHub language={language} />;
      case CareRole.HR_SPECIALIST: return <HRTerminal {...props} />;
      default: return <PSWPortal {...props} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none font-sans">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        lang={language}
        onLogout={() => {
          setUser(null);
          setActiveTab(AppTab.DASHBOARD);
        }}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header 
          active={activeTab} 
          lang={language} 
          setLang={setLanguage} 
          user={user} 
        />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-8 relative">
          <div className="max-w-7xl mx-auto h-full animate-fade-up">
            {renderActiveProgram()}
          </div>
        </main>
      </div>
    </div>
  );
}
