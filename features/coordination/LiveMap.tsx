import React, { useState, useEffect } from 'react';
import { Translate } from '../../components/Translate';
import { CareRole } from '../../types';
import { Wifi, Radio, ShieldCheck, Zap } from 'lucide-react';

interface StaffNode {
  id: string;
  name: string;
  role: CareRole;
  x: number; 
  y: number; 
  status: 'ACTIVE' | 'IDLE' | 'EMERGENCY';
  signal: number;
  lat: number;
  lng: number;
}

interface Props {
  language: string;
}

const LiveMap: React.FC<Props> = ({ language }) => {
  const [nodes, setNodes] = useState<StaffNode[]>([
    { id: 'P1', name: 'Elena R.', role: CareRole.PSW, x: 45.2, y: 30.5, status: 'ACTIVE', signal: 98, lat: 43.7615, lng: -79.4111 },
    { id: 'RN1', name: 'Tom H.', role: CareRole.RN, x: 25.1, y: 62.8, status: 'IDLE', signal: 82, lat: 43.6532, lng: -79.3832 },
    { id: 'P2', name: 'Sarah J.', role: CareRole.PSW, x: 70.4, y: 41.2, status: 'ACTIVE', signal: 95, lat: 43.7731, lng: -79.2577 },
    { id: 'RPN1', name: 'Jared L.', role: CareRole.RPN, x: 55.8, y: 75.1, status: 'EMERGENCY', signal: 45, lat: 43.8563, lng: -79.5085 },
    { id: 'H1', name: 'Marcus B.', role: CareRole.HSS, x: 12.3, y: 18.9, status: 'IDLE', signal: 91, lat: 43.6532, lng: -79.3832 },
  ]);

  const [selectedNode, setSelectedNode] = useState<StaffNode | null>(null);

  useEffect(() => {
    const driftInterval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        x: Math.max(5, Math.min(95, node.x + (Math.random() - 0.5) * 1.5)),
        y: Math.max(5, Math.min(95, node.y + (Math.random() - 0.5) * 1.5)),
        lat: node.lat + (Math.random() - 0.5) * 0.001,
        lng: node.lng + (Math.random() - 0.5) * 0.001,
        signal: Math.max(20, Math.min(100, node.signal + (Math.random() - 0.5) * 5))
      })));
    }, 3000);
    return () => clearInterval(driftInterval);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#020617] overflow-hidden rounded-[3rem] border border-white/10 group shadow-3xl flex">
      {/* Map visualization area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background HUD Layers */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
          {[...Array(144)].map((_, i) => <div key={i} className="border border-white/10"></div>)}
        </div>

        {/* Staff Nodes */}
        <div className="absolute inset-0 z-10">
            {nodes.map(node => (
            <div 
                key={node.id}
                onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                className="absolute transition-all duration-[3000ms] ease-in-out cursor-pointer group/node"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            >
                {/* Ping Rings */}
                <div className={`absolute -inset-8 rounded-full opacity-10 animate-ping ${
                node.status === 'EMERGENCY' ? 'bg-rose-500' : node.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-500'
                }`}></div>
                
                {/* Marker Core */}
                <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all group-hover/node:scale-150 ${
                node.status === 'EMERGENCY' ? 'bg-rose-500' : node.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-500'
                }`}>
                <div className="absolute inset-0 bg-white/40 rounded-full scale-[0.3]"></div>
                </div>

                {/* Float Label */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity">
                <div className="bg-black/90 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-md">
                    <p className="text-[8px] font-black text-white uppercase tracking-widest">
                       <Translate target={language}>{node.name}</Translate>
                    </p>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* Map Control Cluster */}
        <div className="absolute bottom-8 left-8 p-6 bg-black/60 border border-white/10 rounded-3xl backdrop-blur-md z-40">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[9px] font-black text-white uppercase tracking-[0.4em]">
                   <Translate target={language}>Fleet_Sovereignty_Grid</Translate>
                </p>
            </div>
            <div className="space-y-3">
            {[
                { color: 'bg-emerald-500', label: 'ACTIVE_OPS' },
                { color: 'bg-rose-500', label: 'PRIORITY_ALARM' },
                { color: 'bg-slate-500', label: 'IDLE_STATION' }
            ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                <div className={`w-1.5 h-1.5 rounded-sm ${item.color}`}></div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                   <Translate target={language}>{item.label}</Translate>
                </span>
                </div>
            ))}
            </div>
        </div>
      </div>

      {/* Telemetry Sidebar */}
      <div className="w-80 bg-black/40 border-l border-white/10 backdrop-blur-xl flex flex-col p-8 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-[10px] font-black text-sky-400 uppercase tracking-widest italic">
               <Translate target={language}>Live_Telemetry_Stream</Translate>
            </h3>
            <Radio size={14} className="text-rose-500 animate-pulse" />
         </div>

         <div className="flex-1 overflow-y-auto scrollbar-hide space-y-6">
            {nodes.map(node => (
              <div 
                key={node.id} 
                onClick={() => setSelectedNode(node)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedNode?.id === node.id ? 'bg-white/10 border-white/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}
              >
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <p className="text-[11px] font-black text-white uppercase italic">
                          <Translate target={language}>{node.name}</Translate>
                       </p>
                       <p className="text-[8px] font-bold text-slate-500 uppercase">
                          <Translate target={language}>{node.role}</Translate>
                       </p>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map(v => (
                            <div key={v} className={`w-1 h-3 rounded-sm ${node.signal >= v * 25 ? 'bg-sky-400' : 'bg-slate-800'}`} />
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="font-mono text-[9px] text-slate-400 space-y-1">
                    <p><Translate target={language}>LAT</Translate>: <Translate target={language}>{node.lat.toFixed(6)}</Translate></p>
                    <p><Translate target={language}>LNG</Translate>: <Translate target={language}>{node.lng.toFixed(6)}</Translate></p>
                 </div>

                 <div className="mt-4 flex justify-between items-center">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${node.status === 'EMERGENCY' ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-600 text-white'}`}>
                      <Translate target={language}>{node.status}</Translate>
                    </span>
                    <p className="text-[9px] font-black text-white italic">
                       <Translate target={language}>{String(Math.round(node.signal))}</Translate>% <span className="opacity-30"><Translate target={language}>PULSE</Translate></span>
                    </p>
                 </div>
              </div>
            ))}
         </div>

         <div className="mt-8 pt-8 border-t border-white/5">
            <button className="w-full py-4 bg-sky-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
               <Zap size={12} /> <Translate target={language}>Broadcast_Intercept</Translate>
            </button>
         </div>
      </div>
    </div>
  );
};

export default LiveMap;