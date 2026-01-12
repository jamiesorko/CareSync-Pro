
import React, { useState } from 'react';
// Consolidated imports to root types.ts to ensure enum compatibility (fixes Error on line 75)
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

  // 1. Resolve Global Tabs (Highest Priority)
  const globalTabMap: Partial<Record<AppTab, React.ReactNode>> = {
    [AppTab.LIVE]: <LiveLab language={language} />,
    [AppTab.WELLNESS]: <VideoLab language={language} />,
    [AppTab.VAULT]: <DocumentVault {...baseProps} />,
    [AppTab.STRATEGY]: <StrategicSimulator language={language} />,
    [AppTab.RESOURCE]: <HRTerminal {...baseProps} />,
    [AppTab.LOGISTICS]: <CoordinationHub language={language} />
  };

  // 2. Resolve Role Portals
  const rolePortalMap: Record<CareRole, React.ReactNode> = {
    [CareRole.CEO]: <CEOPortal {...baseProps} />,
    [CareRole.COO]: <COOTerminal {...baseProps} />,
    [CareRole.DOC]: <DOCPortal {...baseProps} />,
    [CareRole.ACCOUNTANT]: <AccountingTerminal {...baseProps} />,
    [CareRole.CLIENT]: <ClientPortal {...baseProps} />,
    [CareRole.HSS]: <HSSPortal {...baseProps} />,
    [CareRole.COORDINATOR]: <CoordinationHub language={language} />,
    [CareRole.HR_SPECIALIST]: <HRTerminal {...baseProps} />,
    [CareRole.RN]: <ProfessionalTerminal {...baseProps} />,
    [CareRole.RPN]: <ProfessionalTerminal {...baseProps} />,
    [CareRole.PSW]: <ProfessionalTerminal {...baseProps} />,
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none font-sans">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header active={activeTab} user={user} />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full animate-fade-up">
            {globalTabMap[activeTab] || rolePortalMap[user.role]}
          </div>
        </main>
      </div>
    </div>
  );
}
