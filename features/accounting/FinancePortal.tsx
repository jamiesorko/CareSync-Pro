
import React from 'react';
import { Client, StaffMember } from '../../types';
import { Translate } from '../../components/Translate';
import RevenueReclamationNode from './RevenueReclamationNode';
import FiscalHealthCockpit from './FiscalHealthCockpit';
import PayrollSystem from './PayrollSystem';

interface Props {
  language: string;
}

const FinancePortal: React.FC<Props> = ({ language }) => {
  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-emerald-500">FISCAL_LEDGER</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
          <Translate target={language}>Capital Forensics & Automated Revenue Reclamation</Translate>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <PayrollSystem language={language} />
        <RevenueReclamationNode language={language} />
        <FiscalHealthCockpit language={language} />
      </div>
    </div>
  );
};

export default FinancePortal;
