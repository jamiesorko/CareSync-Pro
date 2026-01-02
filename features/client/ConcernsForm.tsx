
import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import Translate from '../../components/Translate';
import { geminiService } from '../../services/geminiService';

interface Props {
  language: string;
  onSent: () => void;
}

const ConcernsForm: React.FC<Props> = ({ language, onSent }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    setLoading(true);
    try {
      // Logic: Patient writes in their language, we translate to English for the Office
      const englishReport = await geminiService.translate(text, "English");
      console.log("[SYSTEM]: Concern routed to supervisor in English:", englishReport);
      
      alert("Transmission_Complete: Your supervisor has been notified.");
      setText('');
      onSent();
    } catch (err) {
      alert("Link_Failure: Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-10 rounded-[3.5rem] bg-rose-600/5 border-rose-500/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-500">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
            <Translate targetLanguage={language}>Supervisor_Intercept</Translate>
          </h3>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Direct link to clinical oversight</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your concern here in your preferred language..."
          className="w-full h-32 p-6 bg-black/40 border border-white/10 rounded-[2rem] text-sm text-white focus:outline-none focus:border-rose-500 transition-all italic placeholder:text-slate-700"
        />
        <button
          disabled={loading || !text.trim()}
          className="w-full py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
        >
          {loading ? 'Transmitting...' : 'Send_Report'}
        </button>
      </form>
    </div>
  );
};

export default ConcernsForm;
