
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { GeneratedImage } from '../types';
import { Translate } from '../components/Translate';

interface Props {
  language: string;
}

const ImageLab: React.FC<Props> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const url = await geminiService.generateImage(prompt);
      if (url) {
        setImages(prev => [{ url, prompt }, ...prev]);
      }
    } catch (err) {
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 h-full overflow-y-auto scrollbar-hide pb-20">
      <div className="bg-slate-900/50 border border-white/10 p-10 rounded-[3rem] shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
           <span className="text-9xl font-black italic uppercase">Lens</span>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
            {/* Standardized Translate prop to target */}
            <Translate target={language}>Image_Generation_Core</Translate>
          </h2>
          <div className="flex flex-col space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="..."
              className="w-full h-32 p-8 bg-black/40 border border-white/10 rounded-[2.5rem] text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800 italic font-medium leading-relaxed"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-white text-black py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:scale-[1.01] active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-indigo-600/10"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                  {/* Standardized Translate prop to target */}
                  <Translate target={language}>CREATING_ARTWORK</Translate>
                </>
              ) : (
                /* Standardized Translate prop to target */
                <Translate target={language}>GENERATE_LENS_VECTOR</Translate>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        {images.map((img, idx) => (
          <div key={idx} className="group relative bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-600/10">
            <img 
              src={img.url} 
              alt={img.prompt} 
              className="w-full h-auto aspect-square object-cover"
            />
            <div className="p-8 bg-slate-900/90 backdrop-blur-xl border-t border-white/5">
              <p className="text-[11px] text-slate-400 leading-relaxed italic line-clamp-2">"{img.prompt}"</p>
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = img.url;
                  link.download = `caresync-img-${idx}.png`;
                  link.click();
                }}
                className="mt-6 text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                {/* Standardized Translate prop to target */}
                <Translate target={language}>DOWNLOAD_ASSET</Translate>
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && !loading && (
          <div className="col-span-full py-32 bg-white/[0.01] border-4 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-slate-700">
            <svg className="w-20 h-20 mb-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs font-black uppercase tracking-[0.3em] italic">
               {/* Standardized Translate prop to target */}
               <Translate target={language}>Awaiting_Neural_Imaging_Prompt</Translate>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLab;
