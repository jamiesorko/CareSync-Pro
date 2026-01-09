
import React, { useState, useRef } from 'react';
import { intakeParsingService } from '../../services/intakeParsingService';
import { predictiveTriageService, TriageScore } from '../../services/predictiveTriageService';
import { Client } from '../../types';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
  onClientAdded: (client: Client) => void;
}

const IntakeNode: React.FC<Props> = ({ language, onClientAdded }) => {
  const [image, setImage] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsedClient, setParsedClient] = useState<Partial<Client> | null>(null);
  const [triage, setTriage] = useState<TriageScore | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(',')[1];
      setImage(ev.target?.result as string);
      setParsing(true);
      try {
        const extracted = await intakeParsingService.parseReferralImage(base64);
        setParsedClient(extracted);
        const referralText = `${extracted.name} with conditions ${extracted.conditions?.join(', ')}. Intake from Vision Scan.`;
        const score = await predictiveTriageService.calculateAcuityGravity(referralText);
        setTriage(score);
      } catch (err) {
        alert("Extraction Failed. Manual intake required.");
      } finally {
        setParsing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (!parsedClient) return;
    // Client ID prefixed with C
    // Add missing createdAt property required by BaseEntity interface
    const client: Client = {
      id: "C" + Math.floor(Math.random() * 10000),
      companyId: 'csp-demo',
      createdAt: new Date().toISOString(),
      anonymizedId: `C${Math.floor(100 + Math.random() * 900)}`,
      name: parsedClient.name || 'Unknown Patient',
      address: parsedClient.address || 'TBD',
      sector: 'General',
      phone: 'TBD',
      time: '08:00 AM',
      conditions: parsedClient.conditions || [],
      mobilityStatus: {
        isBedridden: false,
        useWheelchair: false,
        useWalker: true,
        dementia: false,
        liftType: 'None',
        transferMethod: '1-Person'
      },
      isInitialVisit: true,
      description: 'Newly ingested from referral document.',
      carePlans: {},
      medications: [],
      blacklistStaffIds: [],
      currentVisitStatus: 'IDLE',
      risk: triage ? {
        level: triage.priority === 'P1' || triage.priority === 'P2' ? 'CRITICAL' : 'LOW',
        factors: [triage.riskReasoning],
        lastAssessed: new Date().toISOString()
      } : undefined
    };
    onClientAdded(client);
    setParsedClient(null);
    setTriage(null);
    setImage(null);
    alert("CENSUS_SYNC: Patient authorized and locked into Ledger.");
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <span className="text-9xl font-black italic uppercase">Intake</span>
      </div>

      <div className="flex justify-between items-start mb-16 relative z-10">
        <div>
           <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Neural_Intake_Station</h3>
           <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-4">Autonomous Referral Ingestion Core</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-10 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          Drop_Referral_Vector
        </button>
        <input ref={fileInputRef} type="file" hidden onChange={handleUpload} accept="image/*" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 relative z-10">
         <div className="aspect-[4/3] bg-black/40 rounded-[3rem] border-4 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden group hover:border-sky-500/50 transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                 <span className="text-7xl mb-6 block group-hover:scale-110 transition-transform">📄</span>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awaiting Hospital Vector</p>
              </div>
            )}
         </div>

         <div className="flex flex-col">
            {parsing ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                 <div className="w-16 h-16 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
                 <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.6em] animate-pulse">Extracting_Entities</p>
              </div>
            ) : parsedClient ? (
              <div className="flex-1 space-y-10 animate-in fade-in">
                 <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                    <p className="text-[7px] font-black text-sky-500 uppercase mb-2">Patient_Found</p>
                    <p className="text-3xl font-black text-white uppercase italic tracking-tighter">{parsedClient.name}</p>
                 </div>
                 <div className="p-8 bg-rose-600/10 border border-rose-500/20 rounded-3xl">
                    <p className="text-[7px] font-black text-rose-400 uppercase mb-2">Neural_Triage</p>
                    <p className="text-3xl font-black text-white italic tracking-tighter">{triage?.priority || 'SYNCING'}</p>
                 </div>
                 <div className="mt-auto grid grid-cols-2 gap-4">
                    <button onClick={() => { setImage(null); setParsedClient(null); }} className="py-5 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase">Discard</button>
                    <button onClick={handleConfirm} className="py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-xl">Authorize_Intake</button>
                 </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center opacity-20 px-12 italic">
                 <p className="text-sm font-medium leading-relaxed">Neural Vision extracts patient identity and acuity markers from hospital discharge notes in real-time.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default IntakeNode;
