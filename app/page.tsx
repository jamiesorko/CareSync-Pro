
'use client';

import React, { useState } from 'react';
import { CareRole, AppTab, User } from '../types';
import Login from '../features/Login';
import Layout from '../components/Layout';
// Fix: Dashboard is a named export, changing import accordingly.
import { Dashboard } from '../features/Dashboard';
import ScheduleView from '../features/ScheduleView';
import RNCommandCenter from '../features/rn/RNCommandCenter';
import CareReport from '../features/CareReport';
import { MOCK_CLIENTS, MOCK_STAFF } from '../data/careData';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [language, setLanguage] = useState<string>('English');

  if (!user) {
    // Corrected Login props to match its interface
    return <Login onLogin={(u: User) => setUser(u)} language={language} onLanguageChange={setLanguage} />;
  }

  const renderContent = () => {
    if (activeTab === AppTab.DASHBOARD) {
      // Corrected Dashboard props to match its interface
      return <Dashboard staffName={user.name} clients={MOCK_CLIENTS} language={language} />;
    }

    switch (activeTab) {
      case AppTab.SCHEDULE:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={language} />;
      case AppTab.CLINICAL_COMMAND:
        return <RNCommandCenter language={language} />;
      case AppTab.INCIDENT_REPORTS:
        return <CareReport role={user.role} language={language} clients={MOCK_CLIENTS} />;
      default:
        return <Dashboard staffName={user.name} clients={MOCK_CLIENTS} language={language} />;
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
