import React from 'react';
import { LucideIcon } from 'lucide-react';
import Translate from '../../components/Translate';

interface Props {
  label: string;
  value: string;
  suffix?: string;
  icon: LucideIcon;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  language: string;
}

const MetricNode: React.FC<Props> = ({ label, value, suffix, icon: Icon, trend, trendType, language }) => (
  <div className="glass-card p-8 rounded-[2.5rem] hover:bg-white/[0.05] transition-all border border-white/5 shadow-2xl group">
    <div className="flex justify-between items-start mb-8">
      <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </div>
      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
        trendType === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      }`}>
        <Translate target={language}>{trend}</Translate>
      </span>
    </div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
      <Translate target={language}>{label}</Translate>
    </p>
    <h4 className="text-4xl font-black text-white italic tracking-tighter leading-none">
      <Translate target={language}>{value}</Translate>
      {suffix && (
        <span className="text-sm opacity-30 not-italic ml-1">
          <Translate target={language}>{suffix}</Translate>
        </span>
      )}
    </h4>
  </div>
);

export default MetricNode;