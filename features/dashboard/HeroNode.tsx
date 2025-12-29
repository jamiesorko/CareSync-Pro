import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

const HeroNode = ({ staffName }: { staffName: string }) => (
  <div className="lg:col-span-8 bg-indigo-600/15 border border-indigo-500/20 glass-node rounded-[3.5rem] p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden group">
    <div className="relative z-10 space-y-8">
      <div className="flex items-center gap-3">
        <ShieldCheck size={18} className="text-indigo-400" />
        <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.5em]">Identity_Handshake_Validated</p>
      </div>
      <h3 className="text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-4">
        Welcome back,<br/>
        <span className="text-indigo-500 opacity-30 not-italic font-black text-7xl tracking-normal">{staffName.split(' ')[0]}</span>
      </h3>
      <div className="max-w-xl">
        <p className="text-slate-400 text-base font-medium italic border-l-2 border-white/10 pl-8 leading-relaxed">
          Operational matrix is currently synchronized. Sector 4 deployment has reached its 24-hour efficiency peak.
        </p>
      </div>
    </div>
    
    <div className="absolute -right-24 -bottom-24 opacity-[0.03] pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
      <Activity size={500} strokeWidth={1} />
    </div>
  </div>
);

export default HeroNode;