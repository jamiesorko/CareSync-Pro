import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import { MOCK_BANK_TRANSACTIONS, BankTransaction } from '../../data/accountingData';
import { Check, X, ArrowRight, Landmark, RefreshCw } from 'lucide-react';

interface Props {
  language: string;
}

const BankingCenter: React.FC<Props> = ({ language }) => {
  const [transactions, setTransactions] = useState<BankTransaction[]>(MOCK_BANK_TRANSACTIONS);

  const matchTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'MATCHED' } : t));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sky-500/20 rounded-2xl text-sky-400">
              <Landmark size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                <Translate target={language}>BANK_FEEDS_CENTER</Translate>
              </h3>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                Connected: Chase Operating (....4201)
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase hover:bg-white/10 transition-all">
              <RefreshCw size={14} />
              <Translate target={language}>Update_Feeds</Translate>
            </button>
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase shadow-lg shadow-emerald-500/20">
              <Translate target={language}>Add_Account</Translate>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Date</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Description</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 text-right">Amount</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 text-center">Category / Match</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map(txn => (
                <tr key={txn.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-[11px] font-mono text-slate-400">{txn.date}</td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-black text-white uppercase italic tracking-tighter">{txn.description}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">ID: {txn.id}</p>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <p className={`text-lg font-black tracking-tighter ${txn.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {txn.amount > 0 ? '+' : ''}{txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="py-6 px-4 text-center">
                    {txn.status === 'MATCHED' ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                        <Check size={14} />
                        Matched to Ledger
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-black text-sky-400 uppercase italic">{txn.suggestedCategory}</span>
                        <ArrowRight size={12} className="text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suggested</span>
                      </div>
                    )}
                  </td>
                  <td className="py-6 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      {txn.status === 'UNMATCHED' && (
                        <>
                          <button onClick={() => matchTransaction(txn.id)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase hover:scale-105 transition-all">
                            Match
                          </button>
                          <button className="p-2 bg-white/5 text-slate-400 rounded-lg hover:bg-rose-500/20 hover:text-rose-400 transition-all">
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {txn.status === 'MATCHED' && (
                        <button className="px-4 py-2 bg-white/5 text-slate-500 rounded-lg text-[9px] font-black uppercase cursor-default">
                          Verified
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BankingCenter;
