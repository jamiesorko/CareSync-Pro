
import React, { useState } from 'react';
import Translate from '../components/Translate';
import { CareRole } from '../types';
import ScheduleGrid from './client/ScheduleGrid';
import PSWCard from './client/PSWCard';
import ConcernsForm from './client/ConcernsForm';

interface Props {
  language: string;
}

const ClientPortal: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'CONCERNS'>('HOME');
  const [schedule] = useState([
    { id: 'v1', time: '08:00 AM', pswName: 'Elena R.', status: 'CONFIRMED' as const },
    { id: 'v2', time: '01:30 PM', pswName: 'Mark K.', status: 'CONFIRMED' as const },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 overflow-y-auto h-full scrollbar-hide">
      <div className="px-4">
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic">
           <Translate targetLanguage={language}>Resident_Command</Translate>
        </h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">
           <Translate targetLanguage={language}>Quality_&_Logistics_Monitor_•_Active_Handshake</Translate>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-slate-900/50 border border-white/10 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <span className="text-8xl font-black italic text-white">LOG</span>
            </div>
            <h3 className="text-xl font-black text-white mb-10 tracking-tighter uppercase italic">
               <Translate targetLanguage={language}>Current_Service_Log</Translate>
            </h3>
            <ScheduleGrid 
              visits={schedule} 
              language={language} 
              onCancel={(id) => alert(`Signal: Cancellation request for visit ${id} transmitted.`)} 
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <PSWCard 
            pswName="Elena Rodriguez" 
            isNew={true} 
            language={language}
            onRate={(s) => console.log("Rated:", s)}
            onBlacklist={() => alert("Restricting Professional from future Roster Deployment.")}
          />
          
          <div className="bg-teal-600/10 border border-teal-500/20 p-10 rounded-[3rem] text-center shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/40"></div>
             <p className="text-sm font-bold italic text-slate-300 italic mb-4 leading-relaxed">
               <Translate targetLanguage={language}>The care team is synchronized. All staff are geofence-verified at your address.</Translate>
             </p>
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mx-auto"></div>
          </div>
          
          <button 
            onClick={() => setActiveTab(activeTab === 'HOME' ? 'CONCERNS' : 'HOME')}
            className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl ${activeTab === 'CONCERNS' ? 'bg-indigo-600 text-white' : 'bg-white text-black hover:scale-[1.02]'}`}
          >
            {activeTab === 'HOME' ? <Translate targetLanguage={language}>INITIATE_HELP_SIGNAL</Translate> : <Translate targetLanguage={language}>RETURN_TO_HUB</Translate>}
          </button>
        </div>
      </div>

      {activeTab === 'CONCERNS' && (
        <div className="px-4 animate-in slide-in-from-bottom-8 duration-700">
          <div className="max-w-3xl mx-auto">
            <ConcernsForm language={language} onSent={() => setActiveTab('HOME')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
