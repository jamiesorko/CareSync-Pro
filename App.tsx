
import React, { useState } from 'react';
import { CareRole, AppTab } from './types';
import AppShell from './components/AppShell';
import Dashboard from './features/Dashboard';
import Login from './features/Login';
import RNCommandCenter from './features/rn/RNCommandCenter';
import ScheduleView from './features/ScheduleView';
import CareReport from './features/CareReport';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; role: CareRole } | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  if (!user) {
    return <Login onLogin={(role, name) => setUser({ name, role })} />;
  }

  const renderContent = () => {
    const lang = "English";
    switch(activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language={lang} />;
      case AppTab.CLINICAL_COMMAND:
        return <RNCommandCenter language={lang} />;
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={lang} onVisitSignal={()=>{}} onMissedClock={()=>{}} onAlert={()=>{}} />;
      case AppTab.INCIDENT_REPORTS:
        return <CareReport role={user.role} language={lang} clients={MOCK_CLIENTS} />;
      default:
        return (
          <div className="h-full flex items-center justify-center opacity-10">
            <h1 className="text-4xl font-black uppercase tracking-[1em] italic">Bridge_Inert</h1>
          </div>
        );
    }
  };

  return (
    <AppShell activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={() => setUser(null)}>
      {renderContent()}
    </AppShell>
  );
};

export default App;
