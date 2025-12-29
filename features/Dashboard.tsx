
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
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="alaya-card p-6 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Welcome, {staffName.split(' ')[0]}</h3>
          <p className="text-slate-500 text-sm mt-1">Sovereign Data Node synchronized. Fleet capacity at 92%.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded text-xs font-bold hover:bg-slate-100 transition-all">
            <Clock size={14} /> Schedule View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#005596] text-white rounded text-xs font-bold shadow-md hover:bg-[#00447a] transition-all">
            <Plus size={14} /> New Intake
          </button>
        </div>
      </div>

      {/* KPI Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricNode 
          label="Active Census" 
          value={clients.length.toString()} 
          icon={Users} 
          trend="+2 New" 
          trendType="positive"
        />
        <MetricNode 
          label="Visit Adherence" 
          value="98.4" 
          suffix="%" 
          icon={Activity} 
          trend="+0.2%" 
          trendType="positive"
        />
        <MetricNode 
          label="Critical Gaps" 
          value="04" 
          icon={AlertCircle} 
          trend="Action Reqd" 
          trendType="negative"
        />
        <MetricNode 
          label="Billing Delta" 
          value="14.2" 
          suffix="k" 
          icon={FileText} 
          trend="Recovered" 
          trendType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Operational Feed */}
        <div className="lg:col-span-8">
           <div className="alaya-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    Execution_Ledger
                 </h4>
                 <button className="text-[10px] font-bold text-[#005596] uppercase hover:underline">View Full Logs</button>
              </div>
              <SignalLog clients={clients} />
           </div>
        </div>
        
        {/* Alerts Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="alaya-card p-6">
             <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6 border-l-2 border-rose-500 pl-3">
                High_Acuity_Alerts
             </h4>
             <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="p-4 bg-rose-50 border border-rose-100 rounded flex gap-4">
                    <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-[12px] font-bold text-rose-900 leading-tight">Patient Fall Detected</p>
                      <p className="text-[11px] text-rose-700 mt-1 leading-normal italic">Robert Johnson - Sector 4</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-2 text-[10px] font-black text-[#005596] uppercase tracking-widest border border-[#005596]/10 rounded hover:bg-slate-50">Clear Alarms</button>
          </div>

          <div className="alaya-card p-6 bg-slate-900 text-white">
             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">
                Market_Intelligence
             </h4>
             <p className="text-[12px] text-slate-300 leading-relaxed italic">
               "Regional flu surges in Sector 1 detected via Grounding. Ensure all field staff in M5V have verified PPE stock."
             </p>
             <button className="w-full mt-6 py-3 bg-[#005596] text-white rounded text-[10px] font-black uppercase tracking-widest shadow-lg">Refresh Grounding</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
