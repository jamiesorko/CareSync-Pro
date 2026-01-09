import React, { useState } from 'react';
import { Client } from '../../types';
import Translate from '../../components/Translate';
import PayrollSystem from './PayrollSystem';
import FiscalHealthCockpit from './FiscalHealthCockpit';
import RevenueRecoveryNexus from './RevenueRecoveryNexus';
import AccountsReceivable from './AccountsReceivable';
import AccountsPayable from './AccountsPayable';
import { WalletMinimal, Landmark, HeartPulse, ReceiptText, Truck } from 'lucide-react';

interface Props {
  language: string;
  staffName: string;
  clients: Client[];
}

const AccountingTerminal: React.FC<Props> = ({ language, staffName, clients }) => {
  const [activeSubTab, setActiveSubTab] = useState<'PAYROLL' | 'HEALTH' | 'RECOVERY' | 'RECEIVABLE' | 'PAYABLE'>('PAYROLL');

  const tabs = [
    { id: 'PAYROLL', label: 'Payroll_Core', icon: WalletMinimal },
    { id: 'HEALTH', label: 'Fiscal_Health', icon: Landmark },
    { id: 'RECOVERY', label: 'Revenue_Recovery', icon: HeartPulse },
    { id: 'RECEIVABLE', label: 'Receivables', icon: ReceiptText },
    { id: 'PAYABLE', label: 'Payables', icon: Truck }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-emerald-500">
               <Translate target={language}>FISCAL_OMEGA_NODE</Translate>
             </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            <Translate target={language}>Institutional_Capital_Forensics</Translate> • {staffName}
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSubTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon size={14} />
              <Translate target={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 mb-10">
        {[
          { label: 'Unpaid_Invoices', val: '$14.2k', color: 'text-rose-400' },
          { label: 'Current_Payroll', val: '$42,901', color: 'text-white' },
          { label: 'Tax_Reserves', val: '$8.4k', color: 'text-sky-400' },
          { label: 'Vacation_Liability', val: '$12,204', color: 'text-emerald-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-3xl">
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
                <Translate target={language}>{stat.label}</Translate>
             </p>
             <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[600px] px-4 pb-24 font-mono">
        {activeSubTab === 'PAYROLL' && <PayrollSystem language={language} />}
        {activeSubTab === 'HEALTH' && <FiscalHealthCockpit language={language} />}
        {activeSubTab === 'RECOVERY' && <RevenueRecoveryNexus language={language} />}
        {activeSubTab === 'RECEIVABLE' && <AccountsReceivable language={language} />}
        {activeSubTab === 'PAYABLE' && <AccountsPayable language={language} />}
      </div>
    </div>
  );
};

export default AccountingTerminal;