
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '../../types';
import { Translate } from '../../components/Translate';
import { clinicalContinuityForge, HandoverAsset } from '../../services/clinicalContinuityForge';

interface Props {
  client: Client;
  lastNote: string;
  language: string;
  onFinalize: () => void;
  onCancel: () => void;
}

const HandoverStudio: React.FC<Props> = ({ client, lastNote, language, onFinalize, onCancel }) => {
  const [asset, setAsset] = useState<HandoverAsset | null>(null);
  const [isForging, setIsForging] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const init = async () => {
      const result = await clinicalContinuityForge.forgeShiftHandover(client, [], lastNote);
      setAsset(result);
      setIsForging(false);
    };
    init();
  }, [client, lastNote]);

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-3xl bg-[#020617] border border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(14,165,233,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
           <div>
             <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                <Translate target={language}>Handover_Studio</Translate>
             </h2>
             <p className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.4em] mt-3">
                <Translate target={language}>Synthesizing_Deployment_Continuity</Translate>
             </p>
           </div>
           <div className={`px-4 py-1.5 rounded-full border ${asset?.urgency === 'HIGH' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'} text-[8px] font-black uppercase tracking-widest animate-pulse`}>
             {isForging ? <Translate target={language}>Processing</Translate> : <Translate target={language}>{`${asset?.urgency}_RISK`}</Translate>}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide">
          {isForging ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] animate-pulse">
                 <Translate target={language}>Neural_Synthesis_In_Progress</Translate>
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-8">
                    <Translate target={language}>Acoustic_Continuity_Briefing</Translate>
                 </p>
                 <button 
                  className={`w-24 h-24 rounded-full border-4 transition-all flex items-center justify-center mx-auto ${isPlaying ? 'bg-sky-600 border-white animate-pulse' : 'bg-white border-transparent hover:scale-110'}`}
                 >
                   <span className="text-3xl">{isPlaying ? '🔊' : '▶️'}</span>
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">
                     <Translate target={language}>Critical_Focus</Translate>
                  </h4>
                  <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl min-h-[140px]">
                    <p className="text-sm text-slate-200 italic leading-relaxed">
                       "<Translate target={language}>{asset?.criticalAlertText || ""}</Translate>"
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">
                     <Translate target={language}>Biometric_Drift</Translate>
                  </h4>
                  <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl min-h-[140px]">
                    <p className="text-sm text-sky-400 font-mono uppercase tracking-tighter">
                       <Translate target={language}>SIGNAL</Translate>: <Translate target={language}>{asset?.biometricDeltaWarning || ""}</Translate>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-12 border-t border-white/5 bg-white/[0.02] flex gap-6">
           <button onClick={onCancel} className="flex-1 py-6 rounded-2xl bg-white/5 border border-white/10 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
             <Translate target={language}>Abort</Translate>
           </button>
           <button 
             disabled={isForging}
             onClick={onFinalize}
             className="flex-[2] py-6 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
           >
             <Translate target={language}>AUTHORIZE_HANDOVER</Translate>
           </button>
        </div>
      </div>
    </div>
  );
};

export default HandoverStudio;
