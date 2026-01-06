
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audioHelpers';
import Translate from '../components/Translate';

interface Props {
  language: string;
}

const SpeechLab: React.FC<Props> = ({ language }) => {
  const [text, setText] = useState('Welcome to the future of multimodal intelligence.');
  const [voice, setVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const voices = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];

  const handleSynthesize = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);

    try {
      const base64Audio = await geminiService.generateSpeech(text, voice);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (err) {
      alert("Speech synthesis failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700 h-full overflow-y-auto scrollbar-hide pb-20">
      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
           <span className="text-9xl font-black italic text-white uppercase">Vocal</span>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-12 leading-none">
            <Translate targetLanguage={language}>Speech_Synthesis_Station</Translate>
          </h2>
          
          <div className="space-y-10">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">
                 <Translate targetLanguage={language}>Active_Speaker_Node</Translate>
              </label>
              <div className="flex flex-wrap gap-4">
                {voices.map(v => (
                  <button
                    key={v}
                    onClick={() => setVoice(v)}
                    className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      voice === v 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' 
                        : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-10 bg-black/40 border border-white/10 rounded-[3.5rem] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all italic font-medium leading-relaxed scrollbar-hide"
              placeholder="..."
            />

            <button
              onClick={handleSynthesize}
              disabled={loading || !text.trim()}
              className="w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.6em] flex items-center justify-center space-x-4 hover:scale-[1.01] active:scale-95 disabled:opacity-30 transition-all shadow-3xl"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <Translate targetLanguage={language}>SYNTHESIZE_ACOUSTIC_VECTOR</Translate>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechLab;
