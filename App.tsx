
import React, { useState, useEffect } from 'react';
import { CareRole, User, AppTab } from './types';
import Login from './features/Login';
import Layout from './components/Layout';
import Dashboard from './features/Dashboard';
import ProfessionalTerminal from './features/terminal/ProfessionalTerminal';
import HRPortal from './features/hr/HRPortal';
import AccountingTerminal from './features/accounting/AccountingTerminal';
import DOCPortal from './features/clinical/DOCPortal';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState<string>('English');

  useEffect(() => {
    if (!user) return;
    if (user.role === CareRole.ACCOUNTANT) setActiveTab(AppTab.FINANCE);
    else if (user.role === CareRole.HR_SPECIALIST) setActiveTab(AppTab.HR_HUB);
    else if (user.role === CareRole.DOC) setActiveTab(AppTab.CLINICAL_COMMAND);
    else setActiveTab(AppTab.DASHBOARD);
  }, [user]);

  if (!user) return <Login onLogin={setUser} language={language} onLanguageChange={setLanguage} />;

  const renderContent = () => {
    const isField = [CareRole.PSW, CareRole.RN, CareRole.RPN, CareRole.HSS].includes(user.role as any);

    if (activeTab === AppTab.DASHBOARD) {
      if (isField) return <ProfessionalTerminal role={user.role as CareRole} staffName={user.name} clients={MOCK_CLIENTS} language={language} />;
      return <Dashboard staffName={user.name} clients={MOCK_CLIENTS} language={language} />;
    }

    switch (activeTab) {
      case AppTab.HR_HUB: return <HRPortal role={user.role} language={language} />;
      case AppTab.FINANCE: return <AccountingTerminal language={language} staffName={user.name} clients={MOCK_CLIENTS} />;
      case AppTab.CLINICAL_COMMAND: return <DOCPortal language={language} staffName={user.name} clients={MOCK_CLIENTS} />;
      default: return <Dashboard staffName={user.name} clients={MOCK_CLIENTS} language={language} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#020617] text-slate-200">
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeRole={user.role} 
        staffName={user.name} 
        language={language}
        onLanguageChange={setLanguage}
        onLogout={() => setUser(null)}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
