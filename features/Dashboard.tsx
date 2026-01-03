
import React from 'react';
import { AppTab, CareRole, Client, StaffMember } from '../types';
import Translate from '../components/Translate';
import MetricNode from './dashboard/MetricNode';
import SignalLog from './dashboard/SignalLog';
import { Users, Activity, AlertCircle, Target } from 'lucide-react';

interface Props {
  staffName: string;
  clients: Client[];
  language: string;
}

const Dashboard: React.FC<Props> = ({ staffName, clients, language }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass-card p-10 rounded-[3rem] flex justify-between items-center relative overflow-hidden">
        <div>
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            <Translate targetLanguage={language}>Welcome</Translate>, <span className="text-indigo-400">{staffName.split(' ')[0]}</span>
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
            <Translate targetLanguage={language}>Node_Status</Translate>: <span className="text-emerald-400 uppercase"><Translate targetLanguage={language}>Synchronized</Translate></span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricNode language={language} label="Active_Census" value={clients.length.toString()} icon={Users} trend="+2" trendType="positive" />
        <MetricNode language={language} label="Operational_Velocity" value="98.4" suffix="%" icon={Activity} trend="0.2%" trendType="positive" />
        <MetricNode language={language} label="Critical_Gaps" value="04" icon={AlertCircle} trend="Action" trendType="negative" />
        <MetricNode language={language} label="Strategic_Alpha" value="14.2" suffix="k" icon={Target} trend="Optimal" trendType="positive" />
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="px-8 py-4 border-b border-white/5 bg-white/[0.02]">
          <Translate targetLanguage={language} className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global_Signal_Log</Translate>
        </div>
        <SignalLog clients={clients} language={language} />
      </div>
    </div>
  );
};

export default Dashboard;
