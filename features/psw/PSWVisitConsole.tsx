
import React, { useState, useEffect } from 'react';
import { Client, CareRole, AlertType } from '../../types';
import Translate from '../../components/Translate';
import NeuralScribe from '../rn/NeuralScribe';
import { AlertCircle, ShieldAlert, Clock, MapPin, CheckCircle2, UserPlus, Stethoscope, Activity, HeartPulse, ShieldCheck } from 'lucide-react';

interface Props {
  client: Client;
  onClockOut: () => void;
  onAlert: (type: AlertType, content: string) => void;
  language: string;
  role?: CareRole; 
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
    const minRequired = role === CareRole.RN ? 20 : 15;

    if (minutes < minRequired) {
      alert(`PROFESSIONAL_AUDIT: Visit duration (${minutes}m) below professional scope standard. Documentation drift noted.`);
    }
    
    if (client.isInitialVisit && initialRating === null) {
      alert("Initial Visit Protocol: Auth for permanent dossier assignment required.");
      return;
    }

    onClockOut();
  };

  const triggerBlueprintAlert = (type: AlertType, promptText: string) => {
    const detail = prompt(promptText);
    if (detail) {
      onAlert(type, detail);
      alert("SIGNAL_LOCKED: Intercept routed to Regional Nursing Director.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isRN = role === CareRole.RN;
  const isRPN = role === CareRole.RPN;
  const isNurse = isRN || isRPN;
  const isSocial = role === CareRole.HSS;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700 pb-24">
      
      {/* Command HUD */}
      <div className="lg:col-span-8 space-y-8">
        <div className="alaya-card p-10 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 bg-[#020617]">
           <div className="flex items-center gap-10">
              <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative shadow-2xl transition-all duration-700 ${isNurse ? 'border-sky-500/30' : isSocial ? 'border-purple-500/30' : 'border-orange-500/30'}`}>
                 <div className={`absolute inset-0 rounded-full animate-pulse opacity-10 ${isNurse ? 'bg-sky-500' : isSocial ? 'bg-purple-600' : 'bg-orange-600'}`}></div>
                 <p className="text-4xl font-black italic text-white font-mono tracking-tighter">{formatTime(elapsed)}</p>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                   {isNurse ? <Stethoscope className="text-sky-400" size={14} /> : isSocial ? <HeartPulse className="text-purple-400" size={14} /> : <Activity className="text-orange-500" size={14} />}
                   <span className={`text-[8px] font-black uppercase tracking-widest ${isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'}`}>{role}_ENCOUNTER_MODE</span>
                 </div>
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h2>
                 <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={12} className={isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-400'} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{client.address}</p>
                 </div>
              </div>
           </div>
           <div className="flex gap-3">
              <button 
                onClick={handleFinalize} 
                className={`px-10 py-5 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:brightness-110 transition-all flex items-center gap-3 ${isNurse ? 'bg-sky-600 shadow-sky-600/30' : isSocial ? 'bg-purple-600 shadow-purple-600/30' : 'bg-rose-600 shadow-rose-600/30'}`}
              >
                <CheckCircle2 size={14} /> {isNurse ? 'CLOSE_ENCOUNTER' : 'CLOCK_OUT'}
              </button>
           </div>
        </div>

        {/* Dynamic Directive Matrix */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              {isNurse ? <ShieldCheck size={180} /> : isSocial ? <HeartPulse size={180} /> : <Activity size={180} />}
           </div>
           
           <div className="flex justify-between items-center mb-12 relative z-10">
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
                 <ShieldAlert size={20} className={isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-400'} />
                 {isNurse ? 'Clinical_Assessment_Directives' : isSocial ? 'Social_Nexus_Interventions' : 'Personal_Care_Routines'}
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Node: {role}_CORE</p>
           </div>
           
           <div className="space-y-4 mb-12 relative z-10">
              {(client.carePlans[role] || ["No assigned directives for current professional scope."]).map((task, i) => (
                <label key={i} className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all cursor-pointer ${checkedTasks[i] ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
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
             <div className={`p-10 border rounded-[3rem] animate-in zoom-in relative z-10 ${isNurse ? 'bg-sky-600/10 border-sky-500/20' : isSocial ? 'bg-purple-600/10 border-purple-500/20' : 'bg-orange-600/10 border-orange-500/20'}`}>
                <div className="flex items-center gap-4 mb-8">
                   <UserPlus className={isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-500'} size={24} />
                   <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest italic ${isNurse ? 'text-sky-400' : isSocial ? 'text-purple-400' : 'text-orange-400'}`}>Professional_Continuity_Check</p>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Authorize_Permanent_Pairing?</h4>
                   </div>
                </div>
                <p className="text-sm font-bold text-slate-300 mb-8 italic">"Based on your professional assessment, should you be the primary designated operative for this client node?"</p>
                <div className="flex gap-4">
                   <button onClick={() => setInitialRating(true)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${initialRating === true ? (isNurse ? 'bg-sky-600 text-white shadow-xl' : 'bg-emerald-600 text-white shadow-xl') : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}>Yes_Return</button>
                   <button onClick={() => setInitialRating(false)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${initialRating === false ? 'bg-rose-600 text-white shadow-xl' : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}>Permanent_Block</button>
                </div>
             </div>
           )}
        </div>

        <NeuralScribe language={language} />
      </div>

      {/* Role-Sensitive Signal Console */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-rose-600/10 border border-rose-500/30 rounded-[3.5rem] p-10 shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
           <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6 italic flex items-center gap-3">
              <ShieldAlert size={14} /> Scope_Critical_Signals
           </h3>
           
           {isNurse ? (
             <>
               <button onClick={() => triggerBlueprintAlert('MEDICAL', "Medication Error detected. Specify: Drug, Dosage, and Time of Event:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <span className="block opacity-60 mb-1">Nursing_Sentinel</span>
                  Medication Error / Refusal
               </button>
               <button onClick={() => triggerBlueprintAlert('CLINICAL', "Acute clinical change noted. Specify vital drift and physiological markers:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <span className="block opacity-60 mb-1">Clinical_Triage</span>
                  Acute Clinical Decline
               </button>
             </>
           ) : isSocial ? (
             <>
               <button onClick={() => triggerBlueprintAlert('UNSAFE_ENV', "Safety hazard detected at dwelling. Specify environmental risk vector:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  <span className="block opacity-60 mb-1">Environmental_Guard</span>
                  Dwelling Hazard
               </button>
               <button onClick={() => triggerBlueprintAlert('SWELLING', "Bio-social drift detected. Specify nutritional or social isolation markers:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  <span className="block opacity-60 mb-1">Determinants_Hub</span>
                  Nutritional / Isolation Risk
               </button>
             </>
           ) : (
             <>
               <button onClick={() => triggerBlueprintAlert('FALL', "Patient impact detected. Specify location and visible trauma:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
                  Patient Fall / Impact
               </button>
               <button onClick={() => triggerBlueprintAlert('BEDSORE', "Skin integrity breach detected. Specify anatomical location and stage:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
                  Skin Integrity Breach
               </button>
             </>
           )}

           <button onClick={() => triggerBlueprintAlert('UNSAFE_ENV', "Environment unsafe for healthcare professional. Specify danger vector:")} className="p-6 bg-slate-900 border border-white/10 text-slate-300 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block opacity-60 mb-1">Operator_Safety</span>
              Unsafe for Staff
           </button>
        </div>

        <div className="bg-amber-600/10 border border-amber-500/30 rounded-[3.5rem] p-10 flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 italic flex items-center gap-3">
              <Clock size={14} /> Operational_Deployment
           </h3>
           
           <button onClick={() => triggerBlueprintAlert('NOT_SEEN', "Subject not found at node. Confirming No-Show status with Dispatch...")} className="p-6 bg-amber-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl animate-pulse">
              Subject_Not_Found
           </button>

           <button onClick={() => triggerBlueprintAlert('RESTRICTION', "Requesting permanent Do Not Send list status. Specify professional rationale:")} className="p-6 bg-slate-900 border border-white/10 text-amber-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-amber-600 hover:text-white transition-all">
              Request_Dossier_Restriction
           </button>
        </div>
      </div>

    </div>
  );
};

export default PSWVisitConsole;
