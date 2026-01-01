
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  suffix?: string;
  icon: LucideIcon;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
}

const MetricNode: React.FC<Props> = ({ label, value, suffix, icon: Icon, trend, trendType }) => (
  <div className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between group transition-all hover:bg-white/[0.06] hover:translate-y-[-4px] cursor-default relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} strokeWidth={1} />
    </div>
    
    <div className="flex justify-between items-start relative z-10">
      <div className="p-3 bg-white/5 border border-white/10 text-indigo-400 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-500">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
        trendType === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
        trendType === 'negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-500/10 text-slate-500 border-white/5'
      }`}>
        {trend}
      </div>
    </div>
    
    <div className="mt-8 relative z-10">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{label}</p>
      <h4 className="text-5xl font-black text-white tracking-tighter italic tabular-nums leading-none flex items-baseline">
        {value}<span className="text-xl font-bold text-slate-700 ml-1 not-italic">{suffix}</span>
      </h4>
    </div>
  </div>
);

export default MetricNode;
