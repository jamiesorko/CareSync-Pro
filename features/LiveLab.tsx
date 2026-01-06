
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decode, encode, decodeAudioData } from '../utils/audioHelpers';
import Translate from '../components/Translate';

interface Props {
  language: string;
}

const LiveLab: React.FC<Props> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [status, setStatus] = useState('Ready_to_Connect');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
    setStatus('Disconnected');
  }, []);

  const startSession = async () => {
    try {
      setStatus('Connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setStatus('Live_Listening');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const content = message.serverContent;
            if (!content) return;

            if (content.outputTranscription?.text) {
              setTranscripts(prev => [...prev.slice(-10), `Model: ${content.outputTranscription?.text}`]);
            }
            if (content.inputTranscription?.text) {
              setTranscripts(prev => [...prev.slice(-10), `You: ${content.inputTranscription?.text}`]);
            }

            const modelTurn = content.modelTurn;
            if (modelTurn?.parts && modelTurn.parts.length > 0) {
              const base64Audio = modelTurn.parts[0].inlineData?.data;
              if (base64Audio) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                const buffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
                const source = outputCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(outputCtx.destination);
                source.onended = () => sourcesRef.current.delete(source);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
              }
            }

            if (content.interrupted) {
              for (const source of sourcesRef.current.values()) {
                try { source.stop(); } catch(err) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => setStatus('Connection_Error'),
          onclose: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: 'You are a fast-responding voice assistant. Keep answers brief and conversational.'
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('Failed_to_Start');
    }
  };

  useEffect(() => {
    return () => { if (sessionRef.current) sessionRef.current.close(); };
  }, []);

  return (
    <div className="h-full flex flex-col space-y-10 animate-in fade-in duration-700">
      <div className="bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
           <span className="text-8xl font-black italic text-white uppercase">Live</span>
        </div>
        
        <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-1000 ${isActive ? 'bg-indigo-600/10 border-4 border-indigo-500 shadow-[0_0_80px_rgba(99,102,241,0.3)] scale-110' : 'bg-white/5 border-2 border-white/10'}`}>
          <div className={`w-16 h-16 rounded-full transition-all duration-500 ${isActive ? 'bg-indigo-500 animate-pulse' : 'bg-slate-800'}`}></div>
        </div>
        
        <div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
            <Translate targetLanguage={language}>Direct_Neural_Link</Translate>
          </h2>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mt-3 ${isActive ? 'text-indigo-400' : 'text-slate-700'}`}>
            <Translate targetLanguage={language}>{status}</Translate>
          </p>
        </div>
        
        <button 
          onClick={isActive ? stopSession : startSession} 
          className={`px-16 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all shadow-3xl ${isActive ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-white text-black hover:scale-105 active:scale-95'}`}
        >
          {isActive ? <Translate targetLanguage={language}>TERMINATE_SIGNAL</Translate> : <Translate targetLanguage={language}>OPEN_CHANNEL</Translate>}
        </button>
      </div>

      <div className="flex-1 bg-black/40 rounded-[3.5rem] border border-white/5 p-10 overflow-hidden flex flex-col shadow-inner backdrop-blur-3xl">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8 italic">
           <Translate targetLanguage={language}>Acoustic_Transcription_Buffer</Translate>
        </h3>
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pr-2">
          {transcripts.map((t, i) => (
            <div key={i} className={`text-sm p-6 rounded-[2rem] border transition-all animate-in slide-in-from-bottom-2 ${t.startsWith('You:') ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-100 ml-12' : 'bg-white/[0.03] border-white/5 text-slate-300 mr-12'}`}>
               <p className="font-medium italic leading-relaxed">{t}</p>
            </div>
          ))}
          {transcripts.length === 0 && (
            <div className="h-full flex items-center justify-center opacity-20 italic">
               <p className="text-sm font-black uppercase tracking-widest leading-none">
                  <Translate targetLanguage={language}>Awaiting_Acoustic_Signals</Translate>
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveLab;
