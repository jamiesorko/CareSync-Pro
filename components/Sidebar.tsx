
import React from 'react';
import { AppTab, CareRole } from '../types';
import { Translate } from './Translate';
import { 
  LayoutDashboard, Cpu, Shield, Zap, Wallet, 
  Database, Heart, Briefcase, Radio, Target, Power 
} from 'lucide-react';

// Changed to default export to match Layout.tsx expectation
const Sidebar = ({ active, setActive, role, lang, onLogout }: any) => {
  const menu = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard },
    { id: AppTab.STRATEGY, icon: Cpu },
    { id: AppTab.CLINICAL, icon: Shield },
    { id: AppTab.LOGISTICS, icon: Zap },
    { id: AppTab.FISCAL, icon: Wallet },
    { id: AppTab.VAULT, icon: Database },
    { id: AppTab.WELLNESS, icon: Heart },
    { id: AppTab.RESOURCE, icon: Briefcase },
    { id: AppTab.LIVE, icon: Radio },
  ];

  if ([CareRole.CEO, CareRole.COO, CareRole.DOC].includes(role)) {
    menu.push({ id: AppTab.ORG_COMMAND, icon: Target });
  }

  return (
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col backdrop-blur-xl">
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <h1 className="text-xl font-black italic">CARESYNC<span className="text-indigo-500">PRO</span></h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
              active === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              <Translate target={lang}>{item.id}</Translate>
            </span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10">
          <Power size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest"><Translate target={lang}>Logout</Translate></span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
