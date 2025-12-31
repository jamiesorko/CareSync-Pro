
import React, { useState } from 'react';
import Translate from '../../components/Translate';
import { BillingAlert, Client } from '../../types';
import PayrollSystem from './PayrollSystem';
import AccountsReceivable from './AccountsReceivable';
import AccountsPayable from './AccountsPayable';
import RevenueRecoveryNexus from './RevenueRecoveryNexus';
import FiscalHealthCockpit from './FiscalHealthCockpit';
import PayrollTable from './PayrollTable';
import { MOCK_PAYROLL } from '../../data/accountingData';

interface Props {
  language: string;
  alerts: any[];
  setAlerts: React.Dispatch<React.SetStateAction<any[]>>;
  clients: Client[];
}

type AccountingTab = 'AUDIT' | 'PAYROLL' | 'FORENSICS' | 'RECEIVABLE' | 'PAYABLE' | 'RECOVERY';

const AccountingHub: React.FC<Props> = ({ language, alerts, setAlerts, clients }) => {
  const [activeSubTab, setActiveSubTab] = useState<AccountingTab>('PAYROLL');

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    alert("Fiscal record synchronized. Entry committed to ledger.");
  };

  const tabs = [
    { id: 'PAYROLL', label: 'Payroll Core' },
    { id: 'FORENSICS', label: 'Fiscal Health' },
    { id: 'AUDIT', label: 'Audit Queue' },
    { id: 'RECEIVABLE', label: 'Receivables' },
    { id: 'PAYABLE', label: 'Payables' },
    { id: 'RECOVERY', label: 'Recovery' }
  ];

  const renderSubContent = () => {
    switch (activeSubTab) {
      case 'PAYROLL':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <PayrollSystem language={language} />
            <div className="mx-4">
               <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8">Detailed_Disbursement_Ledger</h3>
               <PayrollTable records={MOCK_PAYROLL} language={language} onUpdate={() => {}} />
            </div>
          </div>
        );
      case 'FORENSICS':
        return <FiscalHealthCockpit language={language} />;
      case 'RECEIVABLE':
        return <AccountsReceivable language={language} />;
      case 'PAYABLE':
        return <AccountsPayable language={language} />;
      case 'RECOVERY':
        return <RevenueRecoveryNexus language={language} />;
      case 'AUDIT':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 px-4">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl">
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10">Audit_Verification_Stack</h3>
                <div className="space-y-4">
                  {alerts.length === 0 ? (
                    <div className="py-32 text-center opacity-30 italic">
                       <span className="text-4xl mb-6 block">📄</span>
                       <p className="text-sm font-black uppercase tracking-widest">Financial node integrity verified. No pending exceptions.</p>
                    </div>
                  ) : (
                    alerts.map(alert => (
                      <div key={alert.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/5 transition-all">
                        <div>
                          <p className="text-lg font-black text-white italic uppercase tracking-tighter">{alert.staffName} • {alert.clientName}</p>
                          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-2">{alert.type}</p>
                        </div>
                        <button 
                          onClick={() => resolveAlert(alert.id)} 
                          className="px-8 py-4 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl"
                        >
                          Verify Entry
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group h-fit">
                 <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic text-white">Aging_Telemetry</h3>
                 <div className="space-y-10 relative z-10 font-mono">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] font-black uppercase opacity-60">Receivables</span>
                      <span className="text-4xl font-black italic tracking-tighter">$142,500</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[82%] shadow-[0_0_15px_white]"></div>
                    </div>
                 </div>
              </div>
              
              <button className="w-full py-6 bg-slate-900 border border-white/5 text-slate-500 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-4">
                <span>EXPORT_LEDGER_BUNDLE</span>
                <span className="text-xs">📥</span>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide pb-24 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic text-emerald-500">Fiscal_Ledger</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">Institutional Capital Flux & Forensic Accounting Terminal</p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide shadow-xl">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeSubTab === tab.id ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'
              }`}
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
