
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { encode, decode, decodeAudioData } from '../../utils/audioHelpers';
import { geminiService } from '../../services/geminiService';
import { financialReconciliationService } from '../../services/financialReconciliationService';

interface Props {
  language: string;
}

const NeuralScribe: React.FC<Props> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [transcript, setTranscript] = useState("");
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
          const text = msg.serverContent?.inputTranscription?.text;
          if (text) setTranscript(prev => prev + " " + text);
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

  const stopScribe = () => {
    if (session) session.close();
    setIsActive(false);
  };

  return (
    <div className="alaya-card p-6 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white uppercase italic">Neural Scribe</h3>
          <p className="text-[9px] font-medium text-sky-400 uppercase tracking-widest mt-1">Autonomous Clinical Documentation</p>
        </div>
        <button 
          onClick={isActive ? stopScribe : startScribe}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isActive ? 'bg-rose-600 animate-pulse' : 'bg-sky-600 hover:scale-105'
          }`}
        >
          {isActive ? '⏹️' : '🎙️'}
        </button>
      </div>

      <div className="bg-black/40 p-4 rounded-xl border border-white/5 min-h-[100px]">
        <p className="text-xs text-slate-400 leading-relaxed italic">{transcript || "Awaiting voice signal..."}</p>
      </div>
    </div>
  );
};

export default NeuralScribe;
