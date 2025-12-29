
import React from 'react';
import { CareRole, Client, StaffMember } from '../types';
import MetricNode from './dashboard/MetricNode';
import SignalLog from './dashboard/SignalLog';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  FileText,
  AlertTriangle,
  ClipboardCheck
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
          icon={ClipboardCheck} 
          trend="+0.2%" 
          trendType="positive"
        />
        <MetricNode 
          label="Pending Audits" 
          value="07" 
          icon={FileText} 
          trend="Action Reqd" 
          trendType="negative"
        />
        <MetricNode 
          label="Staff Utilization" 
          value="82" 
          suffix="%" 
          icon={Activity} 
          trend="Nominal" 
          trendType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Operational Feed */}
        <div className="lg:col-span-2 space-y-6">
           <div className="widget-tile overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} className="text-[#005596]" />
                    Real-Time Visit Monitoring
                 </h4>
                 <button className="text-[10px] font-bold text-[#005596] uppercase hover:underline">View All Visits</button>
              </div>
              <SignalLog clients={clients} />
           </div>
        </div>
        
        {/* Sidebar Alerts */}
        <div className="space-y-6">
          <div className="widget-tile p-6">
             <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <AlertTriangle size={14} className="text-rose-500" />
                Critical Alerts
             </h4>
             <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-sm">
                    <p className="text-[11px] font-bold text-rose-900 leading-tight">Patient Fall Detected</p>
                    <p className="text-[10px] text-rose-700 mt-1 leading-normal italic">Robert Johnson - Sector 4</p>
                    <button className="mt-3 text-[9px] font-bold text-rose-600 uppercase hover:underline">View Incident</button>
                  </div>
                ))}
             </div>
          </div>

          <div className="widget-tile p-6">
             <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users size={14} className="text-[#005596]" />
                Field Performance
             </h4>
             <div className="space-y-4">
                {staff.slice(0, 3).map(s => (
                  <div key={s.id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <div>
                        <p className="text-[12px] font-bold text-slate-700 group-hover:text-[#005596] transition-colors">{s.name}</p>
                        <p className="text-[9px] text-slate-400 uppercase font-semibold">{s.role.split(' ')[0]}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{s.status.replace('_', ' ')}</span>
                  </div>
                ))}
                <button className="w-full text-center pt-2 text-[10px] font-bold text-[#005596] uppercase hover:underline">Employee Directory</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
