
import React, { useState } from 'react';
import { Star, ShieldOff, Heart, AlertCircle } from 'lucide-react';
import Translate from '../../components/Translate';

interface Props {
  pswName: string;
  isNew: boolean;
  language: string;
  onBlacklist: () => void;
  onRate: (score: number) => void;
}

const PSWCard: React.FC<Props> = ({ pswName, isNew, language, onBlacklist, onRate }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="glass-card p-10 rounded-[3.5rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Heart size={80} />
      </div>

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div>
          {isNew && (
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-500 text-[8px] font-black rounded-lg uppercase mb-4 inline-block tracking-widest animate-pulse">
              {/* Fix: Changed targetLanguage to target to match components/Translate.tsx props */}
              <Translate target={language}>NEW_WORKER_TO_HOME</Translate>
            </span>
          )}
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{pswName}</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Active Care Professional</p>
        </div>
        
        <button 
          onClick={onBlacklist}
          className="p-4 bg-rose-600/10 border border-rose-500/20 text-rose-500 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-lg group/btn"
        >
          <ShieldOff size={20} />
          <div className="absolute top-full right-0 mt-2 hidden group-hover/btn:block bg-black text-white text-[8px] font-black uppercase p-2 rounded whitespace-nowrap z-50">Restrict_Staff</div>
        </button>
      </div>

      <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">
          {/* Fix: Changed targetLanguage to target to match components/Translate.tsx props */}
          <Translate target={language}>Rate_This_Worker's_Performance</Translate>
        </p>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => { setRating(star); onRate(star); }}
              className={`p-2 transition-all transform hover:scale-125 ${rating >= star ? 'text-amber-400 drop-shadow-[0_0_10px_#fbbf24]' : 'text-slate-700'}`}
            >
              <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PSWCard;
