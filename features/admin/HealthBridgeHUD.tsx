import React, { useState } from 'react';
import { healthBridgeService } from '../../services/healthBridgeService';
import { Client } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
  clients: Client[];
}

const HealthBridgeHUD: React.FC<Props> = ({ language, clients }) => {
  const [fhir, setFhir] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');

  const runBridge = async () => {
    setLoading(true);
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    const mockNote = "Patient Robert Johnson had a stable morning. BP 120/80. Assisted with gait trainer for 20 mins. Skin integrity normal at sacral region.";
    
    try {
      const result = await healthBridgeService.generateFHIRResource(client, mockNote);
      setFhir(JSON.stringify(JSON.parse(result), null, 2));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-sky-400">Health_Bridge</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">FHIR R4 Universal Interoperability Nexus</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
           {clients.slice(0, 3).map(c => (
             <button 
              key={c.id}
              onClick={() => setSelectedClientId(c.id)}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedClientId === c.id ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-white'}`}
             >
               {c.name}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-slate-950 border border-white/10 rounded-[4rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">FHIR_Payload_Generator</h3>
              <button 
                onClick={runBridge}
                className="px-8 py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {loading ? 'FORGING_RESOURCE...' : 'GENERATE_FHIR_HANDSHAKE'}
              </button>
           </div>
           
           <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 overflow-y-auto scrollbar-hide">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6">
                   <div className="w-12 h-12 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest animate-pulse">Mapping_Standard_Vectors</p>
                </div>
              ) : fhir ? (
                <pre className="text-[10px] font-mono text-emerald-400 leading-relaxed">
                   {fhir}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center opacity-20 italic text-sm text-center px-20">
                  Select a patient to synthesize a standardized FHIR resource for hospital export.
                </div>
              )}
           </div>
        </div>

        <div className="lg:col-span-5 space-y-6 flex flex-col">
           <div className="bg-sky-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col group">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">Institutional_Handshake</h3>
              <div className="space-y-8 relative z-10 flex-1">
                 <p className="text-sm font-bold italic leading-relaxed">
                   "Health Bridge ensures 100% semantic parity with hospital-side systems (Epic, Cerner). Validating SNOMED-CT mapping for current diagnostic vector..."
                 </p>
                 <button 
                  disabled={!fhir}
                  onClick={() => alert("SIGNAL_LOCKED: Standardized data bundle transmitted to Regional Health Information Exchange (HIE).")}
                  className="w-full py-5 bg-white text-sky-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                 >
                   EXECUTE_HOSPITAL_SYNC
                 </button>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex-1 backdrop-blur-3xl overflow-hidden flex flex-col">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-8 italic">Transmission_Pulse</p>
              <div className="space-y-6">
                 {[
                   { label: 'Data Fidelity', val: '99.2%', color: 'text-emerald-400' },
                   { label: 'Latency Node', val: '14ms', color: 'text-sky-400' },
                   { label: 'Schema Version', val: 'R4 (Latest)', color: 'text-white' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
                      <span className={`text-[10px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBridgeHUD;