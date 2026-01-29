import React, { useState } from 'react';
import { CareRole, Client, FormRequirement } from '../../types';
import { MOCK_CLIENTS } from '../../data/careData';
import { Translate } from '../../components/Translate';

interface Props {
  language: string;
}

const CarePlanEditor: React.FC<Props> = ({ language }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(MOCK_CLIENTS[0]);
  const [selectedRole, setSelectedRole] = useState<CareRole>(CareRole.PSW);
  const [newTask, setNewTask] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  
  const availableForms: FormRequirement[] = [
    { id: 'f1', companyId: 'demo-company', createdAt: new Date().toISOString(), name: 'Wound Assessment v2', submissionTarget: 'RN_SUPERVISOR', isMandatory: true },
    { id: 'f2', companyId: 'demo-company', createdAt: new Date().toISOString(), name: 'Medication Refusal Form', submissionTarget: 'DOC', isMandatory: true },
    { id: 'f3', companyId: 'demo-company', createdAt: new Date().toISOString(), name: 'Home Care Incident Log', submissionTarget: 'HOME_CARE_AUTH', isMandatory: false },
  ];

  const rolesToEdit = [CareRole.RN, CareRole.RPN, CareRole.PSW, CareRole.HSS];

  const simulateDictation = () => {
    setIsDictating(true);
    setTimeout(() => {
      setNewTask("Monitor sacral area for skin breakdown and document using Wound Assessment Form v2.");
      setIsDictating(false);
    }, 1500);
  };

  const handleAddTask = () => {
    if (!newTask.trim() || !selectedClient) return;
    alert(`Protocol Locked: Directive added for ${selectedRole}. Syncing with mobile fleet.`);
    setNewTask('');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]"><Translate target={language}>CLINICAL_PROTOCOL_ARCHITECT</Translate></span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">
            <Translate target={language}>CARE_PROTOCOL_MATRIX</Translate>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8"><Translate target={language}>TARGET_PROFILE</Translate></h3>
            <div className="space-y-2">
              {MOCK_CLIENTS.map(c => (
                <button 
                  key={c.id}
                  onClick={() => setSelectedClient(c)}
                  className={`w-full p-6 rounded-2xl text-left border transition-all ${selectedClient?.id === c.id ? 'bg-indigo-600/20 border-indigo-500/50 text-white' : 'bg-white/5 border-transparent text-slate-500 hover:bg-white/10'}`}
                >
                  <p className="text-sm font-black uppercase tracking-tighter"><Translate target={language}>{c.name}</Translate></p>
                  <p className="text-[9px] font-bold mt-1 opacity-60 italic">
                    <Translate target={language}>{c.conditions.join(', ')}</Translate>
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 shadow-xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8"><Translate target={language}>OPERATIONAL_ROSTER</Translate></h3>
            <div className="grid grid-cols-2 gap-2">
              {rolesToEdit.map(role => (
                <button 
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-xl text-[10px] font-black uppercase transition-all ${selectedRole === role ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                >
                  <Translate target={language}>{role.split(' ')[0]}</Translate>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           <div className="bg-slate-950/50 border border-white/10 rounded-[3.5rem] p-12 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <span className="text-9xl font-black tracking-tighter uppercase italic">Doc</span>
              </div>
              
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
                       <Translate target={language}>DIRECTIVE_IMPUTE</Translate>
                    </h3>
                    <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mt-2">
                      <Translate target={language}>PROTOCOL_LEAD</Translate>: <Translate target={language}>DIRECTOR_OF_CARE</Translate>
                    </p>
                 </div>
                 <button 
                    onClick={simulateDictation}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDictating ? 'bg-rose-500 animate-pulse' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                 >
                   🎙️
                 </button>
              </div>

              <div className="space-y-4 mb-10 relative z-10">
                 {selectedClient?.carePlans[selectedRole]?.map((task, i) => (
                   <div key={i} className="flex justify-between items-center p-6 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                        <p className="text-sm text-slate-300 font-medium italic">
                           "<Translate target={language}>{task}</Translate>"
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-rose-500 text-[9px] font-black uppercase transition-opacity">
                         <Translate target={language}>DELETE_PROTOCOL</Translate>
                      </button>
                   </div>
                 ))}
              </div>

              <div className="relative pt-10 border-t border-white/5 z-10">
                 <textarea 
                   value={newTask}
                   onChange={(e) => setNewTask(e.target.value)}
                   placeholder="..."
                   className="w-full h-32 p-6 bg-white/5 border border-white/10 rounded-[2rem] text-sm text-white focus:outline-none focus:border-rose-500 transition-all placeholder:text-slate-700 italic"
                 />
                 <button 
                   onClick={handleAddTask}
                   disabled={!newTask.trim()}
                   className="absolute bottom-6 right-6 px-10 py-4 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/20 disabled:opacity-50"
                 >
                   <Translate target={language}>AUTHORIZE_PROTOCOL</Translate>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CarePlanEditor;