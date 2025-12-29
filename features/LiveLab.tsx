
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decode, encode, decodeAudioData } from '../utils/audioHelpers';

const LiveLab: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [status, setStatus] = useState('Ready to connect');
  
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
      setStatus('Connecting...');
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
            setStatus('Live Listening');
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
              setTranscripts(prev => [...prev.slice(-10), `Model: ${content.outputTranscription.text}`]);
            }
            if (content.inputTranscription?.text) {
              setTranscripts(prev => [...prev.slice(-10), `You: ${content.inputTranscription.text}`]);
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
          onerror: (e) => setStatus('Connection Error'),
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
      setStatus('Failed to start session');
    }
  };

  useEffect(() => {
    return () => { if (sessionRef.current) sessionRef.current.close(); };
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="glass-panel rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-red-100 animate-pulse scale-110' : 'bg-slate-800'}`}>
          <div className={`w-12 h-12 rounded-full ${isActive ? 'bg-red-500' : 'bg-slate-600'}`}></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Live Multimodal API</h2>
          <p className={`text-sm font-medium mt-1 ${isActive ? 'text-red-500' : 'text-slate-500'}`}>{status}</p>
        </div>
        <button onClick={isActive ? stopSession : startSession} className={`px-8 py-3 rounded-full font-bold transition-all ${isActive ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'}`}>
          {isActive ? 'Stop Conversation' : 'Start Talking'}
        </button>
      </div>
      <div className="flex-1 bg-slate-900/50 rounded-3xl border border-white/5 p-6 overflow-hidden flex flex-col">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Transcription Feed</h3>
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
          {transcripts.map((t, i) => (
            <div key={i} className={`text-sm p-4 rounded-2xl ${t.startsWith('You:') ? 'bg-blue-600/10 text-blue-100 ml-4' : 'bg-white/5 text-slate-300 mr-4'}`}>{t}</div>
          ))}
          {transcripts.length === 0 && <p className="text-slate-600 text-sm italic text-center mt-20">Voice activity will be transcribed here...</p>}
        </div>
      </div>
    </div>
  );
};

export default LiveLab;
