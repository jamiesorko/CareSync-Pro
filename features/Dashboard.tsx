
import React from 'react';
import { Translate } from '../components/Translate';
import { Activity, Zap, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import { Client } from '../types';
import CommandGrid from './dashboard/CommandGrid';
import HeroNode from './dashboard/HeroNode';
import MetricNode from './dashboard/MetricNode';
import SignalLog from './dashboard/SignalLog';

interface Props {
  staffName?: string;
  clients?: Client[];
  setActiveTab: (tab: any) => void;
  lang?: string;
}

export const Dashboard: React.FC<Props> = ({ staffName, clients, setActiveTab, lang }) => {
  const language = lang || "English";
  
  const stats = [
    { label: 'Agency_Health', val: '98.4%', icon: ShieldCheck, trend: '+0.2%', trendType: 'positive' as const },
    { label: 'Fleet_Velocity', val: '92.1%', icon: Zap, trend: 'NOMINAL', trendType: 'positive' as const },
    { label: 'Clinical_Drift', val: '-2.4%', icon: Activity, trend: 'SECURE', trendType: 'positive' as const },
    { label: 'Fiscal_Delta', val: '$14,204.00', icon: TrendingUp, trend: 'RECLAIMED', trendType: 'positive' as const },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 shrink-0">
        <HeroNode staffName={staffName || "Operative"} language={language} />
        
        <div className="lg:col-span-4 grid grid-cols-1 gap-6">
          <MetricNode 
            label={stats[0].label} 
            value={stats[0].val} 
            icon={stats[0].icon} 
            trend={stats[0].trend} 
            trendType={stats[0].trendType} 
            language={language}
          />
          <MetricNode 
            label={stats[1].label} 
            value={stats[1].val} 
            icon={stats[1].icon} 
            trend={stats[1].trend} 
            trendType={stats[1].trendType} 
            language={language}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
          <MetricNode 
            label={stats[2].label} 
            value={stats[2].val} 
            icon={stats[2].icon} 
            trend={stats[2].trend} 
            trendType={stats[2].trendType} 
            language={language}
          />
          <MetricNode 
            label={stats[3].label} 
            value={stats[3].val} 
            icon={stats[3].icon} 
            trend={stats[3].trend} 
            trendType={stats[3].trendType} 
            language={language}
          />
      </div>

      <div className="flex-1 min-h-0 flex flex-col space-y-8 pb-10">
        <CommandGrid setActiveTab={setActiveTab} language={language} />
        
        <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden flex-1 flex flex-col min-h-[400px] shadow-3xl">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
                <Translate target={language}>GLOBAL_SIGNAL_LOG</Translate>
             </h3>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <Translate target={language}>REALTIME_INTERCEPT_ACTIVE</Translate>
                </span>
             </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
             <SignalLog clients={clients || []} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};
