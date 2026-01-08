
import React, { useState } from 'react';
import { Translate } from '../../components/Translate';
import { hrService } from '../../services/hrService';
import { financialService } from '../../services/financialService';
import { coordinationService } from '../../services/coordinationService';
import { emailService } from '../../services/emailService';
import { AlertType, InternalEmail } from '../../types';
import { Mail, Briefcase, GraduationCap, Vault, Plus, Send, FileText, ShoppingCart, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  language: string;
}

const PSWSelfService: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'HR' | 'ACCOUNTING' | 'TRAINING' | 'EMAIL' | 'VAULT'>('HR');
  const [emails, setEmails] = useState<InternalEmail[]>([]);

  const handleHRAction = async (type: AlertType) => {
    const details = prompt(`Initiating [${type}]: Enter tactical request details:`);
    if (details) {
      // Using P1 as a representative PSW ID
      await hrService.submitHRRequest({ type, details, staffId: 'P1' });
      alert(`SIGNAL_LOCKED: Request transmitted to Resource Core.`);
    }
  };

  const handleSupplyReq = async () => {
    const item = prompt("Specify item needed (Gloves, Wound Kits, PPE, etc.):");
    const qty = prompt("Quantity:");
    if (item && qty) {
      await financialService.submitSupplyRequest({ staffId: 'P1', item, quantity: parseInt(qty) });
      alert("SIGNAL_LOCKED: Supply directive routed to Accounting.");
    }
  };

  const handleBookOff = async (urgent: boolean) => {
    const reason = prompt(urgent ? "URGENT_BOOK_OFF (<24h notice): Reason:" : "ADVANCE_BOOK_OFF: Reason:");
    if (reason) {
      await coordinationService.signalBookOff({ staffId: 'P1', reason, isUrgent: urgent });
      alert(urgent ? "⚠️ ALERT: Schedule revision request broadcast to Dispatch." : "Request queued for coordination review.");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 max-w-6xl mx-auto">
      
      {/* Navigation Matrix */}
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
            {/* Standardized Translate prop to target */}
            <Translate target={language}>{tab.label}</Translate>
          </button>
        ))}
      </div>

      <div className="min-h-[600px] bg-slate-900/50 border border-white/5 rounded-[4rem] p-12 shadow-2xl backdrop-blur-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 font-black italic text-9xl text-white pointer-events-none">{activeTab}</div>
        
        {activeTab === 'HR' && (
          <div className="space-y-12 relative z-10 animate-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Vacation Request', type: 'VACATION', icon: '✈️' },
                { label: 'Time Off / Sick', type: 'LOA', icon: '⏳' },
                { label: 'Availability Change', type: 'AVAILABILITY', icon: '📅' },
                { label: 'Payroll Dispute', type: 'PAYROLL_DISPUTE', icon: '⚖️' },
                { label: 'Insurance Q', type: 'INSURANCE_Q', icon: '🛡️' }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => handleHRAction(item.type as AlertType)}
                  className="p-10 bg-white/5 border border-white/5 rounded-[3rem] text-center group hover:bg-white/10 transition-all shadow-xl"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</p>
                </button>
              ))}
            </div>

            <div className="p-10 bg-rose-600/10 border border-rose-500/20 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
               <div className="flex-1">
                  <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">Emergency_Schedule_Revision</h4>
                  <p className="text-[10px] text-rose-300 font-bold uppercase tracking-widest italic leading-relaxed">Broadcast unavailability to active dispatch grid.</p>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => handleBookOff(false)} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest">Advance (24h+)</button>
                  <button onClick={() => handleBookOff(true)} className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl animate-pulse">Urgent (&lt;24h)</button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'ACCOUNTING' && (
          <div className="flex flex-col items-center justify-center h-full space-y-12 relative z-10 animate-in zoom-in">
             <div className="w-40 h-40 bg-indigo-600/10 border-4 border-indigo-500/30 rounded-full flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(99,102,241,0.2)]">🛒</div>
             <div className="text-center space-y-4">
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Supply_Requisition</h3>
                <p className="text-sm text-slate-400 font-medium italic max-w-sm">Request Nitrile Gloves, Wound Kits, or Hardware for your sector via Accounting.</p>
             </div>
             <button onClick={handleSupplyReq} className="px-16 py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-emerald-500 transition-all flex items-center gap-4">
               <ShoppingCart size={20} /> INITIATE_ORDER
             </button>
          </div>
        )}

        {activeTab === 'TRAINING' && (
          <div className="space-y-8 relative z-10 animate-in slide-in-from-right-4">
             <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10 border-l-4 border-orange-500 pl-6">Mandatory_Compliance_Forge</h3>
             <div className="space-y-4">
                {[
                  { title: 'Safe Lifts & Hoyer Protocol v5', due: '7 Days', urgent: true },
                  { title: 'Infection Control 2025', due: '14 Days', urgent: false },
                  { title: 'Dementia Behavioral Shield', due: 'Completed', urgent: false }
                ].map((tr, i) => (
                  <div key={i} className={`p-8 rounded-[2.5rem] border flex justify-between items-center ${tr.urgent ? 'bg-rose-500/5 border-rose-500/30 shadow-xl' : 'bg-white/[0.02] border-white/5'}`}>
                     <div>
                        <p className="text-lg font-black text-white uppercase italic tracking-tighter">{tr.title}</p>
                        <p className={`text-[9px] font-bold uppercase mt-2 ${tr.urgent ? 'text-rose-500' : 'text-slate-500'}`}>Status: {tr.due}</p>
                     </div>
                     <button className="px-8 py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">Launch</button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'EMAIL' && (
          <div className="h-[550px] flex flex-col relative z-10 animate-in fade-in">
             <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Internal_Operative_Mail</h3>
                <button onClick={() => alert("Composing new transmission...")} className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all"><Plus size={20} /></button>
             </div>
             <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pr-2">
                {[
                  { from: 'DOC Oversight', sub: 'New Lift Protocol: Robert Johnson', time: '08:12', read: false },
                  { from: 'Accounting', sub: 'Supply Order REQ-992 Confirmed', time: 'Yesterday', read: true },
                  { from: 'HR Specialst', sub: 'T4 Documentation Uploaded', time: 'Oct 12', read: true }
                ].map((mail, i) => (
                  <div key={i} className={`p-6 rounded-[2.5rem] border flex items-center gap-6 transition-all cursor-pointer ${!mail.read ? 'bg-sky-600/5 border-sky-500/30' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
                     <div className={`w-3 h-3 rounded-full ${!mail.read ? 'bg-sky-400 animate-pulse' : 'bg-slate-700'}`}></div>
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                           <p className="text-xs font-black text-white uppercase tracking-tighter">{mail.from}</p>
                           <span className="text-[8px] font-bold text-slate-500 uppercase">{mail.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium italic">"{mail.sub}"</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'VAULT' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 animate-in zoom-in">
             {[
               { label: '2024 T4 Statement', icon: FileText, action: 'T4_REQUEST' },
               { label: 'Recent Paystub', icon: Clock, action: 'PAYROLL' },
               { label: 'Insurance Policy', icon: ShieldAlert, action: 'INSURANCE_Q' },
               { label: 'Credentials Scan', icon: CheckCircle2, action: 'AVAILABILITY' }
             ].map((doc, i) => (
               <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center flex flex-col items-center justify-between group hover:bg-white/10 transition-all h-72 shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border-2 border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-all"><doc.icon size={24} /></div>
                  <p className="text-[11px] font-black text-white italic tracking-tighter">{doc.label}</p>
                  <button onClick={() => alert(`Authorizing secure download for ${doc.label}...`)} className="px-6 py-2 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">Download</button>
               </div>
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default PSWSelfService;
