
import React, { useState } from 'react';
import { CareRole } from '../types';
import { Translate } from '../components/Translate';
import VaultChat from './vault/VaultChat';
import VaultTransferTerminal from './vault/VaultTransferTerminal';

interface Props {
  role: CareRole;
  language: string;
}

type VaultTab = 'INGESTION' | 'INTERROGATION';

const DocumentVault: React.FC<Props> = ({ role, language }) => {
  const [activeTab, setActiveTab] = useState<VaultTab>('INGESTION');

  return (
    <div className="space-y-12 animate-in fade-in duration-500 h-full pb-20 overflow-y-auto scrollbar-hide px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none text-indigo-400">
             <Translate targetLanguage={language}>NEURAL_VAULT</Translate>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 italic">
             <Translate targetLanguage={language}>Secure_Semantic_Indexing_&_Protocol_Retrieval</Translate>
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10 shadow-xl">
          {(['INGESTION', 'INTERROGATION'] as VaultTab[]).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Translate targetLanguage={language}>{tab === 'INGESTION' ? 'Data_Ingest' : 'Neural_Query'}</Translate>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'INTERROGATION' ? (
          <div className="h-full min-h-[600px]">
            <VaultChat language={language} />
          </div>
        ) : (
          <VaultTransferTerminal />
        )}
      </div>
    </div>
  );
};

export default DocumentVault;
