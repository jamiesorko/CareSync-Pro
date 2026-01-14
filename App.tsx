
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';

// Modular Portals
import CEOPortal from './features/ceo/CEOPortal';
import COOTerminal from './features/executive/COOTerminal';
import DOCPortal from './features/clinical/DOCPortal';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
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
   * Universal Content Resolver
   * Priority 1: High-Utility Special Modules (Vault, Live, Zen)
   * Priority 2: Function-Specific Hubs (Accounting/Fiscal, Logistics, HR)
   * Priority 3: Primary Role-Specific Dashboards
   */
  const renderContent = () => {
    // 1. Explicit Module Overrides
    if (activeTab === AppTab.LIVE) return <LiveLab language={language} />;
    if (activeTab === AppTab.WELLNESS) return <VideoLab language={language} />;
    if (activeTab === AppTab.VAULT) return <DocumentVault {...baseProps} />;
    if (activeTab === AppTab.STRATEGY) return <StrategicSimulator language={language} />;
    
    // 2. High-Priority Functional Modules
    if (activeTab === AppTab.FISCAL) return <AccountingTerminal {...baseProps} />;
    if (activeTab === AppTab.RESOURCE) return <HRTerminal {...baseProps} />;
    if (activeTab === AppTab.LOGISTICS) return <CoordinationHub language={language} />;

    // 3. Role-Based Primary Navigation (Dashboard fallback)
    switch (user.role) {
      case CareRole.CEO:
        return <CEOPortal {...baseProps} />;
      case CareRole.COO:
        return <COOTerminal {...baseProps} />;
      case CareRole.DOC:
        return <DOCPortal {...baseProps} />;
      case CareRole.ACCOUNTANT:
        return <AccountingTerminal {...baseProps} />;
      case CareRole.CLIENT:
        return <ClientPortal {...baseProps} />;
      case CareRole.HSS:
        return <HSSPortal {...baseProps} />;
      case CareRole.COORDINATOR:
        return <CoordinationHub language={language} />;
      case CareRole.HR_SPECIALIST:
        return <HRTerminal {...baseProps} />;
      default:
        // RN, RPN, PSW fallback
        return <ProfessionalTerminal {...baseProps} />;
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
