
import React, { useState } from 'react';
import Translate from '../../components/Translate';
import NeuralScribe from './NeuralScribe';
import VisionDiagnostics from '../clinical/VisionDiagnostics';
import IncidentCommandFeed from '../clinical/IncidentCommandFeed';

interface Props {
  language: string;
}

const RNCommandCenter: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'FEED' | 'SCRIBE' | 'VISION'>('FEED');

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Clinical_Command</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Real-time operative signal feed and neural diagnostics</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
          {['FEED', 'SCRIBE', 'VISION'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate targetLanguage={language}>{tab}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] bg-slate-900/50 border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl overflow-hidden">
        {activeTab === 'FEED' && <IncidentCommandFeed signals={[]} onAcknowledge={()=>{}} language={language} />}
        {activeTab === 'SCRIBE' && <NeuralScribe language={language} />}
        {activeTab === 'VISION' && <VisionDiagnostics language={language} />}
      </div>
    </div>
  );
};

export default RNCommandCenter;
