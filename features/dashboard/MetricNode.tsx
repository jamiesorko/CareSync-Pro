import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Translate } from '../../components/Translate';

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  language: string;
}

const MetricNode: React.FC<Props> = ({ label, value, icon: Icon, trend, trendType, language }) => (
  <div className="glass-card p-8 rounded-[2.5rem] hover:bg-white/[0.05] transition-all border border-white/5 shadow-2xl group flex flex-col justify-between overflow-hidden">
    <div className="flex justify-between items-start mb-8">
      <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </div>
      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border whitespace-nowrap ${
        trendType === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      }`}>
        <Translate target={language}>{trend}</Translate>
      </span>
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
        <Translate target={language}>{label}</Translate>
      </p>
      <h4 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
        <Translate target={language}>{value}</Translate>
      </h4>
    </div>
  </div>
);

export default MetricNode;