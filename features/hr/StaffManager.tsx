
import React, { useState } from 'react';
import { MOCK_STAFF } from '../../data/careData';
import { hrService } from '../../services/hrService';
import { LeaveRequest, StaffMember } from '../../types';
import { AlertTriangle, CalendarCheck, ShieldCheck, UserX } from 'lucide-react';

const StaffManager: React.FC = () => {
  const [requests] = useState<LeaveRequest[]>([
    { id: 'lr-1', companyId: 'csp', staffId: 's1', staffName: 'Elena Rodriguez', type: 'VACATION', option1: { start: '2025-12-01', end: '2025-12-07' }, status: 'PENDING', timestamp: 'Oct 15', coverageRisk: 15 }
  ]);

  const handleAction = (req: LeaveRequest) => {
    const analysis = hrService.assessLeaveSecurity(req, MOCK_STAFF);
    alert(`NEURAL_ADVISOR: ${analysis.reason}\nRecommendation: ${analysis.recommended ? 'APPROVE' : 'DENY'}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vacation Advisor */}
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl">
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-3">
             <CalendarCheck className="text-indigo-400" size={20} /> Leave_Arbitration
          </h3>
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex justify-between items-center">
                 <div>
                    <p className="text-sm font-black text-white italic">{req.staffName}</p>
                    <p className="text-[9px] text-slate-500 uppercase">{req.option1.start} → {req.option1.end}</p>
                 </div>
                 <button onClick={() => handleAction(req)} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">Analyze_Risk</button>
              </div>
            ))}
          </div>
        </div>

        {/* Disciplinary Sentinel */}
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl">
           <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-3">
              <ShieldCheck className="text-rose-500" size={20} /> Disciplinary_Guard
           </h3>
           <div className="space-y-4">
              {MOCK_STAFF.filter(s => s.disciplinaryCount > 0).map(s => (
                <div key={s.id} className={`p-6 rounded-3xl border flex justify-between items-center ${s.disciplinaryCount >= 3 ? 'bg-rose-600/10 border-rose-500' : 'bg-white/[0.03] border-white/5'}`}>
                   <div>
                      <p className="text-sm font-black text-white italic uppercase">{s.name}</p>
                      <p className={`text-[9px] font-bold uppercase mt-1 ${s.disciplinaryCount >= 3 ? 'text-rose-500' : 'text-amber-500'}`}>Strikes: {s.disciplinaryCount} / 3</p>
                   </div>
                   {s.disciplinaryCount >= 3 && <span className="text-[8px] font-black text-rose-500 uppercase animate-pulse">HR_NOTIFIED</span>}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManager;
