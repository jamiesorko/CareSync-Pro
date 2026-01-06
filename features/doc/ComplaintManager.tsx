
import React, { useState } from 'react';
import { Complaint } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const ComplaintManager: React.FC<Props> = ({ language }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    // Fix: Added missing createdAt property required by Complaint (BaseEntity)
    { 
      id: 'cp1', 
      companyId: 'demo-company',
      createdAt: new Date().toISOString(),
      clientId: '1', 
      clientName: 'Robert Miller', 
      staffId: 's3', 
      staffName: 'Sarah J. (PSW)', 
      content: 'Staff member arrived late for morning Hoyer transfer. Patient felt anxious.', 
      timestamp: '2025-10-15 09:30', 
      status: 'INVESTIGATING', 
      priority: 'MED',
      type: 'CLIENT_ISSUE'
    },
    { 
      id: 'cp2', 
      companyId: 'demo-company',
      createdAt: new Date().toISOString(),
      clientId: '2', 
      clientName: 'Martha Stewart', 
      staffId: 's1', 
      staffName: 'Elena R. (PSW)', 
      content: 'Request for different staff member. Personal preference clash reported.', 
      timestamp: '2025-10-14 14:15', 
      status: 'NEW', 
      priority: 'LOW',
      type: 'CLIENT_ISSUE'
    }
  ]);

  const updateStatus = (id: string, newStatus: Complaint['status']) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (newStatus === 'RESOLVED') {
      alert(`Signal: Complaint ${id} marked as RESOLVED. Archiving in neural vault.`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
        <h3 className="text-xl font-black text-white mb-8 tracking-tighter uppercase italic">Quality Assurance Feed</h3>
        
        <div className="space-y-6">
          {complaints.map(complaint => (
            <div key={complaint.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex flex-col lg:flex-row justify-between gap-8 group hover:bg-white/5 transition-all">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                    complaint.priority === 'HIGH' || complaint.priority === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {complaint.priority}_PRIORITY
                  </span>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{complaint.timestamp}</span>
                </div>
                
                <h4 className="text-lg font-black text-white italic tracking-tighter uppercase">Issue: {complaint.clientName} vs {complaint.staffName}</h4>
                <p className="text-sm text-slate-400 mt-4 leading-relaxed font-medium">"{complaint.content}"</p>
                
                <div className="mt-6 flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${complaint.status === 'RESOLVED' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{complaint.status}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center">
                {complaint.status !== 'RESOLVED' && (
                  <>
                    <button 
                      onClick={() => updateStatus(complaint.id, 'INVESTIGATING')}
                      className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${complaint.status === 'INVESTIGATING' ? 'bg-amber-600 text-white' : 'bg-white/5 border border-white/10 text-slate-400'}`}
                    >
                      Initialize Investigation
                    </button>
                    <button 
                      onClick={() => updateStatus(complaint.id, 'RESOLVED')}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase hover:scale-105 transition-all"
                    >
                      Authorize Resolution
                    </button>
                  </>
                )}
                <button className="px-8 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-[9px] font-black uppercase hover:bg-white/10">View Staff Dossier</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintManager;
