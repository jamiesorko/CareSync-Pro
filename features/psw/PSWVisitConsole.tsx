
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

  const isNurse = role === CareRole.RN || role === CareRole.RPN;
  const isSocial = role === CareRole.HSS;

  const handleFinalize = () => {
    onClockOut();
  };

  const triggerSignal = (type: AlertType, promptTxt: string) => {
    const detail = prompt(promptTxt);
    if (detail) {
      onAlert(type, detail);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700">
      <div className="lg:col-span-8 space-y-8">
        <div className="glass-card p-10 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-10">
              <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative shadow-2xl ${isNurse ? 'border-sky-500/30' : isSocial ? 'border-purple-500/30' : 'border-orange-500/30'}`}>
                 <div className={`absolute inset-0 rounded-full animate-pulse opacity-10 ${isNurse ? 'bg-sky-500' : isSocial ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                 <p className="text-4xl font-black italic text-white font-mono tracking-tighter">{formatTime(elapsed)}</p>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                   {isNurse ? <Stethoscope className="text-sky-400" size={14} /> : isSocial ? <HeartPulse className="text-purple-400" size={14} /> : <UserCheck className="text-orange-500" size={14} />}
                   <span className={`text-[8px] font-black uppercase tracking-widest ${isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'}`}>
                     <Translate targetLanguage={language}>{role}</Translate>_ENCOUNTER
                   </span>
                 </div>
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h2>
                 <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={12} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{client.address}</p>
                 </div>
              </div>
           </div>
           <button onClick={handleFinalize} className={`px-10 py-5 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all ${isNurse ? 'bg-sky-600' : isSocial ? 'bg-purple-600' : 'bg-rose-600'}`}>
             <CheckCircle2 size={14} className="inline mr-2" /> 
             <Translate targetLanguage={language}>{isNurse ? 'CLOSE_ENCOUNTER' : 'CLOCK_OUT'}</Translate>
           </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 relative overflow-hidden">
           {client.coordinatorInstructions && (
             <div className="mb-10 p-8 bg-indigo-600/10 border border-indigo-500/30 rounded-[2.5rem] animate-in slide-in-from-top-4 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                   <Edit3 size={16} className="text-indigo-400" />
                   <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest italic">
                     <Translate targetLanguage={language}>Coordinator_Directive</Translate>
                   </h4>
                </div>
                <p className="text-sm text-white font-bold italic leading-relaxed">
                  "<Translate targetLanguage={language}>{client.coordinatorInstructions}</Translate>"
                </p>
             </div>
           )}

           <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4 mb-12">
              <ShieldAlert size={20} className={isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-400'} />
              <Translate targetLanguage={language}>
                {isNurse ? 'Clinical_Practice_Directives' : isSocial ? 'Social_Intercept_Tasks' : 'Personal_Support_Routine'}
              </Translate>
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
                   <p className={`text-lg font-bold italic tracking-tight ${checkedTasks[i] ? 'text-emerald-400 line-through opacity-40' : 'text-slate-200'}`}>
                     <Translate targetLanguage={language}>{task}</Translate>
                   </p>
                </label>
              ))}
           </div>

           <NeuralScribe language={language} />
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-rose-600/10 border border-rose-500/30 rounded-[3.5rem] p-10 shadow-2xl flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6 italic">
             <Translate targetLanguage={language}>Tactical_Alerts</Translate>
           </h3>
           
           {isNurse ? (
             <>
               <button onClick={() => triggerSignal('MEDICAL', "Medication Error Details:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <Translate targetLanguage={language}>Medication Error / Refusal</Translate>
               </button>
               <button onClick={() => triggerSignal('CLINICAL', "Deterioration Markers:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <Translate targetLanguage={language}>Acute Clinical Change</Translate>
               </button>
             </>
           ) : isSocial ? (
             <>
               <button onClick={() => triggerSignal('UNSAFE_ENV', "Dwelling Hazards:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <Translate targetLanguage={language}>Dwelling Hazard Detected</Translate>
               </button>
               <button onClick={() => triggerSignal('SWELLING', "Social Drift:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <Translate targetLanguage={language}>Bio-Social Instability</Translate>
               </button>
             </>
           ) : (
             <>
               <button onClick={() => triggerSignal('FALL', "Fall Details:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <Translate targetLanguage={language}>Patient Fall / Impact</Translate>
               </button>
               <button onClick={() => triggerSignal('COMPLAINT', "Complaint Details:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <Translate targetLanguage={language}>Subject Complaint</Translate>
               </button>
             </>
           )}
        </div>

        <div className="bg-amber-600/10 border border-amber-500/30 rounded-[3.5rem] p-10 flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 italic">
             <Translate targetLanguage={language}>Logistics</Translate>
           </h3>
           <button onClick={() => triggerSignal('NOT_SEEN', "Confirm Not Seen")} className="p-6 bg-amber-600 text-white rounded-3xl font-black text-[10px] uppercase shadow-xl animate-pulse">
              <Translate targetLanguage={language}>Subject_Not_Found</Translate>
           </button>
        </div>
      </div>
    </div>
  );
};

export default PSWVisitConsole;
