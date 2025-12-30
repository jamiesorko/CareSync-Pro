
import React, { useState, useEffect } from 'react';
import { Client, CareRole, AlertType } from '../../types';
import Translate from '../../components/Translate';
import NeuralScribe from '../rn/NeuralScribe';
import { AlertCircle, ShieldAlert, Clock, MapPin, CheckCircle2, UserPlus, Info } from 'lucide-react';

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
  const [showTriage, setShowTriage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFinalize = () => {
    const minutes = Math.floor(elapsed / 60);
    const isAM = new Date().getHours() < 12;
    const minRequired = isAM ? 20 : 15;

    // Blueprint: Track visit duration compliance
    if (minutes < minRequired) {
      alert(`AI_AUDIT: Visit duration (${minutes}m) below compliance floor. Flagging to HR for review.`);
    }
    
    // Blueprint: Rate return only on initial visit
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
      alert("SIGNAL_LOCKED: Alert routed to Coordinator and RN Supervisor.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700 pb-24">
      
      {/* Session Command HUD */}
      <div className="lg:col-span-8 space-y-8">
        <div className="alaya-card p-10 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 bg-[#020617]">
           <div className="flex items-center gap-10">
              <div className="w-32 h-32 rounded-full border-4 border-orange-500/20 flex items-center justify-center relative shadow-[0_0_40px_rgba(249,115,22,0.1)]">
                 <div className="absolute inset-0 bg-orange-600/5 rounded-full animate-pulse"></div>
                 <p className="text-4xl font-black italic text-white font-mono tracking-tighter">{formatTime(elapsed)}</p>
              </div>
              <div className="space-y-2">
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{client.name}</h2>
                 <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={12} className="text-orange-500" />
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
                className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-rose-600/30 hover:bg-rose-500 transition-all flex items-center gap-3"
              >
                <CheckCircle2 size={14} /> CLOCK_OUT
              </button>
           </div>
        </div>

        {/* Clinical Protocols */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
                 <ShieldAlert size={20} className="text-orange-500" />
                 Care_Plan_Directives
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Author: Director of Care</p>
           </div>
           
           <div className="space-y-4 mb-12">
              {(client.carePlans[CareRole.PSW] || ["General Routine Support"]).map((task, i) => (
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

           {/* Blueprint: Initial Visit return-rating */}
           {client.isInitialVisit && (
             <div className="p-10 bg-orange-600/10 border border-orange-500/20 rounded-[3rem] animate-in zoom-in">
                <div className="flex items-center gap-4 mb-8">
                   <UserPlus className="text-orange-500" size={24} />
                   <div>
                      <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest italic">Initial_Visit_Protocol</p>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Return_to_Client?</h4>
                   </div>
                </div>
                <p className="text-sm font-bold text-slate-300 mb-8 italic">"Would you like to be permanently scheduled with this client for future visits?"</p>
                <div className="flex gap-4">
                   <button onClick={() => setInitialRating(true)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${initialRating === true ? 'bg-emerald-600 text-white shadow-xl' : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}>Authorize_Return</button>
                   <button onClick={() => setInitialRating(false)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${initialRating === false ? 'bg-rose-600 text-white shadow-xl' : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'}`}>Request_Restriction</button>
                </div>
             </div>
           )}
        </div>

        <NeuralScribe language={language} />
      </div>

      {/* Blueprint Alert Matrix */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-rose-600/10 border border-rose-500/30 rounded-[3.5rem] p-10 shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <AlertCircle size={100} />
           </div>
           <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6 italic flex items-center gap-3">
              <ShieldAlert size={14} /> Tactical_Signals
           </h3>
           
           <button onClick={() => triggerBlueprintAlert('FALL', "Specify: Fall, Burn, Choking, or Medical Emergency details:")} className="p-6 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl hover:scale-105 transition-all">
              <span className="block opacity-60 mb-1">Critical</span>
              Fall / Burn / Choking
           </button>

           <button onClick={() => triggerBlueprintAlert('BEDSORE', "Specify bedsore or swelling LOCATION and BRIEF details:")} className="p-6 bg-slate-900 border border-white/10 text-rose-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block opacity-60 mb-1">Skin Integrity</span>
              Bedsore / Swelling
           </button>

           <button onClick={() => triggerBlueprintAlert('UNSAFE_ENV', "Specify why environment is unsafe for CARE PLAN:")} className="p-6 bg-slate-900 border border-white/10 text-slate-300 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block opacity-60 mb-1">Environment</span>
              Unsafe for Care Plan
           </button>

           <button onClick={() => triggerBlueprintAlert('UNSAFE_ENV', "Specify why environment is unsafe for PSW:")} className="p-6 bg-slate-900 border border-white/10 text-slate-300 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-rose-600 hover:text-white transition-all">
              <span className="block opacity-60 mb-1">Personal Safety</span>
              Unsafe for Worker
           </button>
        </div>

        <div className="bg-amber-600/10 border border-amber-500/30 rounded-[3.5rem] p-10 flex flex-col gap-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 italic flex items-center gap-3">
              <Clock size={14} /> Roster_Alerts
           </h3>
           
           <button onClick={() => triggerBlueprintAlert('NOT_SEEN', "Confirming Not Seen / Not Found. Alerting Coordinator...")} className="p-6 bg-amber-600 text-white rounded-3xl font-black text-[10px] uppercase text-left shadow-xl animate-pulse">
              <span className="block opacity-60 mb-1">Attendance</span>
              Not Seen / Not Found
           </button>

           <button onClick={() => triggerBlueprintAlert('RESTRICTION', "Requesting 'Do Not Send' status. Reason why?")} className="p-6 bg-slate-900 border border-white/10 text-amber-400 rounded-3xl font-black text-[10px] uppercase text-left hover:bg-amber-600 hover:text-white transition-all">
              <span className="block opacity-60 mb-1">Permanent Change</span>
              Do Not Send List Req.
           </button>
        </div>
      </div>

    </div>
  );
};

export default PSWVisitConsole;
