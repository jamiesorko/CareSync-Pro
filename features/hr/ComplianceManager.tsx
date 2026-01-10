import React, { useState } from 'react';
import { Certificate } from '../../types';
import { Translate } from '../../components/Translate';
import { ShieldAlert, Send, Clock, UserX } from 'lucide-react';

interface Props {
  language: string;
  isHR?: boolean;
}

const ComplianceManager: React.FC<Props> = ({ language, isHR }) => {
  const [certs] = useState<Certificate[]>([
    { id: 'c-1', companyId: 'csp', createdAt: new Date().toISOString(), staffId: 's2', staffName: 'Sarah Jenkins', type: 'Vulnerable Sector Check', expiryDate: '2025-10-14', status: 'SUSPENDED' },
    { id: 'c-2', companyId: 'csp', createdAt: new Date().toISOString(), staffId: 's1', staffName: 'Elena Rodriguez', type: 'First Aid/CPR', expiryDate: '2025-11-01', status: 'WARNING' }
  ]);

  const handleSignal = () => {
    alert("SIGNAL_BURST: Mandatory Training Deadline broadcast.");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-6">
           <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
             <Translate target={language}>Compliance_Sentinel</Translate>
           </h3>
           <p className="text-sm text-slate-500 italic font-medium">
             <Translate target={language}>Monitoring 142 certificates across the fleet. Suspension protocol active for Sector 1 drift.</Translate>
           </p>
           {isHR && (
             <button onClick={handleSignal} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3">
               <Send size={14} /> <Translate target={language}>Send_Training_Signal</Translate>
             </button>
           )}
        </div>

        <div className="flex-1 space-y-4">
           {certs.map(cert => (
             <div key={cert.id} className={`p-8 rounded-[3rem] border flex flex-col md:flex-row justify-between items-center gap-6 transition-all ${cert.status === 'SUSPENDED' ? 'bg-rose-600/10 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.1)]' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center gap-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cert.status === 'SUSPENDED' ? 'bg-rose-600 text-white animate-pulse' : 'bg-white/10 text-slate-400'}`}>
                      {cert.status === 'SUSPENDED' ? <UserX size={24} /> : <Clock size={24} />}
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">{cert.staffName}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-2">
                        <Translate target={language}>{cert.type}</Translate>
                      </p>
                   </div>
                </div>
                <div className="text-right">
                   <p className={`text-[10px] font-black uppercase ${cert.status === 'SUSPENDED' ? 'text-rose-500' : 'text-amber-500'}`}>
                     <Translate target={language}>{cert.status}</Translate>
                   </p>
                   <p className="text-lg font-black text-white italic tracking-tighter mt-1">
                     <Translate target={language}>Exp</Translate>: <Translate target={language}>{cert.expiryDate}</Translate>
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceManager;