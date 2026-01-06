
import React, { useState } from 'react';
import { gemini } from './gemini';
import { Translate } from './Translate';

export const ZenStation = ({ lang }: { lang: string }) => {
  const [prompt, setPrompt] = useState('A serene 1950s park with a gentle breeze through autumn trees.');
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const forge = async () => {
    setLoading(true);
    try {
      const url = await gemini.generateZen(prompt);
      setVideo(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-[5rem] p-16 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
      <div className="absolute top-0 right-0 p-10 opacity-5 font-black italic text-9xl text-white pointer-events-none">ZEN</div>
      
      <div className="relative z-10 flex flex-col h-full space-y-12">
        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
          <Translate target={lang}>Therapeutic_Zen_Station</Translate>
        </h3>

        {video ? (
          <div className="aspect-video bg-black rounded-[3rem] overflow-hidden shadow-3xl border border-white/10 animate-in zoom-in duration-1000">
             <video src={video} controls autoPlay loop className="w-full h-full object-cover" />
             <button onClick={() => setVideo(null)} className="absolute top-6 right-6 p-4 bg-black/40 rounded-full text-white">✕</button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center space-y-12">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-6 italic">Neural Experience Forge</p>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-2xl font-bold italic text-white outline-none focus:border-sky-500 transition-all"
              />
            </div>
            <button 
              onClick={forge}
              disabled={loading}
              className="px-16 py-8 bg-white text-black rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
            >
              {loading ? 'FORGING_EXPERIENCE...' : 'INITIALIZE_ZEN_MOMENT'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
