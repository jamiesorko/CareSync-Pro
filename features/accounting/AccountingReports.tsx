import React from 'react';
import { Translate } from '../../components/Translate';
import { FileBarChart, FileText, PieChart, Download } from 'lucide-react';

interface Props {
  language: string;
}

const AccountingReports: React.FC<Props> = ({ language }) => {
  const reports = [
    { title: 'Profit & Loss', desc: 'Net income, revenue, and expenses over time.', icon: FileBarChart, category: 'Standard' },
    { title: 'Balance Sheet', desc: 'Assets, liabilities, and equity snapshot.', icon: FileText, category: 'Standard' },
    { title: 'Accounts Receivable Aging', desc: 'Unpaid invoices by age.', icon: PieChart, category: 'Receivables' },
    { title: 'Payroll Summary', desc: 'Detailed breakdown of employee costs.', icon: FileText, category: 'Payroll' },
    { title: 'Trial Balance', desc: 'Listing of all accounts and their balances.', icon: ListTree, category: 'Accounting' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
            <Translate target={language}>REPORT_CENTER</Translate>
          </h3>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase">
              <Translate target={language}>Custom_Reports</Translate>
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase shadow-lg shadow-indigo-500/20">
              <Translate target={language}>Management_Reports</Translate>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, i) => (
            <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <report.icon size={60} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <report.icon size={20} />
                </div>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{report.category}</span>
              </div>
              <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-indigo-400 transition-colors">
                <Translate target={language}>{report.title}</Translate>
              </h4>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-8">
                <Translate target={language}>{report.desc}</Translate>
              </p>
              <div className="flex justify-between items-center">
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                  Run Report
                </button>
                <button className="p-2 text-slate-600 hover:text-white transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { ListTree } from 'lucide-react';
export default AccountingReports;
