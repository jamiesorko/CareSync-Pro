
import React, { useState } from 'react';
import { User, Client, CareRole } from '../../types';
import Translate from '../../components/Translate';
import LanguageSelector from '../../components/LanguageSelector';
import ScheduleGrid from './ScheduleGrid';
import PSWCard from './PSWCard';
import ConcernsForm from './ConcernsForm';
import { LogOut, Home, MessageSquare, ShieldCheck } from 'lucide-react';

interface Props {
  user: User;
  onLogout: () => void;
}

interface Visit {
  id: string;
  time: string;
  pswName: string;
  status: 'CONFIRMED' | 'IN_TRANSIT' | 'CANCELLED';
}

const ClientPortal: React.FC<Props> = ({ user, onLogout }) => {
  const [language, setLanguage] = useState('English');
  const [activeView, setActiveView] = useState<'HOME' | 'CONCERNS'>('HOME');
  
  const [visits, setVisits] = useState<Visit[]>([
    { id: 'v1', time: '08:00 AM', pswName: 'Elena Rodriguez', status: 'CONFIRMED' },
    { id: 'v2', time: '01:30 PM', pswName: 'Sarah Jenkins', status: 'CONFIRMED' },
  ]);

  const handleCancelVisit = (id: string) => {
    if (window.confirm("Formally request cancellation of this visit? Logistics node will be notified.")) {
      setVisits(prev => prev.map(v => v.id === id ? { ...v, status: 'CANCELLED' } : v));
    }
  };

  return (
    <div className="h-screen w-screen bg-[#010411] flex flex-col overflow-hidden text-slate-200">
      {/* Client HUD Header */}
      <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 shrink-0 bg-black/40 backdrop-blur-xl relative z-50">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-teal-600 rounded-[1.2rem] flex items-center justify-center font-black text-white shadow-2xl">CP</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">CareSync_Home</h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-1.5 italic">Client_Sovereignty_Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          <button 
            onClick={onLogout}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all shadow-xl"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <div className="space-y-12 pb-32">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none italic mb-4">
                <Translate targetLanguage={language}>Welcome_Home</Translate>,<br/>
                <span className="text-teal-500">{user.name.split(' ')[0]}</span>
              </h2>
              <div className="flex items-center gap-4 text-slate-500 justify-center md:justify-start">
                 <ShieldCheck size={14} className="text-teal-500" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em]">Secure_Institutional_Link: ACTIVE</p>
              </div>
            </div>

            <div className="flex bg-slate-900 p-1.5 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <button 
                onClick={() => setActiveView('HOME')}
                className={`px-10 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeView === 'HOME' ? 'bg-teal-600 text-white shadow-xl' : 'text-slate-500'}`}
              >
                <Home size={16} /> <Translate targetLanguage={language}>Dashboard</Translate>
              </button>
              <button 
                onClick={() => setActiveView('CONCERNS')}
                className={`px-10 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeView === 'CONCERNS' ? 'bg-rose-600 text-white shadow-xl' : 'text-slate-500'}`}
              >
                <MessageSquare size={16} /> <Translate targetLanguage={language}>Help_Request</Translate>
              </button>
            </div>
          </div>

          {activeView === 'HOME' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Left: Schedule */}
               <div className="lg:col-span-7">
                  <ScheduleGrid visits={visits} language={language} onCancel={handleCancelVisit} />
               </div>

               {/* Right: Feedback Matrix */}
               <div className="lg:col-span-5 space-y-8">
                  <PSWCard 
                    pswName="Elena Rodriguez" 
                    isNew={true} 
                    language={language} 
                    onRate={(s) => console.log("Rated:", s)}
                    onBlacklist={() => alert("SIGNAL_LOCKED: Restriction request transmitted to Coordinator.")}
                  />

                  <div className="p-10 bg-teal-600/10 border border-teal-500/20 rounded-[3.5rem] text-center">
                     <p className="text-sm font-bold italic text-slate-300 italic mb-6 leading-relaxed">
                       <Translate targetLanguage={language}>The care team is synchronized. All staff are geofence-verified at your address.</Translate>
                     </p>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mx-auto"></div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
               <ConcernsForm language={language} onSent={() => setActiveView('HOME')} />
            </div>
          )}

        </div>
      </main>

      {/* Navigation Footer (Mobile) */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-2xl border border-white/10 p-2 rounded-[3.5rem] flex md:hidden shadow-3xl">
        <button onClick={() => setActiveView('HOME')} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${activeView === 'HOME' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}><Home size={24} /></button>
        <button onClick={() => setActiveView('CONCERNS')} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${activeView === 'CONCERNS' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}><MessageSquare size={24} /></button>
      </footer>
    </div>
  );
};

export default ClientPortal;
