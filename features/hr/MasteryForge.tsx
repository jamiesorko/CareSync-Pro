import React, { useState } from 'react';
import { trainingForgeService } from '../../services/trainingForgeService';
import { TrainingModule, StaffMember } from '../../types';

interface Props {
  language: string;
  staffMember: StaffMember;
}

const MasteryForge: React.FC<Props> = ({ staffMember }) => {
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
    <div className="space-y-4 animate-in fade-in duration-700 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none text-[#fbbf24]">Mastery_Forge</h2>
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Neural Remediation Core</p>
        </div>
        {!module && !loading && (
          <button 
            onClick={triggerForge}
            className="px-4 py-2 bg-[#fbbf24] text-black rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            INITIATE_FORGE
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-slate-900/50 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col min-h-[350px]">
           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-2 border-[#fbbf24]/10 border-t-[#fbbf24] rounded-full animate-spin"></div>
                <p className="text-[8px] font-black text-[#fbbf24] uppercase tracking-widest animate-pulse">Forging_Lesson</p>
             </div>
           ) : isComplete ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-white text-2xl">🏆</div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Mastery_Certified</h3>
                <div className="flex gap-3">
                   <button onClick={() => setModule(null)} className="px-4 py-1.5 bg-white text-black rounded text-[9px] font-black uppercase tracking-widest">Return</button>
                   <button onClick={triggerForge} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded text-[9px] font-black uppercase">Re-Run</button>
                </div>
             </div>
           ) : module ? (
             <div className="flex-1 flex flex-col relative z-10 space-y-6 animate-in slide-in-from-bottom-4">
                <h3 className="text-lg font-black text-white italic tracking-tighter uppercase leading-tight">{module.title}</h3>
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                   <p className="text-[8px] font-black text-[#fbbf24] uppercase tracking-widest mb-2">Concept_Brief</p>
                   <p className="text-xs text-slate-300 italic leading-relaxed">"{module.conceptBrief}"</p>
                </div>
                <div className="space-y-4">
                   <p className="text-base font-black text-white italic tracking-tighter uppercase leading-tight">"{module.questions[activeQuestion].q}"</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.questions[activeQuestion].a.map((opt: string, i: number) => (
                        <button 
                         key={i}
                         disabled={selectedOpt !== null}
                         onClick={() => handleAnswer(i)}
                         className={`p-3 rounded-xl border text-left text-[9px] font-bold uppercase transition-all ${
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
                <p className="text-xs font-bold uppercase tracking-widest">Awaiting Forge Authorization</p>
             </div>
           )}
        </div>
        <div className="lg:col-span-4 space-y-4 flex flex-col">
           <div className="bg-[#fbbf24] p-6 rounded-2xl text-black shadow-2xl">
              <h3 className="text-[8px] font-black uppercase tracking-widest mb-4 opacity-60">Competency_Index</h3>
              <p className="text-3xl font-black italic tracking-tighter">98.2%</p>
              <p className="text-[9px] font-bold italic leading-tight mt-4">Node synchronized with regional clinical standards.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MasteryForge;