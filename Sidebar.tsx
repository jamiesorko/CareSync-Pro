
import React from 'react';
import { AppTab, CareRole } from './types';
import { Translate } from './Translate';
import { LayoutDashboard, Shield, Zap, Wallet, Database, Heart, Cpu } from 'lucide-react';

export const Sidebar = ({ active, setActive, role, lang }: any) => {
  const items = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard },
    { id: AppTab.STRATEGY, icon: Cpu },
    { id: AppTab.CLINICAL, icon: Shield },
    { id: AppTab.LOGISTICS, icon: Zap },
    { id: AppTab.FISCAL, icon: Wallet },
    { id: AppTab.VAULT, icon: Database },
    { id: AppTab.WELLNESS, icon: Heart },
  ];

  return (
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col backdrop-blur-xl">
      <div className="p-8 border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter">CARESYNC<span className="text-indigo-500">PRO</span></h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
              active === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              <Translate target={lang}>{item.id}</Translate>
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
