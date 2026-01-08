
import React from 'react';
import { CalendarDays, Clock, XCircle, UserCheck } from 'lucide-react';
import Translate from '../../components/Translate';

interface ClientVisit {
  id: string;
  time: string;
  pswName: string;
  status: 'CONFIRMED' | 'IN_TRANSIT' | 'CANCELLED';
}

interface Props {
  visits: ClientVisit[];
  language: string;
  onCancel: (id: string) => void;
}

const ScheduleGrid: React.FC<Props> = ({ visits, language, onCancel }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-4">
        <CalendarDays className="text-teal-400" size={18} />
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
          {/* Fix: Changed targetLanguage to target to match components/Translate.tsx props */}
          <Translate target={language}>My_Care_Timeline</Translate>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {visits.map((v) => (
          <div 
            key={v.id} 
            className={`glass-card p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 transition-all ${
              v.status === 'CANCELLED' ? 'opacity-30 grayscale' : 'hover:border-teal-500/30'
            }`}
          >
            <div className="flex items-center gap-8 flex-1">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex flex-col items-center justify-center border border-white/5">
                <Clock size={16} className="text-teal-500 mb-1" />
                <p className="text-xs font-black text-white italic">{v.time}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck size={12} className="text-teal-400" />
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assigned Professional</p>
                </div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{v.pswName}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Status: {v.status}</p>
              </div>
            </div>
            
            {v.status !== 'CANCELLED' && (
              <button 
                onClick={() => onCancel(v.id)}
                className="px-8 py-4 bg-rose-600/10 border border-rose-500/20 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-lg"
              >
                {/* Fix: Changed targetLanguage to target to match components/Translate.tsx props */}
                <Translate target={language}>Cancel_Visit</Translate>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;
