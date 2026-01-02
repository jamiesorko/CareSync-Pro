
import React, { useState } from 'react';
import { User, Client, StaffMember } from '../../types';
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

// Added interface to define valid visit statuses and avoid state narrowing errors
interface ClientVisit {
  id: string;
  time: string;
  pswName: string;
  status: 'CONFIRMED' | 'IN_TRANSIT' | 'CANCELLED';
}

const ClientApp: React.FC<Props> = ({ user, onLogout }) => {
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState<'HOME' | 'CONCERNS'>('HOME');
  
  // Mock data for the demonstration
  // Fixed: explicitly typed useState with ClientVisit[] to allow status updates from confirmed to cancelled
  const [visits, setVisits] = useState<ClientVisit[]>([
    { id: 'v1', time: '08:00 AM', pswName: 'Elena Rodriguez', status: 'CONFIRMED' },
    { id: 'v2', time: '01:30 PM', pswName: 'Sarah Jenkins', status: 'CONFIRMED' },
  ]);

  const handleCancel = (id: string) => {
    if (window.confirm("Formally request visit cancellation? Dispatch will be notified.")) {
      // Fixed: updated status to 'CANCELLED' which is now valid in the ClientVisit type
      setVisits(prev => prev.map(v => v.id === id ? { ...v, status: 'CANCELLED' } : v));
    }
  };

  return (
    <div className="h-screen w-screen bg-[#010411] flex flex-col overflow-hidden text-slate-200">
      {/* Client HUD Header */}
      <header className="h-24 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center font-black text-white shadow-2xl">CP</div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">CareSync_Home</h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">Personal_Care_Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          <button 
            onClick={onLogout}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-12 max-w-6xl mx-auto w-full">
        <div className="space-y-12 pb-32">
          {/* Welcome Cluster */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic mb-4">
                <Translate targetLanguage={language}>Welcome_Back</Translate>,<br/>
                <span className="text-teal-500">{user.name.split(' ')[0]}</span>
              </h2>
              <div className="flex items-center gap-4 text-slate-500 justify-center md:justify-start">
                <ShieldCheck size={14} className="text-emerald-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">
                  <Translate targetLanguage={language}>Sovereign_Protocol_Active</Translate>
                </p>
              </div>
            </div>
            
            <div className="flex bg-slate-900 p-1.5 rounded-[2rem] border border-white/10 shadow-2xl">
              <button 
                onClick={() => setActiveTab('HOME')}
                className={`px-10 py-4 rounded-3xl text-[10px] font-black uppercase transition-all flex items-center gap-3 ${activeTab === 'HOME' ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
              >
                <Home size={16} /> <Translate targetLanguage={language}>Care_Hub</Translate>
              </button>
              <button 
                onClick={() => setActiveTab('CONCERNS')}
                className={`px-10 py-4 rounded-3xl text-[10px] font-black uppercase transition-all flex items-center gap-3 ${activeTab === 'CONCERNS' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}
              >
                <MessageSquare size={16} /> <Translate targetLanguage={language}>Direct_Help</Translate>
              </button>
            </div>
          </div>

          {activeTab === 'HOME' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Side: Schedule */}
              <div className="lg:col-span-7">
                <ScheduleGrid visits={visits} language={language} onCancel={handleCancel} />
              </div>
              
              {/* Right Side: Active Worker & Interaction */}
              <div className="lg:col-span-5 space-y-6">
                <PSWCard 
                  pswName="Elena Rodriguez" 
                  isNew={true} 
                  language={language}
                  onRate={(s) => console.log("Rated:", s)}
                  onBlacklist={() => alert("Restricting Professional from future Roster Deployment.")}
                />
                
                <div className="glass-card p-8 rounded-[3rem] text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Institutional Integrity Check</p>
                  <p className="text-sm font-medium italic text-slate-300">
                    <Translate targetLanguage={language}>The team is on-site and verified via GPS geofence.</Translate>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <ConcernsForm language={language} onSent={() => setActiveTab('HOME')} />
            </div>
          )}
        </div>
      </main>

      {/* Navigation Footer for Mobile */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 flex bg-black/80 backdrop-blur-2xl border border-white/10 p-2 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] md:hidden">
        <button className="w-16 h-16 rounded-full flex items-center justify-center text-teal-400 bg-white/5"><Home size={24} /></button>
        <button className="w-16 h-16 rounded-full flex items-center justify-center text-slate-500"><MessageSquare size={24} /></button>
      </footer>
    </div>
  );
};

export default ClientApp;
