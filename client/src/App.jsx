import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Shield, Wifi, Terminal } from 'lucide-react';

// Connect to Python backend
const socket = io('http://localhost:5000');

function App() {
  const [packets, setPackets] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('new_packet', (data) => {
      setPackets((prev) => {
        const newState = [...prev, data];
        // Keep last 30 packets for graph performance
        if (newState.length > 30) return newState.slice(newState.length - 30);
        return newState;
      });
    });

    return () => socket.off('new_packet');
  }, []);

  // Auto-scroll the log
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [packets]);

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono p-6 selection:bg-emerald-900">
      
      {/* Header */}
      <header className="mb-8 border-b border-emerald-900/50 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter flex items-center gap-3">
            <Activity className="h-8 w-8 text-emerald-500 animate-pulse" />
            NETSCOPE<span className="text-slate-600">_LIVE</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time Network Traffic Visualizer</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${isConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50' : 'bg-red-500/10 text-red-400 border border-red-500/50'}`}>
            {isConnected ? '● ONLINE' : '○ OFFLINE'}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
        
        {/* Left Col: Graph & Stats */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Traffic Graph */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex-1 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-slate-400 mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
              <Wifi size={16} /> Live Bandwidth
            </h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={packets}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis stroke="#475569" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#10b981' }} 
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="len" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4, fill: '#10b981' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase">Total Packets</p>
                <p className="text-3xl font-bold text-white mt-1">{packets.length}</p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase">Last Protocol</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {packets.length > 0 ? packets[packets.length - 1].proto : '-'}
                </p>
             </div>
          </div>
        </div>

        {/* Right Col: The Terminal Log */}
        <div className="bg-black border border-slate-800 rounded-lg p-4 flex flex-col font-mono text-xs h-full overflow-y-auto">
          <h2 className="text-slate-400 mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider border-b border-slate-800 pb-2">
            <Terminal size={16} /> Packet Stream
          </h2>
          <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
            {packets.length === 0 && <p className="text-slate-600 italic">Waiting for traffic...</p>}
            {packets.map((pkt, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 hover:bg-slate-900 p-1 rounded transition-colors border-l-2 border-transparent hover:border-emerald-500">
                <span className="col-span-2 text-slate-500">[{pkt.timestamp}]</span>
                <span className="col-span-4 text-emerald-300 truncate">{pkt.src}</span>
                <span className="col-span-1 text-slate-500">→</span>
                <span className="col-span-4 text-emerald-300 truncate">{pkt.dst}</span>
                <span className="col-span-1 text-slate-400 text-right">{pkt.len}b</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;