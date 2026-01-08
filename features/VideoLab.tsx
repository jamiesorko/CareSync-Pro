
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Translate } from '../components/Translate';

interface Props {
  language: string;
}

const VideoLab: React.FC<Props> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Thinking about composition...",
    "Drafting temporal consistency...",
    "Simulating physics...",
    "Rendering high-quality frames...",
    "Finalizing pixels..."
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    if (!await (window as any).aistudio?.hasSelectedApiKey()) {
      await (window as any).aistudio?.openSelectKey();
    }

    setLoading(true);
    setVideoUrl(null);
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % steps.length);
    }, 4000);

    try {
      const url = await geminiService.generateVideo(prompt);
      setVideoUrl(url);
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio?.openSelectKey();
      }
      alert("Video synthesis failure.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="h-full space-y-10 overflow-y-auto scrollbar-hide pb-20">
      <div className="bg-slate-950 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-15 transition-opacity">
           <span className="text-9xl font-black italic uppercase text-white">VEO</span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">
            {/* Standardized Translate prop to target */}
            <Translate target={language}>Cinematic_Synthesis</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-10 italic">
            {/* Standardized Translate prop to target */}
            <Translate target={language}>Generate high-fidelity clinical training videos or therapeutic reminiscence visuals from text descriptions. Requires specialized neural authorization.</Translate>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-400 hover:underline ml-2">
              {/* Standardized Translate prop to target */}
              <Translate target={language}>Billiing_Directives</Translate>
            </a>
          </p>

          <div className="space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="..."
              className="w-full h-40 p-10 bg-white/[0.02] border border-white/10 rounded-[3.5rem] text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-all italic font-medium leading-relaxed"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.6em] disabled:opacity-30 transition-all flex items-center justify-center space-x-4 shadow-3xl shadow-indigo-600/20"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {/* Standardized Translate prop to target */}
                  <Translate target={language}>{steps[step]}</Translate>
                </>
              ) : (
                /* Standardized Translate prop to target */
                <Translate target={language}>INITIATE_VEO_FORGE</Translate>
              )}
            </button>
          </div>
        </div>
      </div>

      {videoUrl && (
        <div className="bg-white/[0.02] p-4 rounded-[4rem] shadow-3xl border border-white/5 overflow-hidden animate-in zoom-in duration-1000">
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            loop 
            className="w-full rounded-[3.5rem] aspect-video bg-black shadow-inner"
          />
          <div className="p-10 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                 {/* Standardized Translate prop to target */}
                 <Translate target={language}>Neural_Render_Complete</Translate>
               </span>
            </div>
            <a 
              href={videoUrl} 
              target="_blank" 
              className="text-[9px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 px-8 py-3 rounded-2xl transition-all border border-white/10 text-white"
            >
              {/* Standardized Translate prop to target */}
              <Translate target={language}>Download_Master_File</Translate>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLab;
