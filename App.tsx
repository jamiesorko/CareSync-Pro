
import React, { useState } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';
import CEODashboard from './features/ceo/Dashboard';
import CommandBridge from './features/executive/CommandBridge';
import AccountingHub from './features/accounting/AccountingHub';
import IncidentCommandFeed from './features/clinical/IncidentCommandFeed';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [signals, setSignals] = useState([]);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <CEODashboard />;
      case AppTab.CLINICAL_COMMAND:
        return <CommandBridge language="English" clients={MOCK_CLIENTS} staff={MOCK_STAFF} />;
      case AppTab.INCIDENT_REPORTS:
        return <IncidentCommandFeed signals={signals} onAcknowledge={() => {}} language="English" />;
      case AppTab.ORG_COMMAND:
        return <AccountingHub language="English" alerts={[]} setAlerts={() => {}} clients={MOCK_CLIENTS} />;
      default:
        return <div className="h-full flex items-center justify-center opacity-20 italic">Node synchronized. Awaiting command.</div>;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      activeRole={user.role} 
      staffName={user.name} 
      onLogout={() => setUser(null)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
