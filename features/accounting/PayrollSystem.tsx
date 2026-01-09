import React from 'react';
import { MOCK_STAFF } from '../../data/careData';
import { hrService } from '../../services/hrService';
import { DollarSign, FileText, ShieldCheck, Users } from 'lucide-react';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const PayrollSystem: React.FC<Props> = ({ language }) => {
  const formatCAD = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5"><DollarSign size={200} /></div>
        
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-12">
          <Translate target={language}>Institutional_Disbursement_Engine</Translate>
        </h3>
        
        <div className="space-y-6">
          {MOCK_STAFF.map(s => {
            const payroll = hrService.calculateDetailedPayroll(s, 80); // Bi-weekly 80h default
            return (
              <div key={s.id} className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] group hover:bg-white/5 transition-all">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                       <Translate target={language}>{s.name}</Translate>
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <Translate target={language}>{s.role as string}</Translate> • <Translate target={language}>80.00 Units</Translate>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center md:text-left">
                       <p className="text-[8px] font-black text-slate-600 uppercase mb-1"><Translate target={language}>Gross_Liquid</Translate></p>
                       <p className="text-xl font-black text-white"><Translate target={language}>{formatCAD(payroll.gross)}</Translate></p>
                    </div>
                    <div className="text-center md:text-left">
                       <p className="text-[8px] font-black text-rose-500 uppercase mb-1"><Translate target={language}>Stat_Deductions</Translate></p>
                       <p className="text-xl font-black text-rose-400">
                         <Translate target={language}>{`-${formatCAD(payroll.deductions)}`}</Translate>
                       </p>
                    </div>
                    <div className="text-center md:text-left">
                       <p className="text-[8px] font-black text-indigo-400 uppercase mb-1"><Translate target={language}>Union_&_Ins</Translate></p>
                       <p className="text-xl font-black text-indigo-400">
                         <Translate target={language}>{`-${formatCAD(payroll.breakdown.unionDues + payroll.breakdown.insurance)}`}</Translate>
                       </p>
                    </div>
                    <div className="text-center md:text-right">
                       <p className="text-[8px] font-black text-emerald-400 uppercase mb-1"><Translate target={language}>Net_Disbursement</Translate></p>
                       <p className="text-3xl font-black text-emerald-400 italic">
                         <Translate target={language}>{formatCAD(payroll.net)}</Translate>
                       </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-2"><FileText size={12} /> <span className="text-[9px] font-bold uppercase"><Translate target={language}>Tax_T4_Vector</Translate></span></div>
                   <div className="flex items-center gap-2"><ShieldCheck size={12} /> <span className="text-[9px] font-bold uppercase"><Translate target={language}>Insurance_Sync</Translate></span></div>
                   <div className="flex items-center gap-2"><Users size={12} /> <span className="text-[9px] font-bold uppercase"><Translate target={language}>Union_Checkoff_Logged</Translate></span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PayrollSystem;