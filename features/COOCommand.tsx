import React, { useState } from 'react';
import { Translate } from '../components/Translate';
import { Complaint } from '../types';
import { geminiService } from '../services/geminiService';
import StabilityGrid from './coo/StabilityGrid';
import ThroughputPulse from './coo/ThroughputPulse';

interface Props {
  language: string;
}

const COOCommand: React.FC<Props> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'STAFF_SUPPORT' | 'STABILITY' | 'PULSE' | 'POLICY'>('OVERVIEW');
  const [loading, setLoading] = useState(false);
  const [policyDraft, setPolicyDraft] = useState<string | null>(null);

  const staffComplaints: Complaint[] = [
    { 
      id: 'sc1', companyId: 'demo-company', createdAt: new Date().toISOString(),
      clientId: 'N/A', clientName: 'N/A', staffId: 's1', staffName: 'Elena R. (PSW)', 
      content: 'Requesting more robust PPE for Sector 4 visits. Current supply latency is high.', 
      timestamp: '2025-10-15 11:00', status: 'NEW', priority: 'HIGH', type: 'STAFF_GRIEVANCE'
    }
  ];

  const handleDraftPolicy = async () => {
    setLoading(true);
    try {
      const res = await geminiService.generateText(`Draft Staff Wellness policy based on high field density. Concise bullets.`, false);
      setPolicyDraft(res.text || "Policy complete.");
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 h-full overflow-y-auto scrollbar-hide px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic text-cyan-400">
             <Translate target={language}>COO_OPERATIONAL_MATRIX</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">
             <Translate target={language}>Operations Control Center</Translate>
          </p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
          {['OVERVIEW', 'STAFF_SUPPORT', 'STABILITY', 'PULSE', 'POLICY'].map(tab => (
            <button key={tab} onClick={() => setActiveSubTab(tab as any)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === tab ? 'bg-cyan-600 text-white' : 'text-slate-500'}`}>
              <Translate target={language}>{tab}</Translate>
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'OVERVIEW' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {[
               { label: 'Agency Velocity', val: '94.2%', color: 'text-cyan-400' },
               { label: 'Validation Latency', val: '115m', color: 'text-emerald-400' },
               { label: 'Staff Reliability', val: '88%', color: 'text-white' },
               { label: 'Compliance Index', val: '99.8%', color: 'text-white' }
             ].map((stat, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">
                    <Translate target={language}>{stat.label}</Translate>
                  </p>
                  <p className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.val}</p>
               </div>
             ))}
          </div>
          <ThroughputPulse language={language} />
        </div>
      )}

      {activeSubTab === 'STAFF_SUPPORT' && (
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
          <h3 className="text-xl font-black text-white mb-8 tracking-tighter uppercase italic">
            <Translate target={language}>Professional Support Link</Translate>
          </h3>
          <div className="space-y-6">
             {staffComplaints.map(c => (
               <div key={c.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl flex justify-between items-center group">
                  <div className="flex-1">
                     <p className="text-lg font-black text-white italic tracking-tighter uppercase">
                        <Translate target={language}>Support Req</Translate>: {c.staffName}
                     </p>
                     <p className="text-sm text-slate-400 mt-4 leading-relaxed font-medium italic">"{c.content}"</p>
                  </div>
                  <button className="px-8 py-3 bg-cyan-600 text-white rounded-xl text-[9px] font-black uppercase">
                    <Translate target={language}>Resolve Issue</Translate>
                  </button>
               </div>
             ))}
          </div>
        </div>
      )}

      {activeSubTab === 'POLICY' && (
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-12 rounded-[4rem] text-center">
          <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">
            <Translate target={language}>Neural Policy Forge</Translate>
          </h3>
          <p className="text-indigo-300 text-sm max-w-xl mx-auto font-medium mb-12">
            <Translate target={language}>Synthesize operational guidelines based on real-time fleet density.</Translate>
          </p>
          <button onClick={handleDraftPolicy} disabled={loading} className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs">
            {loading ? <Translate target={language}>Synthesizing</Translate> : <Translate target={language}>Draft Efficiency Policy</Translate>}
          </button>
          {policyDraft && <div className="mt-12 p-8 bg-black/40 border border-white/5 rounded-2xl text-left font-mono text-xs">{policyDraft}</div>}
        </div>
      )}
      
      {activeSubTab === 'STABILITY' && <StabilityGrid language={language} />}
      {activeSubTab === 'PULSE' && <ThroughputPulse language={language} />}
    </div>
  );
};

export default COOCommand;