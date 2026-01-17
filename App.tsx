
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
import HRPortal from './features/HRPortal';
import CoordinationHub from './features/CoordinationHub';

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

  const renderContent = () => {
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
      case AppTab.COORDINATION:
        return <CoordinationHub language={language} />;
      default:
        switch (user.role) {
          case CareRole.CEO: return <CEOPortal {...baseProps} />;
          case CareRole.COO: return <COOTerminal {...baseProps} />;
          case CareRole.ACCOUNTANT: return <AccountingTerminal {...baseProps} />;
          case CareRole.CLIENT: return <ClientPortal {...baseProps} />;
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
    <div className="sovereign-shell bg-[#020617] text-slate-100 font-sans">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
        lang={language}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <Header active={activeTab} user={user} lang={language} />
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1600px] mx-auto p-4 lg:p-10 animate-fade-up min-h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
