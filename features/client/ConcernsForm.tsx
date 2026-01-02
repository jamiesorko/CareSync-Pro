
import React, { useState } from 'react';
import { Send, MessageCircle, AlertTriangle } from 'lucide-react';
import Translate from '../../components/Translate';
import { geminiService } from '../../services/geminiService';

interface Props {
  language: string;
  onSent: () => void;
}

const ConcernsForm: React.FC<Props> = ({ language, onSent }) => {
  const [text, setText] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isTransmitting) return;

    setIsTransmitting(true);
    try {
      // LOGIC: Translate the user's input (any language) to English for the main supervisor
      const englishReport = await geminiService.translateToEnglish(text);
      
      // Simulation of transmission to office
      console.log("[SUPERVISOR_LINK]: Report received in English:", englishReport);
      
      alert("Transmission_Complete: Your report has been translated and sent to the clinical office.");
      setText('');
      onSent();
    } catch (err) {
      alert("Link_Failure: Technical drift in neural relay.");
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <div className="glass-card p-10 rounded-[3.5rem] bg-rose-600/5 border-rose-500/10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-xl">
          <MessageCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
            <Translate targetLanguage={language}>Direct_Supervisor_Link</Translate>
          </h3>
          <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mt-1 italic">
             <Translate targetLanguage={language}>Global_to_English_Relay</Translate>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your concern in your own language..."
          className="w-full h-40 p-8 bg-black/40 border border-white/10 rounded-[3rem] text-sm text-white focus:outline-none focus:border-rose-500 transition-all italic placeholder:text-slate-800"
        />
        
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
          <AlertTriangle size={14} className="text-amber-500" />
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
            <Translate targetLanguage={language}>Your message will be translated into English for clinical review.</Translate>
          </p>
        </div>

        <button
          disabled={isTransmitting || !text.trim()}
          className="w-full py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-4"
        >
          {isTransmitting ? 'TRANSMITTING...' : 'SEND_REPORT'}
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ConcernsForm;
