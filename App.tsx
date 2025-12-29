
import React, { useState } from 'react';
import { CareRole, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';
import Dashboard from './features/Dashboard';
import ScheduleView from './features/ScheduleView';
import RNCommandCenter from './features/rn/RNCommandCenter';
import CoordinationHub from './features/CoordinationHub';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; role: CareRole } | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  if (!user) {
    return <Login onLogin={(role, name) => setUser({ name, role })} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language="English" />;
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language="English" />;
      case AppTab.CLINICAL_COMMAND:
        return <RNCommandCenter language="English" />;
      case AppTab.COORDINATION:
        return <CoordinationHub language="English" blasts={{}} setBlasts={() => {}} />;
      default:
        return (
          <div className="flex items-center justify-center h-full opacity-20 text-2xl font-black italic uppercase tracking-widest">
            Module_Not_Implemented
          </div>
        );
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      activeRole={user.role} 
      staffName={user.name}
      onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
