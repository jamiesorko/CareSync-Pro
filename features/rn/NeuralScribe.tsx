import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { encode, decode, decodeAudioData } from '../../utils/audioHelpers';
import { geminiService } from '../../services/geminiService';
import { financialReconciliationService } from '../../services/financialReconciliationService';
import Translate from '../../components/Translate';

interface Props {
  language: string;
}

const NeuralScribe: React.FC<Props> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [transcript, setTranscript] = useState("");
  const [extractedData, setExtractedData] = useState<any>(null);
  const [revenueGaps, setRevenueGaps] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startScribe = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    audioContextRef.current = inputCtx;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          setIsActive(true);
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const data = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(data.length);
            for(let i=0; i<data.length; i++) int16[i] = data[i] * 32768;
            sessionPromise.then(s => s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: (msg) => {
          if (msg.serverContent?.inputTranscription) {
            setTranscript(prev => prev + " " + msg.serverContent.inputTranscription.text);
          }
        },
        onclose: () => setIsActive(false)
      },
      config: {
        responseModalities: [Modality.AUDIO],
        inputAudioTranscription: {}
      }
    });
    setSession(await sessionPromise);
  };

  const stopScribeAndAnalyze = async () => {
    if (session) session.close();
    setIsActive(false);
    setIsAnalyzing(true);
    
    try {
      const insights = await geminiService.extractClinicalInsights(transcript);
      setExtractedData(insights);
      
      // Hook into Fiscal Reconciliation
      const gaps = await financialReconciliationService.auditVisitRevenue('v-auto-gen', transcript, ['BASIC_PS']);
      setRevenueGaps(gaps);
    } catch (e) {
      console.error("Neural analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Neural_Scribe_v4</h3>
          <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mt-2">Autonomous Clinical & Fiscal Documentation</p>
        </div>
        <button 
          onClick={isActive ? stopScribeAndAnalyze : startScribe}
          className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all shadow-2xl ${
            isActive ? 'bg-rose-600 animate-pulse' : 'bg-sky-600 hover:scale-105'
          }`}
        >
          {isActive ? '⏹️' : '🎙️'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 bg-white/[0.03] p-8 rounded-3xl border border-white/5 min-h-[300px]">
           <p className="text-[8px] font-black text-slate-500 uppercase mb-4">Tactical Voice Log</p>
           <p className="text-sm text-slate-300 leading-relaxed italic">{transcript || "Waiting for operative signal..."}</p>
           {isAnalyzing && (
             <div className="mt-8 flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></div>
               <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Synthesizing Clinical Truth...</span>
             </div>
           )}
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
             <p className="text-[8px] font-black text-sky-500 uppercase mb-4">Neural Clinical Summary</p>
             {extractedData ? (
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sky-500/10 p-4 rounded-xl">
                      <p className="text-[7px] font-bold text-sky-400 uppercase">Heart Rate</p>
                      <p className="text-2xl font-black text-white">{extractedData.vitals?.heartRate || '--'}</p>
                    </div>
                    <div className="bg-sky-500/10 p-4 rounded-xl">
                      <p className="text-[7px] font-bold text-sky-400 uppercase">BP Vector</p>
                      <p className="text-2xl font-black text-white">{extractedData.vitals?.bp || '--'}</p>
                    </div>
                  </div>
               </div>
             ) : (
               <p className="text-[10px] text-slate-600 italic">No clinical insights extracted.</p>
             )}
          </div>

          <div className="bg-emerald-600/10 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 font-black italic text-2xl text-emerald-500">REV</div>
             <p className="text-[8px] font-black text-emerald-500 uppercase mb-4 tracking-widest">Fiscal Leakage Guard</p>
             {revenueGaps.length > 0 ? (
               <div className="space-y-2">
                 {revenueGaps.map((gap, i) => (
                   <div key={i} className="flex justify-between items-center">
                     <p className="text-[10px] font-black text-white uppercase italic leading-none">{gap.missingProcedure}</p>
                     <p className="text-xs font-black text-emerald-400">+${gap.estimatedValue}</p>
                   </div>
                 ))}
                 <p className="text-[7px] text-slate-500 mt-2 italic">Signal pushed to Neural Ledger for recovery.</p>
               </div>
             ) : (
               <p className="text-[10px] text-slate-600 italic">No billable gaps detected in narrative.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralScribe;