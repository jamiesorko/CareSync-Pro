import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import { hrService } from '../../services/hrService';
import { financialService } from '../../services/financialService';
import { coordinationService } from '../../services/coordinationService';
import { AlertType } from '../../types';
import { Mail, Briefcase, GraduationCap, Vault, ShoppingCart, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  language: string;
}

const PSWSelfService: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'HR' | 'ACCOUNTING' | 'TRAINING' | 'EMAIL' | 'VAULT'>('HR');

  const handleHRAction = async (type: AlertType) => {
    const details = prompt(`Initiating [${type}]: Details:`);
    if (details) {
      await hrService.submitHRRequest({ type, details, staffId: 'P1' });
      alert("SIGNAL_LOCKED.");
    }
  };

  const handleSupplyReq = async () => {
    const item = prompt("Item needed:");
    const qty = prompt("Quantity:");
    if (item && qty) {
      await financialService.submitSupplyRequest({ staffId: 'P1', item, quantity: parseInt(qty) });
      alert("SIGNAL_LOCKED.");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 max-w-6xl mx-auto px-4">
      <div className="flex bg-slate-900 p-1.5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-hide shadow-2xl">
        {[
          { id: 'HR', label: 'HR_Center', icon: Briefcase },
          { id: 'ACCOUNTING', label: 'Accounting', icon: ShoppingCart },
          { id: 'TRAINING', label: 'Training', icon: GraduationCap },
          { id: 'EMAIL', label: 'Internal_Mail', icon: Mail },
          { id: 'VAULT', label: 'Fiscal_Vault', icon: Vault }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-10 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === tab.id ? 'bg-orange-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            <tab.icon size={16} />
            <Translate target={language}>{tab.label}</Translate>
          </button>
        ))}
      </div>

      <div className="min-h-[600px] bg-slate-900/50 border border-white/5 rounded-[4rem] p-12 shadow-2xl backdrop-blur-3xl overflow-hidden relative">
        {activeTab === 'HR' && (
          <div className="space-y-12 relative z-10 animate-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Vacation_Request', type: 'VACATION', icon: '✈️' },
                { label: 'Time_Off_Sick', type: 'LOA', icon: '⏳' },
                { label: 'Availability_Change', type: 'AVAILABILITY', icon: '📅' },
                { label: 'Payroll_Dispute', type: 'PAYROLL_DISPUTE', icon: '⚖️' },
                { label: 'Insurance_Q', type: 'INSURANCE_Q', icon: '🛡️' }
              ].map((item, i) => (
                <button key={i} onClick={() => handleHRAction(item.type as AlertType)} className="p-10 bg-white/5 border border-white/5 rounded-[3rem] text-center group hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest"><Translate target={language}>{item.label}</Translate></p>
                </button>
              ))}
            </div>

            <div className="p-10 bg-rose-600/10 border border-rose-500/20 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
               <div className="flex-1">
                  <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">
                     <Translate target={language}>Emergency_Schedule_Revision</Translate>
                  </h4>
                  <p className="text-[10px] text-rose-300 font-bold uppercase tracking-widest italic leading-relaxed">
                     <Translate target={language}>Broadcast_unavailability_to_active_dispatch_grid</Translate>
                  </p>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => coordinationService.signalBookOff({ staffId: 'P1', reason: 'Advance', isUrgent: false })} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest"><Translate target={language}>Advance_24h</Translate></button>
                  <button onClick={() => coordinationService.signalBookOff({ staffId: 'P1', reason: 'Urgent', isUrgent: true })} className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest animate-pulse"><Translate target={language}>Urgent_24h</Translate></button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'ACCOUNTING' && (
          <div className="flex flex-col items-center justify-center h-full space-y-12 relative z-10">
             <div className="text-center space-y-4">
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none"><Translate target={language}>Supply_Requisition</Translate></h3>
                <p className="text-sm text-slate-400 font-medium italic max-w-sm"><Translate target={language}>Request_Nitrile_Gloves_Wound_Kits_or_Hardware_for_your_sector_via_Accounting</Translate></p>
             </div>
             <button onClick={handleSupplyReq} className="px-16 py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-emerald-500 transition-all flex items-center gap-4">
               <ShoppingCart size={20} /> <Translate target={language}>INITIATE_ORDER</Translate>
             </button>
          </div>
        )}

        {activeTab === 'TRAINING' && (
          <div className="space-y-8 relative z-10 animate-in slide-in-from-right-4">
             <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10 border-l-4 border-orange-500 pl-6">
                <Translate target={language}>Mandatory_Compliance_Forge</Translate>
             </h3>
             <div className="space-y-4">
                {[ { title: 'Safe_Lifts_Hoyer_Protocol_v5', due: '7_Days', urgent: true } ].map((tr, i) => (
                  <div key={i} className={`p-8 rounded-[2.5rem] border flex justify-between items-center ${tr.urgent ? 'bg-rose-500/5 border-rose-500/30' : 'bg-white/[0.02] border-white/5'}`}>
                     <div>
                        <p className="text-lg font-black text-white uppercase italic tracking-tighter"><Translate target={language}>{tr.title}</Translate></p>
                        <p className={`text-[9px] font-bold uppercase mt-2 ${tr.urgent ? 'text-rose-500' : 'text-slate-500'}`}><Translate target={language}>Status</Translate>: <Translate target={language}>{tr.due}</Translate></p>
                     </div>
                     <button className="px-8 py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest"><Translate target={language}>Launch</Translate></button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'VAULT' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 animate-in zoom-in">
             {[ { label: 'T4_Statement_2024' }, { label: 'Recent_Paystub' }, { label: 'Insurance_Policy' } ].map((doc, i) => (
               <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center flex flex-col items-center justify-between group hover:bg-white/10 transition-all h-72 shadow-2xl">
                  <p className="text-[11px] font-black text-white italic tracking-tighter"><Translate target={language}>{doc.label}</Translate></p>
                  <button className="px-6 py-2 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl"><Translate target={language}>Download</Translate></button>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PSWSelfService;