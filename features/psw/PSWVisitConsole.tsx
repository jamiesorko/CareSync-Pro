
import React, { useState, useEffect } from 'react';
import { Client, CareRole, AlertType } from '../../types';
import Translate from '../../components/Translate';
import NeuralScribe from '../rn/NeuralScribe';
import { ShieldAlert, Clock, MapPin, CheckCircle2, Stethoscope, Activity, HeartPulse, UserCheck, Edit3 } from 'lucide-react';

interface Props {
  client: Client;
  onClockOut: () => void;
  onAlert: (type: AlertType, content: string) => void;
  language: string;
  role: CareRole; 
}

const PSWVisitConsole: React.FC<Props> = ({ client, onClockOut, onAlert, language, role }) => {
  const [elapsed, setElapsed] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const isRN = role === CareRole.RN;
  const isRPN = role === CareRole.RPN;
  const isNurse = isRN || isRPN;
  const isSocial = role === CareRole.HSS;

  const handleFinalize = () => {
    const minutes = Math.floor(elapsed / 60);
    const minReq = isNurse ? 20 : 15;
    if (minutes < minReq) {
      alert(`PROFESSIONAL_AUDIT: Visit length (${minutes}m) below professional scope standard. Reason required in Scribe.`);
    }
    onClockOut();
  };

  const triggerSignal = (type: AlertType, promptTxt: string) => {
    const detail = prompt(promptTxt);
    if (detail) {
      onAlert(type, detail);
      alert("SIGNAL_LOCKED: Transmitted to Regional Command.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700">
      
      {/* Session HUD */}
      <div className="lg:col-span-8 space-y-8">
        <div className="alaya-card p-10 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 bg-[#020617]">
           <div className="flex items-center gap-10">
              <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative shadow-2xl ${isNurse ? 'border-sky-500/30' : isSocial ? 'border-purple-500/30' : 'border-orange-500/30'}`}>
                 <div className={`absolute inset-0 rounded-full animate-pulse opacity-10 ${isNurse ? 'bg-sky-500' : isSocial ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                 <p className="text-4xl font-black italic text-white font-mono tracking-tighter">{formatTime(elapsed)}</p>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                   {isNurse ? <Stethoscope className="text-sky-400" size={14} /> : isSocial ? <HeartPulse className="text-purple-400" size={14} /> : <UserCheck className="text-orange-500" size={14} />}
                   <span className={`text-[8px] font-black uppercase tracking-widest ${isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'}`}>{role}_ENCOUNTER</span>
                 </div>
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h2>
                 <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={12} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{client.address}</p>
                 </div>
              </div>
           </div>
           <button onClick={handleFinalize} className={`px-10 py-5 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all ${isNurse ? 'bg-sky-600' : isSocial ? 'bg-purple-600' : 'bg-rose-600'}`}>
             <CheckCircle2 size={14} className="inline mr-2" /> {isNurse ? 'CLOSE_ENCOUNTER' : 'CLOCK_OUT'}
           </button>
        </div>

        {/* Dynamic Care Matrix */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 relative overflow-hidden">
           {/* Persistent Coordinator Instructions */}
           {client.coordinatorInstructions && (
             <div className="mb-10 p-8 bg-indigo-600/10 border border-indigo-500/30 rounded-[2.5rem] animate-in slide-in-from-top-4 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                   <Edit3 size={16} className="text-indigo-400" />
                   <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest italic">Coordinator_Directive</h4>
                </div>
                <p className="text-sm text-white font-bold italic leading-relaxed">
                  "{client.coordinatorInstructions}"
                </p>
             </div>
           )}

           <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4 mb-12">
              <ShieldAlert size={20} className={isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-400'} />
              {isNurse ? 'Clinical_Practice_Directives' : isSocial ? 'Social_Intercept_Tasks' : 'Personal_Support_Routine'}
           </h3>
           
           <div className="space-y-4 mb-12">
              {(client.carePlans[role] || ["No assigned tasks for this scope."]).map((task, i) => (
                <label key={i} className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all cursor-pointer ${checkedTasks[i] ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
                   <input 
                    type="checkbox" 
                    checked={!!checkedTasks[i]} 
                    onChange={() => setCheckedTasks(prev => ({...prev, [i]: !prev[i]}))}
                    className="w-8 h-8 rounded-xl bg-black border-white/10 text-emerald-500 focus:ring-0"
                   />
                   <p className={`text-lg font-bold italic tracking-tight ${checkedTasks[i] ? 'text-emerald-400 line-through opacity-40' : 'text-slate-200'}`}>{task}</p>
                </label>
              ))}
           </div>

           <NeuralScribe language={language} />
        </div>
      </div>

      {/* Signal Matrix */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-rose-600/10 border border-rose-500/30 rounded-[3.5rem] p-10 shadow-2xl flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6 italic">Tactical_Alerts</h3>
           
           {isNurse ? (
             <>
               <button onClick={() => triggerSignal('MEDICAL', "Describe Medication Error/Refusal details:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  Medication Error / Refusal
               </button>
               <button onClick={() => triggerSignal('CLINICAL', "Detail Clinical Deterioration markers:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  Acute Clinical Change
               </button>
             </>
           ) : isSocial ? (
             <>
               <button onClick={() => triggerSignal('UNSAFE_ENV', "Identify Dwelling Hazards:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  Dwelling Hazard Detected
               </button>
               <button onClick={() => triggerSignal('SWELLING', "Describe Social/Nutritional drift:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  Bio-Social Instability
               </button>
             </>
           ) : (
             <>
               <button onClick={() => triggerSignal('FALL', "Detail Patient Fall incident:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  Patient Fall / Impact
               </button>
               <button onClick={() => triggerSignal('COMPLAINT', "Details of subject complaint or friction:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  Subject Complaint
               </button>
             </>
           )}

           <button onClick={() => triggerSignal('UNSAFE_ENV', "Why is environment unsafe for YOU?")} className="p-6 bg-slate-900 border border-white/10 text-slate-300 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              Unsafe for Professional
           </button>
        </div>

        <div className="bg-amber-600/10 border border-amber-500/30 rounded-[3.5rem] p-10 flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 italic">Logistics</h3>
           <button onClick={() => triggerSignal('NOT_SEEN', "Confirming Not Seen at dwelling.")} className="p-6 bg-amber-600 text-white rounded-3xl font-black text-[10px] uppercase shadow-xl animate-pulse">
              Subject_Not_Found
           </button>
        </div>
      </div>

    </div>
  );
};

export default PSWVisitConsole;
