
import React, { useState, useEffect } from 'react';
import { Client, CareRole, AlertType } from '../../types';
import Translate from '../../components/Translate';
import NeuralScribe from '../rn/NeuralScribe';

interface Props {
  client: Client;
  onClockOut: () => void;
  onAlert: (type: AlertType, content: string) => void;
  language: string;
}

const PSWVisitConsole: React.FC<Props> = ({ client, onClockOut, onAlert, language }) => {
  const [elapsed, setElapsed] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const [initialRating, setInitialRating] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFinalize = () => {
    const minutes = Math.floor(elapsed / 60);
    const isAM = new Date().getHours() < 12;
    const minRequired = isAM ? 20 : 15;

    if (minutes < minRequired) {
      alert(`AI_ALERT: Visit duration (${minutes}m) below compliance floor (${minRequired}m). Flagging for HR follow-up.`);
    }
    
    if (client.isInitialVisit && initialRating === null) {
      alert("Please rate if you would like to return to this client.");
      return;
    }

    onClockOut();
  };

  const triggerAlert = (type: AlertType, promptText: string) => {
    const detail = prompt(`CRITICAL SIGNAL: ${promptText}`);
    if (detail) onAlert(type, detail);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-700">
      
      {/* Session Command HUD */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-10">
              <div className="w-32 h-32 rounded-full border-4 border-orange-500/30 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-orange-500/10 rounded-full animate-pulse"></div>
                 <p className="text-3xl font-black italic text-white font-mono">{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</p>
              </div>
              <div>
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h2>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">{client.address}</p>
              </div>
           </div>
           <div className="flex gap-3">
              <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(client.address)}`)} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Tactical_GPS</button>
              <button onClick={handleFinalize} className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-rose-600/30 hover:bg-rose-500 transition-all">Clock_Out</button>
           </div>
        </div>

        {/* Clinical Directives */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10">
           <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10">Care_Plan_Protocol</h3>
           <div className="space-y-4 mb-10">
              {(client.carePlans[CareRole.PSW] || ["Standard Care Protocol"]).map((task, i) => (
                <label key={i} className={`flex items-center gap-6 p-6 rounded-2xl border transition-all cursor-pointer ${checkedTasks[i] ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
                   <input 
                    type="checkbox" 
                    checked={!!checkedTasks[i]} 
                    onChange={() => setCheckedTasks(prev => ({...prev, [i]: !prev[i]}))}
                    className="w-6 h-6 rounded bg-black border-white/10 text-emerald-500"
                   />
                   <p className={`text-sm font-bold italic ${checkedTasks[i] ? 'text-emerald-400 line-through' : 'text-slate-300'}`}>{task}</p>
                </label>
              ))}
           </div>

           {client.isInitialVisit && (
             <div className="p-8 bg-orange-600/10 border border-orange-500/20 rounded-3xl">
                <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-6 italic">Initial_Visit_Review</p>
                <p className="text-sm font-bold text-white mb-6 italic">"Would you like to be scheduled with this client again?"</p>
                <div className="flex gap-4">
                   <button onClick={() => setInitialRating(true)} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${initialRating === true ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-500 border border-white/10'}`}>Yes_Return</button>
                   <button onClick={() => setInitialRating(false)} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${initialRating === false ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-500 border border-white/10'}`}>No_Restrict</button>
                </div>
             </div>
           )}
        </div>

        <NeuralScribe language={language} />
      </div>

      {/* Signal Intercepts Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-rose-600/10 border border-rose-500/20 rounded-[3rem] p-10 shadow-2xl flex flex-col gap-3">
           <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6 italic">Incident_Signal_Burst</h3>
           <button onClick={() => triggerAlert('FALL', "Specify: Fall, Burn, Choking or other medical detail.")} className="p-6 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase text-left group hover:scale-105 transition-all">
              <span className="block mb-1 opacity-60">Clinical</span>
              Fall / Burn / Choking
           </button>
           <button onClick={() => triggerAlert('CLINICAL', "Specify Bedsore/Swelling LOCATION.")} className="p-6 bg-slate-900 border border-white/5 text-rose-400 rounded-2xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block mb-1 opacity-60">Integrity</span>
              Bedsore / Swelling
           </button>
           <button onClick={() => triggerAlert('UNSAFE_ENV', "Specify why environment is unsafe for CARE.")} className="p-6 bg-slate-900 border border-white/5 text-slate-300 rounded-2xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block mb-1 opacity-60">Environmental</span>
              Unsafe for Care Plan
           </button>
           <button onClick={() => triggerAlert('UNSAFE_ENV', "Specify why environment is unsafe for YOU.")} className="p-6 bg-slate-900 border border-white/5 text-slate-300 rounded-2xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block mb-1 opacity-60">Safety</span>
              Unsafe for Worker
           </button>
        </div>

        <div className="bg-amber-600/10 border border-amber-500/20 rounded-[3rem] p-10 flex flex-col gap-3">
           <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 italic">Operational_Alerts</h3>
           <button onClick={() => triggerAlert('MEDICAL', "Awaiting instructions from Coordinator.")} className="p-6 bg-amber-600 text-white rounded-2xl font-black text-[10px] uppercase text-left shadow-xl">
              <span className="block mb-1 opacity-60">Presence</span>
              Not Seen / Not Found
           </button>
        </div>
      </div>

    </div>
  );
};

export default PSWVisitConsole;
