
import React, { useState } from 'react';
import { gemini } from './gemini';
import { Translate } from './Translate';
import { Cpu } from 'lucide-react';

export const StrategyTabletop = ({ lang }: { lang: string }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const res = await gemini.simulateStrategy(prompt);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-700">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl">
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8">
            <Translate target={lang}>Disruption_Parameters</Translate>
          </h3>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm italic outline-none focus:border-indigo-500 transition-all"
            placeholder="E.g. Lose 15% of staff in Sector 4 due to competitor poaching..."
          />
          <button
            onClick={run}
            disabled={loading}
            className="w-full mt-6 py-6 bg-indigo-600 text-white rounded-3xl font-black text-xs tracking-widest uppercase shadow-xl hover:bg-indigo-500 active:scale-95 transition-all"
          >
            {loading ? 'SIMULATING...' : 'EXECUTE_SIMULATION'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-7 bg-slate-950 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden flex flex-col min-h-[500px]">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Cpu size={200} />
        </div>
        {result ? (
          <div className="space-y-10 relative z-10 animate-in zoom-in">
            <div>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Resilience Score</p>
              <p className="text-8xl font-black italic tracking-tighter text-white">{result.resilience}%</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4">Tactical Advisory</p>
              <p className="text-lg font-bold italic leading-relaxed">"{result.advisory}"</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20 italic">
            <Translate target={lang}>Awaiting disruption parameters to map failure points...</Translate>
          </div>
        )}
      </div>
    </div>
  );
};
