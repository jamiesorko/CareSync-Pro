
import React, { useState, useEffect } from 'react';
import { trainingForgeService } from '../../services/trainingForgeService';
import { TrainingModule, StaffMember } from '../../types';
import Translate from '../../components/Translate';

interface Props {
  language: string;
  staffMember: StaffMember;
}

const MasteryForge: React.FC<Props> = ({ language, staffMember }) => {
  const [module, setModule] = useState<TrainingModule | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const triggerForge = async () => {
    setLoading(true);
    try {
      const gap = "Documentation integrity during complex transfers (Hoyer Lift)";
      const result = await trainingForgeService.forgeModule(staffMember, gap);
      setModule(result);
      setActiveQuestion(0);
      setSelectedOpt(null);
      setIsComplete(false);
      setScore(0);
    } catch (e) {
      alert("Forge Desync. Re-calibrating educational vector...");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    setSelectedOpt(idx);
    const correct = idx === module?.questions[activeQuestion].correct;
    if (correct) setScore(prev => prev + 1);

    setTimeout(() => {
      if (activeQuestion + 1 < (module?.questions.length || 0)) {
        setActiveQuestion(prev => prev + 1);
        setSelectedOpt(null);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none text-[#fbbf24]">Mastery_Forge</h2>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Remedial Neural Training</p>
        </div>
        {!module && !loading && (
          <button 
            onClick={triggerForge}
            className="px-6 py-2 bg-[#fbbf24] text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            INITIATE_FORGE
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-10 h-10 border-2 border-[#fbbf24]/10 border-t-[#fbbf24] rounded-full animate-spin"></div>
                <p className="text-[9px] font-black text-[#fbbf24] uppercase tracking-widest animate-pulse">Forging_Lesson</p>
             </div>
           ) : isComplete ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-white text-3xl">🏆</div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Mastery_Certified</h3>
                <div className="flex gap-3">
                   <button onClick={() => setModule(null)} className="px-6 py-2 bg-white text-black rounded-lg font-black text-[9px] uppercase tracking-widest">Return</button>
                   <button onClick={triggerForge} className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-[9px] font-black uppercase">Re-Run</button>
                </div>
             </div>
           ) : module ? (
             <div className="flex-1 flex flex-col relative z-10 space-y-8 animate-in slide-in-from-bottom-4">
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{module.title}</h3>
                <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                   <p className="text-[9px] font-black text-[#fbbf24] uppercase tracking-widest mb-3">Concept_Brief</p>
                   <p className="text-xs text-slate-300 italic leading-relaxed italic">"{module.conceptBrief}"</p>
                </div>
                <div className="space-y-6">
                   <p className="text-lg font-black text-white italic tracking-tighter uppercase leading-tight">"{module.questions[activeQuestion].q}"</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {module.questions[activeQuestion].a.map((opt: string, i: number) => (
                        <button 
                         key={i}
                         disabled={selectedOpt !== null}
                         onClick={() => handleAnswer(i)}
                         className={`p-4 rounded-xl border text-left text-[10px] font-bold uppercase transition-all ${
                           selectedOpt === i 
                             ? (i === module.questions[activeQuestion].correct ? 'bg-emerald-500 border-white text-white' : 'bg-rose-600 border-white text-white') 
                             : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                         }`}
                        >
                           {opt}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center opacity-20 italic">
                <p className="text-sm font-bold uppercase">Awaiting Forge Input</p>
             </div>
           )}
        </div>
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="bg-[#fbbf24] p-6 rounded-2xl text-black shadow-2xl">
              <h3 className="text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Status</h3>
              <p className="text-4xl font-black italic tracking-tighter">98%</p>
              <p className="text-xs font-bold italic leading-tight mt-4">Personal Competency Index synchronized.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MasteryForge;
