import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import { MOCK_INVOICES, InvoiceRecord } from '../../data/accountingData';

interface Props {
  language: string;
}

const AccountsReceivable: React.FC<Props> = ({ language }) => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(MOCK_INVOICES);

  const sendOverdueAlert = (inv: InvoiceRecord) => {
    alert(`Alert Triggered: Notifying Human AR Manager regarding past-due invoice ${inv.id} for ${inv.clientName}.`);
  };

  const markAsPaid = (id: string) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'PAID' } : i));
  };

  return (
    <div className="space-y-10">
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
        <h3 className="text-xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
          <Translate target={language}>Client_Invoicing_Ledger</Translate>
        </h3>
        <div className="space-y-4">
          {invoices.map(inv => (
            <div key={inv.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/5 transition-all">
              <div>
                <p className="text-lg font-black text-white italic tracking-tighter uppercase">{inv.clientName}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                  Ref: {inv.id} • <Translate target={language}>Sent</Translate>: {inv.date} • <Translate target={language}>Due</Translate>: {inv.dueDate}
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                    inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 
                    inv.status === 'OVERDUE' ? 'bg-rose-500/20 text-rose-500 animate-pulse' : 'bg-sky-500/10 text-sky-400'
                  }`}>
                    <Translate target={language}>{inv.status}</Translate>
                  </span>
                </div>
              </div>
              <div className="text-right flex items-center space-x-6">
                <p className="text-2xl font-black text-white tracking-tighter">
                  <Translate target={language}>{`$${inv.amount.toLocaleString()}`}</Translate>
                </p>
                <div className="flex flex-col gap-2">
                  {inv.status === 'SENT' && (
                    <button onClick={() => markAsPaid(inv.id)} className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                      <Translate target={language}>Receive_Payment</Translate>
                    </button>
                  )}
                  {inv.status === 'OVERDUE' && (
                    <button onClick={() => sendOverdueAlert(inv)} className="px-6 py-2 bg-rose-600 text-white rounded-xl text-[9px] font-black uppercase hover:scale-105 transition-all shadow-lg shadow-rose-600/20">
                      <Translate target={language}>Escalate_to_Manager</Translate>
                    </button>
                  )}
                  <button className="px-6 py-2 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-[9px] font-black uppercase hover:bg-white/10">
                    <Translate target={language}>Resend_Invoice</Translate>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsReceivable;