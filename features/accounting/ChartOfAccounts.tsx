import React from 'react';
import { Translate } from '../../components/Translate';
import { MOCK_CHART_OF_ACCOUNTS } from '../../data/accountingData';
import { ListTree, Plus } from 'lucide-react';

interface Props {
  language: string;
}

const ChartOfAccounts: React.FC<Props> = ({ language }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
              <ListTree size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                <Translate target={language}>CHART_OF_ACCOUNTS</Translate>
              </h3>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                Operational Ledger Mapping
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase shadow-lg shadow-indigo-500/20">
            <Plus size={14} />
            <Translate target={language}>New_Account</Translate>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Code</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Account Name</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Type</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 text-right">Balance</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_CHART_OF_ACCOUNTS.map(acc => (
                <tr key={acc.code} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 text-[11px] font-mono text-indigo-400">{acc.code}</td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-black text-white uppercase italic tracking-tighter">{acc.name}</p>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{acc.type}</span>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <p className="text-sm font-black text-white tracking-tighter">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <button className="text-[10px] font-black text-slate-500 uppercase hover:text-white transition-colors">
                      View Register
                    </button>
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

export default ChartOfAccounts;
