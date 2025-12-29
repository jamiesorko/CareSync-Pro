
import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export const HeroWidget = ({ staffName }: { staffName: string }) => (
  <div className="lg:col-span-8 bg-indigo-600/10 border border-indigo-500/20 glass-node rounded-[3rem] p-10 min-h-[340px] flex flex-col justify-center relative overflow-hidden group">
    <div className="relative z-10 space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck size={16} className="text-indigo-400" />
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Biometric_Handshake_Secure</p>
      </div>
      <h3 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">
        Welcome,<br/>
        <span className="text-indigo-500 opacity-40 not-italic font-black text-6xl tracking-normal">{staffName.split(' ')[0]}</span>
      </h3>
      <p className="text-slate-400 text-sm font-medium italic border-l-2 border-white/10 pl-6 max-w-lg">
        Institutional integrity is nominal. Roster deployment for Sector 4 is currently trending 4% above historical velocity.
      </p>
    </div>
    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none rotate-12 group-hover:rotate-6 transition-transform duration-1000">
      <Activity size={400} strokeWidth={1} />
    </div>
  </div>
);
