import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import { MOCK_CLIENTS } from '../../data/careData';
import AIScheduler from './AIScheduler';

interface Props {
  language: string;
}

const DOCSupervision: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'SCHEDULING' | 'CARE_DIRECTIVES'>('SCHEDULING');
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [directive, setDirective] = useState('');

  const saveDirective = (id: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, docInstructions: directive } : c));
    setEditingId(null);
    setDirective('');
    alert("SIGNAL_LOCKED.");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none text-rose-500">
             <Translate target={language}>DOC_Command_Center</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">
             <Translate target={language}>Clinical Oversight & Autonomous Deployment Synthesis</Translate>
          </p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab('SCHEDULING')} 
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SCHEDULING' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            <Translate target={language}>Rotation_Synthesis</Translate>
          </button>
          <button 
            onClick={() => setActiveTab('CARE_DIRECTIVES')} 
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CARE_DIRECTIVES' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            <Translate target={language}>Clinical_Directives</Translate>
          </button>
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-700">
        {activeTab === 'SCHEDULING' && <AIScheduler />}
        {activeTab === 'CARE_DIRECTIVES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clients.map(client => (
              <div key={client.id} className="bg-slate-900/50 border border-white/5 p-12 rounded-[4rem] group hover:border-indigo-500/20 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <span className="text-8xl font-black italic">FIX</span>
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2 relative z-10">{client.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-10 relative z-10 italic">
                  <Translate target={language}>Clinical_Profile</Translate>: {client.conditions.join(', ')}
                </p>
                
                <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-[3rem] relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                    <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest italic">
                       <Translate target={language}>Overriding Authority Directive</Translate>
                    </p>
                  </div>
                  <p className="text-sm text-slate-200 italic leading-relaxed mb-8">
                    "{client.docInstructions ? <Translate target={language}>{client.docInstructions}</Translate> : <Translate target={language}>No overriding directive issued.</Translate>}"
                  </p>
                  
                  {editingId === client.id ? (
                    <div className="space-y-6">
                      <textarea 
                        value={directive}
                        onChange={e => setDirective(e.target.value)}
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-[2rem] p-6 text-sm text-white italic focus:outline-none focus:border-indigo-500 transition-all"
                      />
                      <div className="flex gap-4">
                        <button onClick={() => saveDirective(client.id)} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                          <Translate target={language}>Authorize_Directive</Translate>
                        </button>
                        <button onClick={() => setEditingId(null)} className="flex-1 py-5 bg-white/5 text-slate-500 rounded-2xl text-[9px] font-black uppercase">
                          <Translate target={language}>Abort</Translate>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => { setEditingId(client.id); setDirective(client.docInstructions || ''); }} className="w-full py-5 border border-white/10 text-slate-400 text-[10px] font-black uppercase rounded-2xl hover:bg-white/5 transition-all tracking-[0.2em]">
                      <Translate target={language}>Modify_Directive</Translate>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DOCSupervision;