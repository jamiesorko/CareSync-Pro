
import React, { useState } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';

// Features (Small, modular imports)
import CEODashboard from './features/ceo/CEODashboard';
import RNCommand from './features/rn/RNCommand';
import PSWTerminal from './features/psw/PSWTerminal';
import HSSCommand from './features/hss/HSSCommand';
import PatientHub from './features/client/PatientHub';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    const role = user.role;
    
    // CEO Features
    if (role === CareRole.CEO) return <CEODashboard />;
    
    // RN Features
    if (role === CareRole.RN || role === CareRole.RPN || role === CareRole.DOC) {
      return <RNCommand clients={MOCK_CLIENTS} role={role} />;
    }
    
    // PSW Features
    if (role === CareRole.PSW) return <PSWTerminal clients={MOCK_CLIENTS} />;
    
    // HSS Features
    if (role === CareRole.HSS) return <HSSCommand clients={MOCK_CLIENTS} />;

    // Client/Patient Features (Mapped to Coordinator role for demo persona Robert Johnson)
    if (role === CareRole.COORDINATOR) return <PatientHub clients={MOCK_CLIENTS} />;

    // Default Fallback
    return <div className="p-20 opacity-20 italic">Node synchronized. Awaiting role-specific instructions.</div>;
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
