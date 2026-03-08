import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';

// Import optimized feature nodes
import CEOPortal from './features/ceo/CEOPortal';
import COOTerminal from './features/executive/COOTerminal';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import ClientPortal from './features/client/ClientPortal';
import { Dashboard } from './features/Dashboard';

import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';
import { useTranslation } from './contexts/TranslationContext';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const { language } = useTranslation();

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // Special handling for Client role to provide a focused, standalone experience
  if (user.role === CareRole.CLIENT) {
    return <ClientPortal user={user} clients={MOCK_CLIENTS} language={language} />;
  }

  const baseProps = { 
    clients: MOCK_CLIENTS, 
    staff: MOCK_STAFF, 
    user, 
    language 
  };

  const renderContent = () => {
    // Priority 1: Direct Tab Overrides
    if (activeTab === AppTab.DASHBOARD) {
      return <Dashboard lang={language} staffName={user.name} clients={MOCK_CLIENTS} setActiveTab={setActiveTab} />;
    }

    switch (activeTab) {
      case AppTab.FISCAL: 
      case AppTab.FINANCE:
        return <AccountingTerminal language={language} staffName={user.name} clients={MOCK_CLIENTS} staff={MOCK_STAFF} />;
      
      // Priority 2: Role-based Default Portals
      default:
        switch (user.role) {
          case CareRole.CEO: return <CEOPortal {...baseProps} />;
          case CareRole.COO: return <COOTerminal {...baseProps} staffName={user.name} />;
          case CareRole.ACCOUNTANT: return <AccountingTerminal language={language} staffName={user.name} clients={MOCK_CLIENTS} staff={MOCK_STAFF} />;
          case CareRole.RN:
          case CareRole.RPN:
          case CareRole.PSW:
            return <ProfessionalTerminal {...baseProps} role={user.role} staffName={user.name} />;
          default:
            return <Dashboard {...baseProps} staffName={user.name} setActiveTab={setActiveTab} />;
        }
    }
  };

  return (
    <div className="fixed inset-0 flex h-full w-full bg-[#020617] text-slate-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
        lang={language}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <Header active={activeTab} user={user} lang={language} />
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#020617] relative">
          <div className="max-w-[1600px] mx-auto p-4 lg:p-10 animate-fade-up min-h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}