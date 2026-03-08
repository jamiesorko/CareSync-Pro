import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import { Dashboard } from './features/Dashboard';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';
import { useTranslation } from './contexts/TranslationContext';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const { language } = useTranslation();

  if (!user) return <Login onLogin={setUser} />;

  const baseProps = { clients: MOCK_CLIENTS, staff: MOCK_STAFF, user, language };

  const renderContent = () => {
    if (activeTab === AppTab.DASHBOARD) {
      return <Dashboard lang={language} staffName={user.name} clients={MOCK_CLIENTS} setActiveTab={setActiveTab} />;
    }
    switch (activeTab) {
      case AppTab.FISCAL: 
      case AppTab.FINANCE:
        return <AccountingTerminal language={language} staffName={user.name} clients={MOCK_CLIENTS} staff={MOCK_STAFF} />;
      default:
        return <Dashboard {...baseProps} staffName={user.name} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="fixed inset-0 flex h-full w-full bg-[#020617] text-slate-100 overflow-hidden">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header active={activeTab} user={user} lang={language} />
        <main className="flex-1 overflow-y-auto bg-[#020617] p-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}