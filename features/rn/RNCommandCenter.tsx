
import React, { useState } from 'react';
import { AlertSignal } from '../../types';
import Translate from '../../components/Translate';
import NeuralScribe from './NeuralScribe';
import VisionDiagnostics from '../clinical/VisionDiagnostics';
import IncidentCommandFeed from '../clinical/IncidentCommandFeed';

interface Props {
  language: string;
  alerts: AlertSignal[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertSignal[]>>;
}

const RNCommandCenter: React.FC<Props> = ({ language, alerts, setAlerts }) => {
  const [activeTab, setActiveTab] = useState<'FEED' | 'SCRIBE' | 'VISION'>('FEED');

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'ACKNOWLEDGED' } : a));
  };

  const tabs = [
    { id: 'FEED', label: 'Inbound Signals' },
    { id: 'SCRIBE', label: 'Neural Scribe' },
    { id: 'VISION', label: 'Vision Guard' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Clinical_Command</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Real-time operative signal feed and neural diagnostics</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-hide shadow-sm">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate targetLanguage={language}>{tab.label}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] space-y-12">
        {activeTab === 'FEED' && (
          <IncidentCommandFeed 
            signals={alerts} 
            onAcknowledge={acknowledgeAlert} 
            language={language} 
          />
        )}

        {activeTab === 'SCRIBE' && (
          <div className="animate-in slide-in-from-bottom-4">
            <NeuralScribe language={language} />
          </div>
        )}
        {activeTab === 'VISION' && (
          <div className="animate-in slide-in-from-bottom-4">
            <VisionDiagnostics language={language} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RNCommandCenter;
