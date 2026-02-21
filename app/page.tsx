
'use client';

import React, { useState } from 'react';
import { CareRole, AppTab, User } from '../types';
import Login from '../features/Login';
import Layout from '../components/Layout';
import { Dashboard } from '../features/Dashboard';
import ScheduleView from '../features/ScheduleView';
import RNCommandCenter from '../features/rn/RNCommandCenter';
import { MOCK_CLIENTS, MOCK_STAFF } from '../data/careData';
import { useTranslation } from '../contexts/TranslationContext';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  // Fixed: useTranslation hook instead of local state to stay synchronized with global language changes
  const { language, setLanguage } = useTranslation();

  if (!user) {
    /* Fixed: Removed invalid language and onLanguageChange props from Login usage. 
       Login component handles localization internally via TranslationContext. */
    return <Login onLogin={(u: User) => setUser(u)} />;
  }

  const renderContent = () => {
    if (activeTab === AppTab.DASHBOARD) {
      return <Dashboard lang={language} staffName={user.name} clients={MOCK_CLIENTS} setActiveTab={setActiveTab} />;
    }

    switch (activeTab) {
      case AppTab.LOGISTICS:
        return <ScheduleView role={user.role} clients={MOCK_CLIENTS} language={language} />;
      case AppTab.CLINICAL:
        return <RNCommandCenter language={language} />;
      default:
        return <Dashboard lang={language} staffName={user.name} clients={MOCK_CLIENTS} setActiveTab={setActiveTab} />;
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
