
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
  <div className="bg-white border border-[#dae1e7] p-6 rounded shadow-sm flex flex-col justify-between group transition-all hover:border-[#005596]">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-slate-50 text-[#005596] border border-slate-100 rounded group-hover:bg-[#005596] group-hover:text-white transition-all">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
        trendType === 'positive' ? 'bg-emerald-50 text-emerald-600' : 
        trendType === 'negative' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
      }`}>
        {trend}
      </div>
    </div>
    
    <div className="mt-4">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-black text-slate-800 tracking-tighter tabular-nums">
        {value}<span className="text-sm font-bold text-slate-300 ml-0.5">{suffix}</span>
      </h4>
    </div>
  </div>
);

export default MetricNode;
