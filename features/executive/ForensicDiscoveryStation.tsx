
import React, { useState } from 'react';
import { forensicDiscoveryService } from '../../services/forensicDiscoveryService';
import { Client, ForensicDossier } from '../../types';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
  clients: Client[];
}

const ForensicDiscoveryStation: React.FC<Props> = ({ language, clients }) => {
  const [dossier, setDossier] = useState<ForensicDossier | null>(null);
  const [loading, setLoading] = useState(false);

  const runReconstruction = async () => {
    setLoading(true);
    const client = clients[0];
    const mockEvidence = [
      { type: 'GPS', data: 'Verified on-site 08:02 - 09:14', id: 'gps-9' },
      { type: 'AUDIO', data: 'Scribe: Patient noted mild dysphasia at breakfast.', id: 'aud-4' },
      { type: 'IOT', data: 'Hoyer Lift cycle confirmed 08:35', id: 'iot-1' }
    ];

    try {
      const result = await forensicDiscoveryService.reconstructCrisis(client, mockEvidence);
      setDossier(result);
    } catch (e) {
      alert("Evidence Nexus Drift. Recalibrating...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full space-y-12 animate-in fade-in duration-1000 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-rose-500">
             <Translate target={language}>Forensic_Discovery_Station</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
             <Translate target={language}>Deep_Evidence_Reconstruction_Legal_Defense_Matrix</Translate>
          </p>
        </div>
        <button 
          onClick={runReconstruction}
          disabled={loading}
          className="px-10 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-slate-700 transition-all shadow-2xl"
        >
          {loading ? <Translate target={language}>RECONSTRUCTING_VECTORS</Translate> : <Translate target={language}>INITIALIZE_DISCOVERY_SWEEP</Translate>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-black border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
           
           <div className="flex justify-between items-start relative z-10 mb-16">
              <div>
                 <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
                    <Translate target={language}>Multimodal_Event_Trace</Translate>
                 </h3>
                 <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-2">
                    <Translate target={language}>Target_Frame_2025_10_15</Translate>
                 </p>
              </div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                    <Translate target={language}>Defensibility_Index</Translate>
                 </p>
                 <p className={`text-4xl font-black italic tracking-tighter ${dossier && dossier.legalDefensibilityScore > 90 ? 'text-emerald-400' : 'text-rose-500'}`}>
                   {dossier ? dossier.legalDefensibilityScore : '--'}%
                 </p>
              </div>
           </div>

           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="w-20 h-20 border-4 border-rose-500/10 border-t-rose-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] animate-pulse">
                   <Translate target={language}>Forging_Truth_Vector</Translate>
                </p>
             </div>
           ) : dossier && (
             <div className="flex-1 space-y-12 relative z-10">
                <div className="space-y-6">
                   {dossier.multimodalTimeline.map((node, i) => (
                     <div key={i} className="flex items-start gap-8 group">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
                           <div className="w-px h-12 bg-white/5"></div>
                        </div>
                        <div className="flex-1 p-6 bg-white/[0.03] border border-white/5 rounded-2xl group-hover:bg-white/5 transition-all">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase">{node.time} • <Translate target={language}>{node.source}</Translate></span>
                              <span className="text-[8px] font-mono text-slate-700 uppercase">{node.hash}</span>
                           </div>
                           <p className="text-xs text-slate-200 font-medium italic">
                              "<Translate target={language}>{node.evidence}</Translate>"
                           </p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="p-10 bg-rose-600/5 border border-rose-500/20 rounded-[3rem]">
                   <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-4">
                      <Translate target={language}>Neural_Truth_Synthesis</Translate>
                   </p>
                   <p className="text-xl font-bold text-white italic leading-relaxed uppercase tracking-tighter">
                      "<Translate target={language}>{dossier.truthVector}</Translate>"
                   </p>
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex-1 flex flex-col">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 text-slate-500 italic">
                 <Translate target={language}>Exposure_Analysis</Translate>
              </h3>
              <div className="flex-1 space-y-8 relative z-10">
                 <p className="text-base font-bold italic leading-relaxed">
                   <Translate target={language}>{dossier?.exposureAnalysis || "Awaiting_signal_fusion"}</Translate>
                 </p>
                 <button className="w-full mt-auto py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                   <Translate target={language}>AUTHORIZE_DISCOVERY_BUNDLE</Translate>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ForensicDiscoveryStation;
