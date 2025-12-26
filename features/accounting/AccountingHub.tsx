import React, { useState, useEffect } from 'react';
import Translate from '../../components/Translate';
import { BillingAlert, Client } from '../../types';
import PayrollSystem from './PayrollSystem';
import AccountsReceivable from './AccountsReceivable';
import AccountsPayable from './AccountsPayable';
import RevenueRecoveryNexus from './RevenueRecoveryNexus';
import { revenueCycleService } from '../../services/revenueCycleService';

interface Props {
  language: string;
  alerts: BillingAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<BillingAlert[]>>;
  clients: Client[];
}

type AccountingTab = 'VERIFICATION' | 'PAYROLL' | 'RECEIVABLE' | 'PAYABLE' | 'RECOVERY';

const AccountingHub: React.FC<Props> = ({ language, alerts, setAlerts, clients }) => {
  const [activeSubTab, setActiveSubTab] = useState<AccountingTab>('VERIFICATION');
  const [agingReport, setAgingReport] = useState<any>(null);

  useEffect(() => {
    revenueCycleService.getAgingReport().then(setAgingReport);
  }, []);

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    alert("Record synchronized. Ledger updated.");
  };

  const tabs = [
    { id: 'VERIFICATION', label: 'Audit Queue' },
    { id: 'PAYROLL', label: 'Payroll' },
    { id: 'RECEIVABLE', label: 'A/R' },
    { id: 'PAYABLE', label: 'A/P' },
    { id: 'RECOVERY', label: 'Forensic Recovery' }
  ];

  const renderSubContent = () => {
    switch (activeSubTab) {
      case 'PAYROLL':
        return <PayrollSystem language={language} />;
      case 'RECEIVABLE':
        return <AccountsReceivable language={language} />;
      case 'PAYABLE':
        return <AccountsPayable language={language} />;
      case 'RECOVERY':
        return <RevenueRecoveryNexus language={language} />;
      case 'VERIFICATION':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-8 tracking-tight">Audit Verification Queue</h3>
                <div className="space-y-4">
                  {alerts.length === 0 ? (
                    <div className="py-24 text-center opacity-50 space-y-4">
                       <span className="text-4xl">📄</span>
                       <p className="text-sm font-medium italic">Ledger integrity validated. No exceptions found.</p>
                    </div>
                  ) : (
                    alerts.map(alert => (
                      <div key={alert.id} className="p-6 bg-slate-800/50 border border-white/5 rounded-xl flex justify-between items-center group hover:border-white/20 transition-all">
                        <div>
                          <p className="text-sm font-bold text-white">{alert.staffName} • {alert.clientName}</p>
                          <p className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest mt-1">{alert.type}</p>
                        </div>
                        <button 
                          onClick={() => resolveAlert(alert.id)} 
                          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md hover:bg-indigo-500"
                        >
                          Verify Record
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {agingReport && (
                <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl shadow-indigo-500/20">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 opacity-70">Aging Telemetry</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-semibold uppercase opacity-60">Total Outstanding</span>
                      <span className="text-3xl font-bold tracking-tight">${agingReport.totalOutstanding.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[82%] shadow-[0_0_10px_white]"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                       <div>
                         <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Collection</p>
                         <p className="text-lg font-bold">{agingReport.collectionRate}%</p>
                       </div>
                       <div>
                         <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Avg DSO</p>
                         <p className="text-lg font-bold">{agingReport.avgDaysSalesOutstanding}D</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
              
              <button className="w-full py-4 bg-slate-900 border border-white/5 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                <span>Export Regulatory Bundle</span>
                <span className="text-xs">📥</span>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Institutional Ledger</h2>
          <p className="text-sm text-slate-500">Financial forensics and capital flux management</p>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-white/5 overflow-x-auto scrollbar-hide shadow-sm">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-tight whitespace-nowrap transition-all ${activeSubTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[500px]">
        {renderSubContent()}
      </div>
    </div>
  );
};

export default AccountingHub;