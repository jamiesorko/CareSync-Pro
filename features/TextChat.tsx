
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';
import { Translate } from '../components/Translate';

interface Props {
  language: string;
}

const TextChat: React.FC<Props> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await geminiService.generateText(input, useSearch);
      const text = response.text || "No response received.";
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title,
        uri: chunk.web?.uri
      })).filter((s: any) => s.uri) || [];

      const aiMsg: Message = { 
        role: 'model', 
        text: text, 
        timestamp: new Date(),
        groundingSources: sources
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Error generating response. Please check your connection or prompt.", 
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-2xl shadow-xl border border-white/10 overflow-hidden backdrop-blur-xl">
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/20">
        <h2 className="font-black text-white uppercase tracking-widest text-xs italic">
          <Translate target={language}>Knowledge_Hub</Translate>
        </h2>
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={useSearch} 
            onChange={(e) => setUseSearch(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-black text-indigo-500 focus:ring-0"
          />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-300">
            <Translate target={language}>Google_Search_Grounding</Translate>
          </span>
        </label>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 opacity-50">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-[10px] font-black uppercase tracking-widest italic">
              <Translate target={language}>Start_a_conversation_with_Gemini_Flash</Translate>
            </p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-[2rem] px-6 py-4 ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none border border-indigo-400/30' 
                : 'bg-white/5 text-slate-200 rounded-bl-none border border-white/5'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium italic">
                {m.text}
              </p>
              
              {m.groundingSources && m.groundingSources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[8px] uppercase font-black text-slate-500 mb-3 tracking-widest">
                    <Translate target={language}>SOURCES</Translate>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {m.groundingSources.map((s, idx) => (
                      <a 
                        key={idx} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all text-indigo-400 italic"
                      >
                        {s.title || 'Source'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-6 py-4 rounded-3xl rounded-bl-none border border-white/5">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-6 bg-black/20 border-t border-white/5">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800 italic"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 disabled:opacity-30 transition-all shadow-xl shadow-indigo-600/20"
          >
            <Translate target={language}>SEND</Translate>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextChat;
