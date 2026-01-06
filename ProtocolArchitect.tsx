
import React, { useState } from 'react';
import { gemini } from './gemini';
import { Translate } from './Translate';
import { Shield } from 'lucide-react';

export const ProtocolArchitect = ({ lang }: { lang: string }) => {
  const [objective, setObjective] = useState('');
  const [protocol, setProtocol] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const forge = async () => {
    if (!objective.trim()) return;
    setLoading(true);
    try {
      const res = await gemini.forgeProtocol(objective);
      setProtocol(res || "Protocol forge failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5 bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl">
         <h3 className="text-xl font-black text-white italic uppercase mb-8 leading-none">Protocol_Vector_Ingest</h3>
         <textarea
            value={objective}
            onChange={e => setObjective(e.target.value)}
            className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm italic text-white outline-none focus:border-sky-500 transition-all"
            placeholder="Define protocol objective (e.g. Stage 3 Wound Care in isolation zones)..."
         />
         <button
            onClick={forge}
            disabled={loading}
            className="w-full mt-6 py-6 bg-sky-600 text-white rounded-3xl font-black text-xs tracking-widest uppercase shadow-xl hover:scale-[1.01] transition-all"
         >
           {loading ? 'ARCHITECTING...' : 'INITIATE_FORGE'}
         </button>
      </div>

      <div className="lg:col-span-7 bg-slate-950 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden flex flex-col min-h-[600px]">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Shield size={200} /></div>
        {protocol ? (
          <div className="flex-1 overflow-y-auto scrollbar-hide animate-in slide-in-from-bottom-8">
             <div className="prose prose-invert max-w-none text-slate-300 font-medium italic leading-loose whitespace-pre-wrap">
                {protocol}
             </div>
             <button className="mt-10 px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase shadow-xl">AUTHORIZE_&_PUBLISH</button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center">
             <p className="text-sm font-bold uppercase tracking-widest italic">Awaiting blueprint directive to forge sovereign protocol...</p>
          </div>
        )}
      </div>
    </div>
  );
};
