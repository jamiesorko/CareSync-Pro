
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';

// Portals
import CEOPortal from './features/ceo/CEOPortal';
import COOTerminal from './features/executive/COOTerminal';
import RNPortal from './features/rn/RNPortal';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import ClientPortal from './features/client/ClientPortal';
import HSSPortal from './features/hss/HSSPortal';
import HRTerminal from './features/hr/HRTerminal';
import CoordinationHub from './features/CoordinationHub';

// Features
import VideoLab from './features/VideoLab';
import LiveLab from './features/LiveLab';
import DocumentVault from './features/DocumentVault';
import StrategicSimulator from './features/ceo/StrategicSimulator';

import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';
import { useTranslation } from './contexts/TranslationContext';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const { language } = useTranslation();

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const baseProps = { 
    clients: MOCK_CLIENTS, 
    staff: MOCK_STAFF, 
    user, 
    role: user.role, 
    staffName: user.name,
    language 
  };

  /**
   * Global Content Resolver
   * Maps navigation intent to specific modular portals.
   */
  const renderContent = () => {
    // 1. Explicit Tab Mapping (Accessible by all authorized roles)
    switch (activeTab) {
      case AppTab.STRATEGY: 
        return <StrategicSimulator language={language} />;
      case AppTab.CLINICAL: 
        // Handles RN/RPN specific clinical governance
        return <RNPortal {...baseProps} />;
      case AppTab.LOGISTICS: 
        return <CoordinationHub language={language} />;
      case AppTab.FISCAL: 
        return <AccountingTerminal {...baseProps} />;
      case AppTab.RESOURCE: 
        return <HRTerminal {...baseProps} />;
      case AppTab.VAULT: 
        return <DocumentVault {...baseProps} />;
      case AppTab.WELLNESS: 
        return <ClientPortal {...baseProps} />;
      case AppTab.LIVE: 
        return <LiveLab language={language} />;
      case AppTab.DASHBOARD:
      default:
        // Role-Based Default Dashboards
        switch (user.role) {
          case CareRole.CEO: return <CEOPortal {...baseProps} />;
          case CareRole.COO: return <COOTerminal {...baseProps} />;
          case CareRole.DOC: return <RNPortal {...baseProps} />;
          case CareRole.ACCOUNTANT: return <AccountingTerminal {...baseProps} />;
          case CareRole.CLIENT: return <ClientPortal {...baseProps} />;
          case CareRole.HSS: return <HSSPortal {...baseProps} />;
          case CareRole.COORDINATOR: return <CoordinationHub language={language} />;
          case CareRole.HR_SPECIALIST: return <HRTerminal {...baseProps} />;
          default: return <ProfessionalTerminal {...baseProps} />;
        }
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none font-sans">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
        lang={language}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header active={activeTab} user={user} lang={language} />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full animate-fade-up">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
