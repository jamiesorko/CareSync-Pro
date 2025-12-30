
import React, { useState } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Sidebar from './components/Sidebar';
import CEODashboard from './features/ceo/Dashboard';
import CommandBridge from './features/executive/CommandBridge';
import AccountingHub from './features/accounting/AccountingHub';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD: return <CEODashboard />;
      case AppTab.CLINICAL_COMMAND: return <CommandBridge language="English" clients={[]} staff={[]} />;
      case AppTab.ORG_COMMAND: return <AccountingHub language="English" alerts={[]} setAlerts={() => {}} clients={[]} />;
      default: return <div className="p-20 opacity-20 italic">Node synchronized.</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#010411] text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
