
import React from 'react';
import { AppTab } from '../types';
import { Search, Bell, Settings, LogOut, ChevronDown } from 'lucide-react';

interface Props {
  activeTab: AppTab;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ activeTab, onLogout }) => {
  return (
    <header className="h-16 bg-white border-b border-[#dae1e7] flex items-center justify-between px-8 shrink-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded w-[450px] focus-within:border-[#005596] transition-all">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search clients, employees, or forms..." 
            className="bg-transparent border-none text-[13px] text-slate-700 outline-none w-full placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
        </div>

        <div className="h-6 w-px bg-slate-200 mx-2"></div>

        <button className="p-2 text-slate-400 hover:text-[#005596] relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="p-2 text-slate-400 hover:text-[#005596]">
          <Settings size={20} />
        </button>

        <button 
          onClick={onLogout}
          className="ml-4 flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded transition-all text-xs font-bold uppercase"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
