
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

  // Sovereignty Routing logic
  useEffect(() => {
    if (!user) return;
    
    if (user.role === CareRole.ACCOUNTANT) setActiveTab(AppTab.FINANCE);
    else if (user.role === CareRole.HR_SPECIALIST) setActiveTab(AppTab.HR_HUB);
    else if (user.role === CareRole.COORDINATOR) setActiveTab(AppTab.COORDINATION);
    else if (user.role === CareRole.DOC) setActiveTab(AppTab.CLINICAL_COMMAND);
    else {
      setActiveTab(AppTab.DASHBOARD);
    }
  }, [user]);

  if (!user) return <Login onLogin={setUser} />;

  const renderContent = () => {
    const isFieldStaff = [CareRole.PSW, CareRole.RN, CareRole.RPN, CareRole.HSS].includes(user.role as any);
    const lang = "English";

    // Sovereign Home Pages based on activeTab + Role
    if (activeTab === AppTab.DASHBOARD) {
      if (user.role === CareRole.COO) return <COOTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} staff={MOCK_STAFF} />;
      if (user.role === CareRole.HR_SPECIALIST) return <HRTerminal language={lang} staffName={user.name} />;
      if (user.role === CareRole.ACCOUNTANT) return <AccountingTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
      if (isFieldStaff) return <ProfessionalTerminal role={user.role as CareRole} staffName={user.name} clients={MOCK_CLIENTS} />;
      
      return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language={lang} setActiveTab={setActiveTab} />;
    }

    // Explicit Tab Switching
    switch (activeTab) {
      case AppTab.HR_HUB:
        return <HRTerminal language={lang} staffName={user.name} />;
        
      case AppTab.FINANCE:
        return <AccountingTerminal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
        
      case AppTab.COORDINATION:
        return <CoordinationHub language={lang} />;
        
      case AppTab.CLINICAL_COMMAND:
        if (user.role === CareRole.DOC) return <DOCPortal language={lang} staffName={user.name} clients={MOCK_CLIENTS} />;
        return <RNCommand clients={MOCK_CLIENTS} role={user.role} />;
        
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={lang} />;
        
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full opacity-30 text-center space-y-8">
             <div className="w-20 h-20 border-2 border-white/10 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-4xl text-indigo-500 italic font-black">?</span>
             </div>
             <div>
                <h2 className="text-4xl font-black italic uppercase tracking-widest text-white">Node_Recovery</h2>
                <p className="text-[10px] font-bold uppercase mt-4 text-slate-500">Route resolution failure. Manual sector jump required.</p>
             </div>
             <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Return to Ops Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#020617] text-slate-200 selection:bg-indigo-500/30">
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeRole={user.role} 
        staffName={user.name} 
        onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
      >
        <div className="h-full w-full animate-in fade-in zoom-in-95 duration-500">
          {renderContent()}
        </div>
      </Layout>
    </div>
  );
};

export default App;
