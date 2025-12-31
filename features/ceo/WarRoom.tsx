
import React, { useState, useEffect } from 'react';
import { geminiService } from '../../services/geminiService';
import LiveMap from '../coordination/LiveMap';
// Added missing RefreshCw import from lucide-react
import { Scan, ShieldAlert, Radio, Globe, RefreshCw } from 'lucide-react';

interface Props {
  language: string;
}

const WarRoom: React.FC<Props> = ({ language }) => {
  const [marketIntel, setMarketIntel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<any[]>([]);

  const fetchMarketIntel = async () => {
    setLoading(true);
    const query = "Current home care nursing shortages, local emergency weather hazards, and public health trends in Toronto, Ontario October 2025.";
    try {
      const res = await geminiService.getMarketIntelligence(query);
      setMarketIntel(res.text || "Situational data nominal.");
      setSources(res.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (e) {
      setMarketIntel("Neural intercept failure. Re-establishing connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMarketIntel(); }, []);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-1000">
      {/* High-Intensity Header */}
      <div className="bg-rose-600/10 border border-rose-500/30 p-8 rounded-[3rem] shadow-2xl flex justify-between items-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.4)] animate-pulse">
               <ShieldAlert className="text-white" size={32} />
            </div>
            <div>
               <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">WAR_ROOM: SECTOR_ONTARIO</h2>
               <p className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.4em] mt-2 italic">Active Command Intercept • Unified Intelligence Deck</p>
            </div>
         </div>
         <div className="flex gap-4 relative z-10">
            <div className="text-right px-6 py-2 border-r border-white/10">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Signal Status</p>
               <p className="text-xs font-black text-emerald-400 uppercase italic">Grounded_Sync</p>
            </div>
            <div className="text-right px-6 py-2">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-10">Force Protection</p>
               <p className="text-xs font-black text-sky-400 uppercase italic">Active_Lock</p>
            </div>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Live GPS Deployment Deck */}
        <div className="lg:col-span-8 relative group h-full">
           <div className="absolute -top-3 -right-3 z-50 bg-rose-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-xl animate-pulse flex items-center gap-2">
              <Scan size={10} /> Live_Deployment_Telemetry
           </div>
           <LiveMap language={language} />
        </div>

        {/* Intelligence Intercept Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
              <Globe size={300} strokeWidth={1} />
           </div>
           
           <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                 <Radio className="text-amber-500 animate-pulse" size={18} />
                 <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Regional_Signals</h3>
              </div>
              <button 
                onClick={fetchMarketIntel}
                className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all"
              >
                {/* Fixed: Added missing import for RefreshCw from lucide-react */}
                <RefreshCw size={14} />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pr-2 relative z-10">
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 bg-white/5 rounded-full w-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest text-center animate-pulse mt-8 italic">Ingesting_Sector_Grounded_Telemetry...</p>
                </div>
              ) : (
                <>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
                    <p className="text-xs leading-relaxed text-slate-200 font-medium italic">"{marketIntel}"</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Verification_Nodes</p>
                    <div className="flex flex-wrap gap-2">
                      {sources.map((s, i) => s.web && (
                        <a key={i} href={s.web.uri} target="_blank" className="text-[8px] bg-white/5 border border-white/5 px-3 py-2 rounded-xl text-amber-400 truncate max-w-full hover:bg-amber-500/10 transition-all font-bold">
                          {s.web.title}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-sky-600/5 border border-sky-500/20 rounded-3xl">
                     <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Command_Advisory</p>
                     <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                        "Deploy Roster Buffers in Sector 4 to account for regional transit impedance detected via Search Grounding."
                     </p>
                  </div>
                </>
              )}
           </div>

           <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4 relative z-10">
              <button className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                AUTHORIZE_EMERGENCY_RE-ROUTE
              </button>
              <button className="w-full py-5 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
                EXPORT_SITUATIONAL_BRIEF
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
