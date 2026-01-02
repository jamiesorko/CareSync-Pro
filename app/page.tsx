
'use client';

import React, { useState } from 'react';
import { CareRole, AppTab, User } from '../types';
import Login from '../features/Login';
import Layout from '../components/Layout';
import Dashboard from '../features/Dashboard';
import ScheduleView from '../features/ScheduleView';
import RNCommandCenter from '../features/rn/RNCommandCenter';
import CareReport from '../features/CareReport';
import { MOCK_CLIENTS, MOCK_STAFF } from '../data/careData';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState<string>('English');

  if (!user) {
    return <Login onLogin={(u: User) => setUser(u)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard staffName={user.name} role={user.role} clients={MOCK_CLIENTS} staff={MOCK_STAFF} language={language} setActiveTab={setActiveTab} />;
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={language} />;
      case AppTab.CLINICAL_COMMAND:
        return <RNCommandCenter language={language} />;
      case AppTab.INCIDENT_REPORTS:
        return <CareReport role={user.role} language={language} clients={MOCK_CLIENTS} />;
      default:
        return (
          <div className="flex items-center justify-center h-full opacity-20 text-2xl font-black italic uppercase tracking-widest">
            Clinical_Node_Ready
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
      language={language}
      onLanguageChange={setLanguage}
      onLogout={() => { setUser(null); setActiveTab(AppTab.DASHBOARD); }}
    >
      {renderContent()}
    </Layout>
  );
}
