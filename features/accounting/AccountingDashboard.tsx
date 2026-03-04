
import React from 'react';
import { Translate } from '../../components/Translate';
import { TrendingUp, TrendingDown, Landmark, ReceiptText, WalletMinimal, Plus, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MOCK_HISTORICAL_PL } from '../../data/accountingData';

interface Props {
  language: string;
}

const AccountingDashboard: React.FC<Props> = ({ language }) => {
  const bankAccounts = [
    { name: 'Operating Account (Chase)', balance: '$142,901.42', type: 'Checking' },
    { name: 'Tax Reserve (High Yield)', balance: '$84,102.10', type: 'Savings' },
    { name: 'Payroll Clearing', balance: '$12,204.00', type: 'Checking' }
  ];

  const recentActivity = [
    { type: 'INVOICE', target: 'Sector 4 Gov', val: '+24,000', date: '2026-03-02', status: 'SETTLED' },
    { type: 'PAYROLL', target: 'Sarah J. (PSW)', val: '-1,420', date: '2026-03-01', status: 'PENDING' },
    { type: 'SUPPLIES', target: 'MedSource Global', val: '-840', date: '2026-02-28', status: 'DISPATCHED' },
    { type: 'INVOICE', target: 'Private Client A', val: '+3,500', date: '2026-02-28', status: 'OVERDUE' }
  ];

  const maxRevenue = Math.max(...MOCK_HISTORICAL_PL.map(d => d.revenue));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Invoices (Unpaid)</p>
            <h4 className="text-2xl font-black text-white tracking-tighter italic">$14,204</h4>
          </div>
          <div className="mt-4 flex items-center gap-2 text-rose-400 text-[9px] font-black uppercase">
            <Calendar size={12} />
            <span>3 Overdue</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Bills (Unpaid)</p>
            <h4 className="text-2xl font-black text-white tracking-tighter italic">$21,840</h4>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sky-400 text-[9px] font-black uppercase">
            <Calendar size={12} />
            <span>Due in 5 days</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expenses (30d)</p>
            <h4 className="text-2xl font-black text-white tracking-tighter italic">$21,840</h4>
          </div>
          <div className="mt-4 flex items-center gap-2 text-rose-400 text-[9px] font-black uppercase">
            <TrendingDown size={12} />
            <span>+2.1% vs last month</span>
          </div>
        </div>
        <div className="bg-emerald-600/20 border border-emerald-500/30 p-6 rounded-[2rem] flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Net Income (30d)</p>
            <h4 className="text-2xl font-black text-emerald-400 tracking-tighter italic">$32,361</h4>
          </div>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-[9px] font-black uppercase">
            <TrendingUp size={12} />
            <span>Healthy Margin</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profit & Loss Chart Simulation */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
              <TrendingUp size={20} className="text-indigo-400" />
              Profit & Loss Performance
            </h3>
            <select className="bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase px-4 py-2 rounded-xl outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {MOCK_HISTORICAL_PL.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full flex flex-col gap-1 items-center justify-end h-full">
                  <div 
                    className="w-full bg-indigo-500/40 rounded-t-lg transition-all group-hover:bg-indigo-500/60 relative"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${(d.revenue/1000).toFixed(1)}k
                    </div>
                  </div>
                  <div 
                    className="w-full bg-rose-500/40 rounded-t-lg transition-all group-hover:bg-rose-500/60 relative"
                    style={{ height: `${(d.expenses / maxRevenue) * 100}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${(d.expenses/1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.month}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500/40 rounded-sm"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-500/40 rounded-sm"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expenses</span>
            </div>
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Landmark size={16} className="text-sky-400" />
                Bank Accounts
              </h3>
              <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Plus size={14} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              {bankAccounts.map((acc, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-black text-white uppercase italic">{acc.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{acc.type}</p>
                    </div>
                    <p className="text-sm font-black text-white tracking-tighter">{acc.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20">
            <p className="text-[9px] font-black uppercase tracking-widest mb-4 opacity-60 italic">Quick Insights</p>
            <p className="text-sm font-bold italic leading-relaxed">
              "Your burn rate has decreased by 4% this week. Sector 4 Government payments are expected in 3 days."
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Ledger */}
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
            <ReceiptText size={20} className="text-emerald-400" />
            Recent Activity Ledger
          </h3>
          <button className="px-6 py-2 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-[9px] font-black uppercase hover:text-white transition-colors">
            View All
          </button>
        </div>
        <div className="font-mono text-[11px] space-y-3">
          {recentActivity.map((t, i) => (
            <div key={i} className="grid grid-cols-5 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/10 transition-colors items-center">
              <span className="font-black text-sky-400 uppercase">[{t.type}]</span>
              <span className="text-slate-300 font-bold">{t.target}</span>
              <span className="text-slate-500 text-[10px]">{t.date}</span>
              <span className={`text-right font-black ${t.val.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{t.val}</span>
              <span className={`text-right text-[9px] font-black uppercase ${t.status === 'OVERDUE' ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default AccountingDashboard;
