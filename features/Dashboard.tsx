
import React from 'react';
import { CareRole, Client, StaffMember } from '../types';
import MetricNode from './dashboard/MetricNode';
import SignalLog from './dashboard/SignalLog';
import { 
  Users, 
  Activity, 
  AlertCircle, 
  Clock, 
  FileText,
  Plus
} from 'lucide-react';

interface Props {
  staffName: string;
  role: CareRole;
  clients: Client[];
  staff: StaffMember[];
  language: string;
}

const Dashboard: React.FC<Props> = ({ staffName, clients, staff }) => {
  return (
    <div className="space-y-4">
      {/* Header Panel */}
      <div className="alaya-card p-4 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">Welcome, {staffName.split(' ')[0]}</h3>
          <p className="text-slate-500 text-[11px] mt-0.5">Sovereign Node Sync. Capacity: 92%.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-100 transition-all">
            <Clock size={12} /> Schedule
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#005596] text-white rounded text-[10px] font-bold shadow-md hover:bg-[#00447a] transition-all">
            <Plus size={12} /> Intake
          </button>
        </div>
      </div>

      {/* KPI Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <MetricNode label="Active Census" value={clients.length.toString()} icon={Users} trend="+2 New" trendType="positive" />
        <MetricNode label="Visit Adherence" value="98.4" suffix="%" icon={Activity} trend="+0.2%" trendType="positive" />
        <MetricNode label="Critical Gaps" value="04" icon={AlertCircle} trend="Action" trendType="negative" />
        <MetricNode label="Billing Delta" value="14.2" suffix="k" icon={FileText} trend="Recovered" trendType="positive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Operational Feed */}
        <div className="lg:col-span-8">
           <div className="alaya-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">Execution_Ledger</h4>
                 <button className="text-[9px] font-bold text-[#005596] uppercase hover:underline">Full Logs</button>
              </div>
              <SignalLog clients={clients} />
           </div>
        </div>
        
        {/* Alerts Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="alaya-card p-4">
             <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4 border-l-2 border-rose-500 pl-3">Acuity_Alerts</h4>
             <div className="space-y-2">
                {[1, 2].map(i => (
                  <div key={i} className="p-3 bg-rose-50 border border-rose-100 rounded flex gap-3">
                    <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={14} />
                    <div>
                      <p className="text-[11px] font-bold text-rose-900 leading-tight">Patient Fall</p>
                      <p className="text-[10px] text-rose-700 mt-0.5 leading-normal italic">Robert J. - Sector 4</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-4 py-1.5 text-[9px] font-black text-[#005596] uppercase tracking-widest border border-[#005596]/10 rounded hover:bg-slate-50">Clear Alarms</button>
          </div>

          <div className="alaya-card p-4 bg-slate-900 text-white">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Market_Intel</h4>
             <p className="text-[11px] text-slate-300 leading-relaxed italic">"Flu surges in Sector 1. Ensure staff PPE compliance."</p>
             <button className="w-full mt-4 py-2 bg-[#005596] text-white rounded text-[9px] font-black uppercase tracking-widest shadow-lg">Refresh</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;