
import React, { useState } from 'react';
import { Star, ShieldAlert } from 'lucide-react';
import Translate from '../../components/Translate';

interface Props {
  pswName: string;
  isNew: boolean;
  language: string;
  onRate: (score: number) => void;
  onBlacklist: () => void;
}

const PSWCard: React.FC<Props> = ({ pswName, isNew, language, onRate, onBlacklist }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="glass-card p-8 rounded-[3rem] border-teal-500/20 bg-teal-500/5 relative overflow-hidden group">
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Active_Assignment</p>
          </div>
          <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{pswName}</h3>
          {isNew && (
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-[8px] font-black uppercase rounded-lg border border-amber-500/30">
              <Translate targetLanguage={language}>New_To_Home</Translate>
            </span>
          )}
        </div>
        
        <button 
          onClick={onBlacklist}
          className="px-4 py-2 bg-rose-600/10 border border-rose-500/30 text-rose-500 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all"
        >
          <Translate targetLanguage={language}>Do_Not_Send_Again</Translate>
        </button>
      </div>

      <div className="mt-10 pt-10 border-t border-white/5">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">
          <Translate targetLanguage={language}>Rate_Today's_Service</Translate>
        </p>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => { setRating(star); onRate(star); }}
              className={`p-2 transition-all transform hover:scale-125 ${rating >= star ? 'text-amber-400' : 'text-slate-700'}`}
            >
              <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PSWCard;
