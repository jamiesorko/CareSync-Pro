import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import { MOCK_PAYABLES, MOCK_SUPPLY_REQUESTS, PayableRecord, SupplyRequest } from '../../data/accountingData';

interface Props {
  language: string;
}

const AccountsPayable: React.FC<Props> = ({ language }) => {
  const [payables, setPayables] = useState<PayableRecord[]>(MOCK_PAYABLES);
  const [supplyRequests, setSupplyRequests] = useState<SupplyRequest[]>(MOCK_SUPPLY_REQUESTS);

  const verifyPayable = (id: string) => {
    setPayables(prev => prev.map(p => p.id === id ? { ...p, status: 'VERIFIED' } : p));
  };

  const processPayment = (id: string) => {
    setPayables(prev => prev.map(p => p.id === id ? { ...p, status: 'PAID' } : p));
  };

  const orderSupplies = (id: string) => {
    setSupplyRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'ORDERED' } : r));
    alert("Supply Vector Locked: Requisition sent to Vendor Portal. Tracking initialized.");
  };

  return (
    <div className="space-y-10">
      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
        <h3 className="text-xl font-black text-white mb-6 italic tracking-tighter uppercase leading-none">
           <Translate target={language}>Vendor_Invoice_Verification</Translate>
        </h3>
        <div className="space-y-4">
          {payables.map(p => (
            <div key={p.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex justify-between items-center group">
              <div>
                <p className="text-sm font-black text-white uppercase italic">{p.vendor}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                  <Translate target={language}>{p.category}</Translate> • <Translate target={language}>Due</Translate>: <Translate target={language}>{p.date}</Translate>
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
                    p.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-500' : 
                    p.status === 'VERIFIED' ? 'bg-sky-500/20 text-sky-400' : 'bg-rose-500/20 text-rose-500'
                  }`}>
                    <Translate target={language}>{p.status}</Translate>
                  </span>
                </div>
              </div>
              <div className="text-right flex items-center space-x-4">
                <p className="text-lg font-black text-white tracking-tighter">
                  <Translate target={language}>{`-$${p.amount.toLocaleString()}`}</Translate>
                </p>
                <div className="flex space-x-2">
                  {p.status === 'UNVERIFIED' && (
                    <button onClick={() => verifyPayable(p.id)} className="px-4 py-2 bg-sky-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                       <Translate target={language}>Verify</Translate>
                    </button>
                  )}
                  {p.status === 'VERIFIED' && (
                    <button onClick={() => processPayment(p.id)} className="px-4 py-2 bg-white text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                       <Translate target={language}>Pay_Bill</Translate>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
        <h3 className="text-xl font-black text-white mb-6 italic tracking-tighter uppercase leading-none">
           <Translate target={language}>Field_Supply_Requisitions</Translate>
        </h3>
        <div className="space-y-4">
          {supplyRequests.map(r => (
            <div key={r.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-sm font-black text-white italic">
                  <Translate target={language}>{r.item}</Translate> (x{r.quantity})
                </p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">
                   <Translate target={language}>Requested_by</Translate>: <Translate target={language}>{r.staffName}</Translate> • <Translate target={language}>{r.timestamp}</Translate>
                </p>
                <div className="mt-2">
                   <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
                     r.status === 'DELIVERED' ? 'bg-emerald-500/20 text-emerald-500' :
                     r.status === 'ORDERED' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-500'
                   }`}>
                     <Translate target={language}>{r.status}</Translate>
                   </span>
                </div>
              </div>
              {r.status === 'PENDING' && (
                <button onClick={() => orderSupplies(r.id)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                   <Translate target={language}>Fulfill</Translate>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AccountsPayable;