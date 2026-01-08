
import React from 'react';
import Translate from '../../components/Translate';

interface GaugeProps {
  label: string;
  value: number;
  color: string;
  suffix?: string;
}

const CircularGauge: React.FC<GaugeProps> = ({ label, value, color, suffix = "%" }) => (
  <div className="flex flex-col items-center p-8 bg-slate-900 border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
    <div className="relative w-32 h-32 mb-6">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/5" />
        <circle 
          cx="18" cy="18" r="16" fill="none" 
          stroke={color} strokeWidth="2" 
          strokeDasharray={`${value}, 100`} 
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-black text-white italic tracking-tighter">{value}{suffix}</span>
      </div>
    </div>
    {/* Fix: Changed targetLanguage to target to match components/Translate.tsx props */}
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]"><Translate target="English">{label}</Translate></p>
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
      <span className="text-4xl font-black italic">PULSE</span>
    </div>
  </div>
);

const DailyEfficiencyGauges: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center px-4">
        <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">Daily_Efficiency_Gauges</h3>
        <span className="text-[9px] font-bold text-slate-600 uppercase">Synchronized with Fleet Node</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <CircularGauge label="Agency Velocity" value={94} color="#22d3ee" />
        <CircularGauge label="Inter-Dept Sync" value={98} color="#10b981" />
        <CircularGauge label="Staff Grievance" value={2} color="#f43f5e" suffix="pt" />
        <CircularGauge label="Compliance Index" value={99} color="#6366f1" />
      </div>
    </div>
  );
};

export default DailyEfficiencyGauges;
