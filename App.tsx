
import React, { useState } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';
import Dashboard from './features/Dashboard';
import ScheduleView from './features/ScheduleView';
import RNCommand from './features/rn/RNCommand';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import CoordinationHub from './features/CoordinationHub';
import HRPortal from './features/hr/HRPortal';
import AccountingHub from './features/accounting/AccountingHub';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [alerts, setAlerts] = useState<any[]>([]);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    const isFieldStaff = [CareRole.PSW, CareRole.RN, CareRole.RPN, CareRole.HSS].includes(user.role as any);
    const lang = "English";

    switch (activeTab) {
      case AppTab.DASHBOARD:
        if (user.role === CareRole.CEO) return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language={lang} />;
        if (isFieldStaff) return <ProfessionalTerminal role={user.role as CareRole} staffName={user.name} clients={MOCK_CLIENTS} />;
        if (user.role === CareRole.COORDINATOR) return <CoordinationHub language={lang} />;
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} />;
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={lang} />;
      case AppTab.COORDINATION:
        return <CoordinationHub language={lang} />;
      case AppTab.CLINICAL_COMMAND:
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} />;
      case AppTab.HR_HUB:
        return <HRPortal role={user.role} language={lang} />;
      case AppTab.FINANCE:
        return <AccountingHub language={lang} alerts={alerts} setAlerts={setAlerts} clients={MOCK_CLIENTS} />;
      default:
        return <div className="p-20 text-slate-500 italic uppercase font-black tracking-widest text-center opacity-20">Operational_Node_Inert</div>;
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
