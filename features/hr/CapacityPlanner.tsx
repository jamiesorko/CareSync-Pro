import React from 'react';
import { hrService } from '../../services/hrService';
import { TrendingUp, Users, UserCheck } from 'lucide-react';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const CapacityPlanner: React.FC<Props> = ({ language }) => {
  const recommendation = hrService.recommendHiring(12, 142); 

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
      <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000"><TrendingUp size={200} /></div>
        
        <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60 italic">
          <Translate target={language}>Strategic_Personnel_Forecasting</Translate>
        </h3>
        <div className="space-y-12 relative z-10">
           <p className="text-4xl font-bold italic leading-tight uppercase tracking-tighter">
             "<Translate target={language}>{recommendation.reason}</Translate>"
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/10 rounded-[3rem] border border-white/20 flex flex-col justify-between">
                 <Users size={32} className="mb-6" />
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">
                      <Translate target={language}>Target_PSW_Roster</Translate>
                    </p>
                    <p className="text-6xl font-black italic tracking-tighter">+{recommendation.pswNeeded}</p>
                 </div>
              </div>
              <div className="p-8 bg-white/10 rounded-[3rem] border border-white/20 flex flex-col justify-between">
                 <UserCheck size={32} className="mb-6" />
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">
                      <Translate target={language}>Target_RN_Roster</Translate>
                    </p>
                    <p className="text-6xl font-black italic tracking-tighter">+{recommendation.rnNeeded}</p>
                 </div>
              </div>
           </div>

           <button onClick={() => alert("RECRUITMENT_LOCK: Authorized.")} className="w-full py-6 bg-white text-indigo-600 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] transition-all">
             <Translate target={language}>AUTHORIZE_TALENT_ACQUISITION</Translate>
           </button>
        </div>
      </div>
    </div>
  );
};

export default CapacityPlanner;