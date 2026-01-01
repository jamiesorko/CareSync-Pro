
import React, { useState, useEffect } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';
import Dashboard from './features/Dashboard';
import ScheduleView from './features/ScheduleView';
import RNCommand from './features/rn/RNCommand';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import CoordinationHub from './features/CoordinationHub';
import HRTerminal from './features/hr/HRTerminal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import COOTerminal from './features/executive/COOTerminal';
import DOCPortal from './features/clinical/DOCPortal';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  // Automatic Routing Logic for Sovereignty
  useEffect(() => {
    if (!user) return;
    
    if (user.role === CareRole.ACCOUNTANT) setActiveTab(AppTab.FINANCE);
    else if (user.role === CareRole.HR_SPECIALIST) setActiveTab(AppTab.HR_HUB);
    else if (user.role === CareRole.COORDINATOR) setActiveTab(AppTab.COORDINATION);
    else if (user.role === CareRole.COO) setActiveTab(AppTab.DASHBOARD);
    else if (user.role === CareRole.DOC) setActiveTab(AppTab.CLINICAL_COMMAND);
    else if (user.role === CareRole.PSW || user.role === CareRole.RN || user.role === CareRole.RPN || user.role === CareRole.HSS) {
      setActiveTab(AppTab.DASHBOARD);
    } else {
      setActiveTab(AppTab.DASHBOARD);
    }
  }, [user]);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    const isFieldStaff = [CareRole.PSW, CareRole.RN, CareRole.RPN, CareRole.HSS].includes(user.role as any);
    const lang = "English";

    // Sovereign Dashboard Logic
    if (activeTab === AppTab.DASHBOARD) {
      if (user.role === CareRole.CEO) {
        return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language={lang} />;
      }
      if (user.role === CareRole.COO) {
        return <COOTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} staff={MOCK_STAFF} />;
      }
      if (isFieldStaff) {
        return <ProfessionalTerminal role={user.role as CareRole} staffName={user.name} clients={MOCK_CLIENTS} />;
      }
      if (user.role === CareRole.HR_SPECIALIST) {
        return <HRTerminal language={lang} staffName={user.name} />;
      }
      if (user.role === CareRole.ACCOUNTANT) {
        return <AccountingTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
      }
      return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language={lang} />;
    }

    // Explicit Tab Routing
    switch (activeTab) {
      case AppTab.HR_HUB:
        return <HRTerminal language={lang} staffName={user.name} />;
        
      case AppTab.FINANCE:
        return <AccountingTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
        
      case AppTab.COORDINATION:
        return <CoordinationHub language={lang} />;
        
      case AppTab.CLINICAL_COMMAND:
        if (user.role === CareRole.DOC) {
          return <DOCPortal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
        }
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} />;
        
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={lang} />;
        
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full opacity-20">
             <h2 className="text-4xl font-black italic uppercase tracking-widest">Node_Initialized</h2>
             <p className="text-xs font-bold uppercase mt-4">Operational Status: Ready for Intercept</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#020617] text-slate-200">
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeRole={user.role} 
        staffName={user.name} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
