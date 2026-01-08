
import React, { useState } from 'react';
import { CareRole, AppTab, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './features/Login';
import CEOPortal from './features/ceo/CEOPortal';
import COOPortal from './features/coo/COOPortal';
import DOCPortal from './features/doc/DOCPortal';
import RNPortal from './features/rn/RNPortal';
import PSWPortal from './features/psw/PSWPortal';
import FinancePortal from './features/accounting/FinancePortal';
import ClientPortal from './features/client/ClientPortal';
import HSSPortal from './features/hss/HSSPortal';
import VideoLab from './features/VideoLab';
import LiveLab from './features/LiveLab';
import { MOCK_CLIENTS, MOCK_STAFF } from './data/careData';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState('English');

  if (!user) {
    return <Login onLogin={setUser} language={language} onLanguageChange={setLanguage} />;
  }

  const renderContent = () => {
    const props = { language, clients: MOCK_CLIENTS, staff: MOCK_STAFF, user };
    
    // Global features override the role-based portals
    if (activeTab === AppTab.LIVE) return <LiveLab language={language} />;
    if (activeTab === AppTab.WELLNESS) return <VideoLab language={language} />;

    switch (user.role) {
      case CareRole.CEO: return <CEOPortal {...props} />;
      case CareRole.COO: return <COOPortal {...props} />;
      case CareRole.DOC: return <DOCPortal {...props} />;
      case CareRole.RN: 
      case CareRole.RPN: return <RNPortal {...props} />;
      case CareRole.PSW: return <PSWPortal {...props} />;
      case CareRole.ACCOUNTANT: return <FinancePortal {...props} />;
      case CareRole.CLIENT: return <ClientPortal {...props} />;
      case CareRole.HSS: return <HSSPortal {...props} />;
      default: return <PSWPortal {...props} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden select-none">
      <Sidebar 
        active={activeTab} 
        setActive={setActiveTab} 
        role={user.role} 
        lang={language}
        onLogout={() => setUser(null)}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header 
          active={activeTab} 
          lang={language} 
          setLang={setLanguage} 
          user={user} 
        />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-8 relative">
          <div className="max-w-7xl mx-auto h-full animate-fade-up">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
