
import React, { useState } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';
import Dashboard from './features/Dashboard';
import ScheduleView from './features/ScheduleView';
import RNCommand from './features/rn/RNCommand';
import PatientHub from './features/client/PatientHub';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    const isFieldStaff = [CareRole.PSW, CareRole.RN, CareRole.RPN, CareRole.HSS].includes(user.role as any);

    switch (activeTab) {
      case AppTab.DASHBOARD:
        if (user.role === CareRole.CEO) return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language="English" />;
        if (isFieldStaff) return <ProfessionalTerminal role={user.role as CareRole} staffName={user.name} clients={MOCK_CLIENTS} />;
        if (user.role === CareRole.COORDINATOR) return <PatientHub clients={MOCK_CLIENTS} />;
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} />;
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language="English" />;
      case AppTab.CLINICAL_COMMAND:
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} />;
      default:
        return <div className="p-8 text-slate-500 italic">Operational node active. Use sidebar for navigation.</div>;
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
