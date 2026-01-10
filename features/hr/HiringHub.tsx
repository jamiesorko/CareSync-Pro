import React, { useState } from 'react';
import { Applicant, CareRole } from '../../types';
import { Translate } from '../../components/Translate';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  language: string;
}

const HiringHub: React.FC<Props> = ({ language }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 'app-1', companyId: 'csp', createdAt: new Date().toISOString(), name: 'John Miller', role: CareRole.PSW, credentialsVerified: true, referencesChecked: true, cultureFitScore: 88, status: 'PENDING', appliedDate: '2025-10-10' },
    { id: 'app-2', companyId: 'csp', createdAt: new Date().toISOString(), name: 'Sarah Chen', role: CareRole.RN, credentialsVerified: true, referencesChecked: false, cultureFitScore: 92, status: 'PENDING', appliedDate: '2025-10-12' },
  ]);

  const handleApprove = (id: string) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'INTERVIEW_SET' } : a));
    alert("REPORT_GENERATED: Candidate dossier transmitted to HR Manager.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10">
          <Translate target={language}>Applicant_Triage_Stack</Translate>
        </h3>
        <div className="space-y-4">
          {applicants.map(app => (
            <div key={app.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-white/5 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1 space-y-4">
                   <div className="flex items-center gap-4">
                      <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">{app.name}</h4>
                      <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 text-[8px] font-black rounded uppercase">
                        <Translate target={language}>{app.role}</Translate>
                      </span>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        {app.credentialsVerified ? <CheckCircle className="text-emerald-500" size={14} /> : <XCircle className="text-rose-500" size={14} />}
                        <span className="text-[9px] font-bold text-slate-500 uppercase">
                          <Translate target={language}>Credentials</Translate>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.referencesChecked ? <CheckCircle className="text-emerald-500" size={14} /> : <XCircle className="text-rose-500" size={14} />}
                        <span className="text-[9px] font-bold text-slate-500 uppercase">
                          <Translate target={language}>References</Translate>
                        </span>
                      </div>
                      <div className="col-span-2">
                         <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">
                           <Translate target={language}>Culture_Fit_Score</Translate>
                         </p>
                         <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${app.cultureFitScore}%` }}></div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-3 shrink-0 pt-2">
                  <button onClick={() => handleApprove(app.id)} className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
                    <Translate target={language}>Set_Interview</Translate>
                  </button>
                  <button className="px-8 py-3 bg-white/5 border border-white/10 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">
                    <Translate target={language}>Reject</Translate>
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

export default HiringHub;