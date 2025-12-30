
import React, { useState, useEffect } from 'react';
import { Client, CareRole, AlertType } from '../../types';
import Translate from '../../components/Translate';
import NeuralScribe from '../rn/NeuralScribe';
import { AlertCircle, ShieldAlert, Clock, MapPin, CheckCircle2, UserPlus, Info, Thermometer, Brain, Home } from 'lucide-react';

interface Props {
  client: Client;
  onClockOut: () => void;
  onAlert: (type: AlertType, content: string) => void;
  language: string;
  role?: CareRole; // Optional role for logic filtering
}

const PSWVisitConsole: React.FC<Props> = ({ client, onClockOut, onAlert, language, role = CareRole.PSW }) => {
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
      alert(`AI_AUDIT: Visit duration (${minutes}m) below compliance floor. Flagging to HR for review.`);
    }
    
    if (client.isInitialVisit && initialRating === null) {
      alert("Please provide return authorization (Initial Visit Protocol).");
      return;
    }

    onClockOut();
  };

  const triggerBlueprintAlert = (type: AlertType, promptText: string) => {
    const detail = prompt(promptText);
    if (detail) {
      onAlert(type, detail);
      alert("SIGNAL_LOCKED: Alert routed to regional command nodes.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Professional Role Logic
  const isNursing = role === CareRole.RN || role === CareRole.RPN;
  const isSocial = role === CareRole.HSS;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700 pb-24">
      
      {/* Session Command HUD */}
      <div className="lg:col-span-8 space-y-8">
        <div className="alaya-card p-10 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 bg-[#020617]">
           <div className="flex items-center gap-10">
              <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative shadow-2xl transition-colors ${isNursing ? 'border-sky-500/20' : isSocial ? 'border-purple-500/20' : 'border-orange-500/20'}`}>
                 <div className={`absolute inset-0 rounded-full animate-pulse opacity-10 ${isNursing ? 'bg-sky-600' : isSocial ? 'bg-purple-600' : 'bg-orange-600'}`}></div>
                 <p className="text-4xl font-black italic text-white font-mono tracking-tighter">{formatTime(elapsed)}</p>
              </div>
              <div className="space-y-2">
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h2>
                 <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={12} className={isNursing ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{client.address}</p>
                 </div>
              </div>
           </div>
           <div className="flex gap-3">
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(client.address)}`)} 
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <MapPin size={14} /> GPS_LINK
              </button>
              <button 
                onClick={handleFinalize} 
                className={`px-10 py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:brightness-110 transition-all flex items-center gap-3 ${isNursing ? 'bg-sky-600 shadow-sky-600/20' : isSocial ? 'bg-purple-600 shadow-purple-600/20' : 'bg-rose-600 shadow-rose-600/30'}`}
              >
                <CheckCircle2 size={14} /> CLOCK_OUT
              </button>
           </div>
        </div>

        {/* Dynamic Care Plan Protocol */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
                 <ShieldAlert size={20} className={isNursing ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'} />
                 {role}_Protocol_Directives
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Target Role: {role}</p>
           </div>
           
           <div className="space-y-4 mb-12">
              {(client.carePlans[role] || ["No assigned tasks for this role."]).map((task, i) => (
                <label key={i} className={`flex items-center gap-6 p-8 rounded-3xl border transition-all cursor-pointer ${checkedTasks[i] ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
                   <input 
                    type="checkbox" 
                    checked={!!checkedTasks[i]} 
                    onChange={() => setCheckedTasks(prev => ({...prev, [i]: !prev[i]}))}
                    className="w-8 h-8 rounded-xl bg-black border-white/10 text-emerald-500 focus:ring-0"
                   />
                   <div className="flex-1">
                      <p className={`text-lg font-bold italic tracking-tight ${checkedTasks[i] ? 'text-emerald-400 line-through opacity-40' : 'text-slate-200'}`}>{task}</p>
                   </div>
                </label>
              ))}
           </div>

           {client.isInitialVisit && (
             <div className={`p-10 border rounded-[3rem] animate-in zoom-in ${isNursing ? 'bg-sky-600/10 border-sky-500/20' : isSocial ? 'bg-purple-600/10 border-purple-500/20' : 'bg-orange-600/10 border-orange-500/20'}`}>
                <div className="flex items-center gap-4 mb-8">
                   <UserPlus className={isNursing ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'} size={24} />
                   <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest italic ${isNursing ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-400'}`}>Initial_Visit_Protocol</p>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Authorize_Permanent_Pairing?</h4>
                   </div>
                </div>
                <p className="text-sm font-bold text-slate-300 mb-8 italic">"Based on professional rapport, should you be permanently assigned to this dossier?"</p>
                <div className="flex gap-4">
                   <button onClick={() => setInitialRating(true)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${initialRating === true ? 'bg-emerald-600 text-white shadow-xl' : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}>Yes_Return</button>
                   <button onClick={() => setInitialRating(false)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${initialRating === false ? 'bg-rose-600 text-white shadow-xl' : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}>Request_Restrict</button>
                </div>
             </div>
           )}
        </div>

        <NeuralScribe language={language} />
      </div>

      {/* Role-Specific Alert Matrix */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-rose-600/10 border border-rose-500/30 rounded-[3.5rem] p-10 shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
           <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6 italic flex items-center gap-3">
              <ShieldAlert size={14} /> {isNursing ? 'Clinical_Emergency' : isSocial ? 'Environmental_Risk' : 'Tactical_Signals'}
           </h3>
           
           {isNursing ? (
             <>
               <button onClick={() => triggerBlueprintAlert('MEDICAL', "Describe medication error or refusal details:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <span className="block opacity-60 mb-1">Nursing</span>
                  Medication Error / Refusal
               </button>
               <button onClick={() => triggerBlueprintAlert('CLINICAL', "Describe clinical deterioration (vitals drift):")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <span className="block opacity-60 mb-1">Vitality</span>
                  Clinical Deterioration
               </button>
             </>
           ) : isSocial ? (
             <>
               <button onClick={() => triggerBlueprintAlert('UNSAFE_ENV', "Specify dwelling hazards (Sanitation/Security):")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <span className="block opacity-60 mb-1">Environment</span>
                  Dwelling Hazard
               </button>
               <button onClick={() => triggerBlueprintAlert('SWELLING', "Describe food insecurity or nutritional drift:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <span className="block opacity-60 mb-1">Determinants</span>
                  Nutritional Drift
               </button>
             </>
           ) : (
             <>
               <button onClick={() => triggerBlueprintAlert('FALL', "Detail fall incident:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  Personal Care Fall
               </button>
               <button onClick={() => triggerBlueprintAlert('BEDSORE', "Specify location of skin breakdown:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  Skin Integrity Breach
               </button>
             </>
           )}

           <button onClick={() => triggerBlueprintAlert('UNSAFE_ENV', "Specify why environment is unsafe for YOU:")} className="p-6 bg-slate-900 border border-white/10 text-slate-300 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block opacity-60 mb-1">Safety</span>
              Unsafe for Staff
           </button>
        </div>

        <div className="bg-amber-600/10 border border-amber-500/30 rounded-[3.5rem] p-10 flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 italic flex items-center gap-3">
              <Clock size={14} /> Operational_Signals
           </h3>
           
           <button onClick={() => triggerBlueprintAlert('NOT_SEEN', "Confirming Not Seen / Not Found.")} className="p-6 bg-amber-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl animate-pulse">
              Not Seen / Not Found
           </button>
        </div>
      </div>

    </div>
  );
};

export default PSWVisitConsole;
