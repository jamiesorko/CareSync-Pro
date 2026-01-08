
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { mediaService } from '../services/mediaService';
import { Translate } from '../components/Translate';

interface Props {
  language: string;
}

const VideoLab: React.FC<Props> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setVideoUri(null);
    setStatus('Drafting temporal consistency...');
    
    try {
      const uri = await geminiService.generateVideo(prompt);
      if (uri) setVideoUri(uri);
    } catch (err: any) {
      alert("Video generation failed. Please ensure a valid API key is selected.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUri) return;
    await mediaService.triggerDownload(videoUri, `caresync-sim-${Date.now()}.mp4`);
  };

  return (
    <div className="space-y-10 h-full overflow-y-auto pb-20 scrollbar-hide">
      <div className="bg-slate-950 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
           <span className="text-9xl font-black italic uppercase text-white">VEO</span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">
            <Translate target={language}>Cinematic_Synthesis</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-10">
            Generate high-fidelity training simulations or reminiscence visuals.
          </p>

          <div className="space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a clinical scenario..."
              className="w-full h-40 p-8 bg-white/[0.02] border border-white/10 rounded-[3.5rem] text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all italic"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl transition-all"
            >
              {loading ? status : <Translate target={language}>INITIATE_VEO_FORGE</Translate>}
            </button>
          </div>
        </div>
      </div>

      {videoUri && (
        <div className="bg-white/[0.02] p-6 rounded-[4rem] border border-white/5 animate-in zoom-in duration-700 shadow-3xl">
          <video 
            src={`${videoUri}&key=${process.env.API_KEY}`} 
            controls 
            autoPlay 
            loop 
            className="w-full rounded-[3rem] aspect-video bg-black shadow-inner" 
          />
          <div className="mt-8 flex justify-between items-center px-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Signal_Locked</span>
            </div>
            <button 
              onClick={handleDownload}
              className="px-10 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              <Translate target={language}>Download_Master_File</Translate>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLab;
