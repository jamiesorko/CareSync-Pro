
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
  <div className="glass-card p-6 rounded-[2rem] hover:bg-white/[0.05] transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
        <Icon size={18} />
      </div>
      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
        trendType === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      }`}>{trend}</span>
    </div>
    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
      <Translate targetLanguage={language}>{label}</Translate>
    </p>
    <h4 className="text-3xl font-black text-white italic tracking-tighter">
      {value}<span className="text-sm opacity-30 not-italic ml-0.5">{suffix}</span>
    </h4>
  </div>
);

export default MetricNode;
