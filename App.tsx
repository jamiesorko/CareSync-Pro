
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';

// Portal Components
import CEOPortal from './features/ceo/CEOPortal';
import COOTerminal from './features/executive/COOTerminal';
import RNPortal from './features/rn/RNPortal';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import ClientPortal from './features/client/ClientPortal';
import HSSPortal from './features/hss/HSSPortal';
import HRPortal from './features/HRPortal'; // HR is HRPortal in the root features
import CoordinationHub from './features/CoordinationHub';

// Specialized Features
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
   * Deterministic Feature Resolver
   * Priority: Explicit Sidebar Tab Selection -> Default Role Dashboard
   */
  const renderContent = () => {
    // 1. Check for explicit tab overrides
    switch (activeTab) {
      case AppTab.FISCAL: 
      case AppTab.FINANCE:
        return <AccountingTerminal {...baseProps} />;
      case AppTab.RESOURCE:
      case AppTab.HR_HUB:
        return <HRPortal {...baseProps} />;
      case AppTab.CLINICAL:
      case AppTab.CLINICAL_COMMAND:
        return <RNPortal {...baseProps} />;
      case AppTab.WELLNESS:
        return <ClientPortal {...baseProps} />;
      case AppTab.LOGISTICS:
      case AppTab.COORDINATION:
      case AppTab.SCHEDULE:
        return <CoordinationHub language={language} />;
      case AppTab.STRATEGY:
        return <StrategicSimulator language={language} />;
      case AppTab.VAULT:
        return <DocumentVault {...baseProps} />;
      case AppTab.LIVE:
        return <LiveLab language={language} />;
      case AppTab.DASHBOARD:
      default:
        // 2. Fallback to Primary Role Dashboard
        switch (user.role) {
          case CareRole.CEO: return <CEOPortal {...baseProps} />;
          case CareRole.COO: return <COOTerminal {...baseProps} />;
          case CareRole.DOC: return <RNPortal {...baseProps} />;
          case CareRole.ACCOUNTANT: return <AccountingTerminal {...baseProps} />;
          case CareRole.CLIENT: return <ClientPortal {...baseProps} />;
          case CareRole.HSS: return <HSSPortal {...baseProps} />;
          case CareRole.HR_SPECIALIST: return <HRPortal {...baseProps} />;
          case CareRole.COORDINATOR: return <CoordinationHub language={language} />;
          case CareRole.RN:
          case CareRole.RPN:
          case CareRole.PSW:
            return <ProfessionalTerminal {...baseProps} />;
          default:
            return <CEOPortal {...baseProps} />;
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
