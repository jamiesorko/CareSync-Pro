
import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import PayrollSystem from './PayrollSystem';
import AccountsReceivable from './AccountsReceivable';
import AccountsPayable from './AccountsPayable';
import { Landmark, Receipt, Users, Wallet } from 'lucide-react';

interface Props {
  language: string;
}

const AccountingHub: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'PAYROLL' | 'PAYABLE' | 'RECEIVABLE'>('PAYROLL');

  return (
    <div className="space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide pb-24 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic text-emerald-500">Fiscal_Ledger</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">Institutional Capital Flux • Canadian Regulatory Core</p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 shadow-xl">
          {[
            { id: 'PAYROLL', label: 'Payroll', icon: Users },
            { id: 'PAYABLE', label: 'Payables', icon: Wallet },
            { id: 'RECEIVABLE', label: 'Receivables', icon: Receipt }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon size={14} />
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Unpaid Invoices', val: '$14.2k', color: 'text-rose-400' },
          { label: 'Current Payroll', val: '$42,901', color: 'text-white' },
          { label: 'Tax Reserves', val: '$8.4k', color: 'text-sky-400' },
          { label: 'Vacation Liability', val: '$12,204', color: 'text-emerald-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-3xl">
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
             <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4">
        {activeTab === 'PAYROLL' && <PayrollSystem language={language} />}
        {activeTab === 'PAYABLE' && <AccountsPayable language={language} />}
        {activeTab === 'RECEIVABLE' && <AccountsReceivable language={language} />}
      </div>
    </div>
  );
};

export default AccountingHub;
