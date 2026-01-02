
import React from 'react';
import { CalendarDays, Clock, XCircle } from 'lucide-react';
import Translate from '../../components/Translate';

interface Visit {
  id: string;
  time: string;
  pswName: string;
  status: 'CONFIRMED' | 'IN_TRANSIT' | 'CANCELLED';
}

interface Props {
  visits: Visit[];
  language: string;
  onCancel: (id: string) => void;
}

const ScheduleGrid: React.FC<Props> = ({ visits, language, onCancel }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="text-teal-400" size={20} />
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
          <Translate targetLanguage={language}>Upcoming_Directives</Translate>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {visits.map((v) => (
          <div key={v.id} className={`glass-card p-6 rounded-[2rem] flex justify-between items-center transition-all ${v.status === 'CANCELLED' ? 'opacity-40 grayscale' : 'hover:border-teal-500/30'}`}>
            <div className="flex items-center gap-6">
              <div className="text-center bg-white/5 p-3 rounded-2xl min-w-[80px]">
                <Clock size={14} className="mx-auto mb-1 text-teal-500" />
                <p className="text-xs font-black text-white">{v.time}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Assigned Professional</p>
                <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">{v.pswName}</h4>
              </div>
            </div>
            
            {v.status !== 'CANCELLED' && (
              <button 
                onClick={() => onCancel(v.id)}
                className="p-4 hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 rounded-2xl transition-all group"
              >
                <XCircle size={24} />
                <span className="sr-only">Cancel Visit</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;
