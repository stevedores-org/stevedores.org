import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { DockerContainer } from '../types';
import { INITIAL_CONTAINERS } from '../data';
import { Ship, HardDrive, Cpu, Plus, RefreshCw, Zap, Server } from 'lucide-react';

export default function VesselSimulator() {
  const [containers, setContainers] = useState<DockerContainer[]>(INITIAL_CONTAINERS);
  const [selectedService, setSelectedService] = useState<string>('api-gateway');
  const [capacity, setCapacity] = useState<number>(45); // % of shipping capacity occupied
  const [recentLogs, setRecentLogs] = useState<string[]>([
    'Vessel pipeline initialized on port 8080.',
    'Assigned 5 primary container modules to cargo deck bays.',
    'Ready for manual container loading / scaling operations.'
  ]);

  // Compute total memory and CPU
  const activeContainers = containers.filter(c => c.status === 'running');
  const totalMem = activeContainers.reduce((sum, c) => sum + c.memUsage, 0);
  const totalCpu = activeContainers.reduce((sum, c) => sum + c.cpuUsage, 0);

  // Re-calculate mock capacity when containers change
  useEffect(() => {
    const caps = Math.min(Math.round((activeContainers.length / 12) * 100), 100);
    setCapacity(caps);
  }, [containers]);

  const addLog = (msg: string) => {
    setRecentLogs(prev => [ `[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15) ]);
  };

  const handleToggleStatus = (id: string) => {
    setContainers(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextStatus = c.status === 'running' ? 'stopped' : 'running';
          const isRunning = nextStatus === 'running';
          addLog(`${isRunning ? 'Booted' : 'Stopped'} service container <${c.label}> on port ${c.port}.`);
          return {
            ...c,
            status: nextStatus as any,
            memUsage: isRunning ? parseFloat((Math.random() * 20 + 4).toFixed(1)) : 0,
            cpuUsage: isRunning ? parseFloat((Math.random() * 2 + 0.1).toFixed(1)) : 0
          };
        }
        return c;
      })
    );
  };

  const handleScaleService = () => {
    if (containers.length >= 12) {
      addLog('Cannot load further custom cargo: Vessel cargo hold is fully loaded (Max 12 bays).');
      return;
    }
    const target = containers.find(c => c.label === selectedService);
    if (!target) return;

    const countOfService = containers.filter(c => c.label.startsWith(selectedService)).length;
    const newId = `custom-${Date.now()}`;
    const newPort = 8080 + containers.length;
    
    const newCont: DockerContainer = {
      id: newId,
      label: `${selectedService}-replica-${countOfService}`,
      service: target.service,
      status: 'deploying',
      memUsage: 0,
      cpuUsage: 0,
      size: target.size,
      port: newPort
    };

    setContainers(prev => [...prev, newCont]);
    addLog(`Initiated spin-up for replicas: scaling service <${selectedService}>...`);

    // Complete deployment phase
    setTimeout(() => {
      setContainers(prev =>
        prev.map(c => {
          if (c.id === newId) {
            addLog(`Vessel deployment complete: <${c.label}> is online at port ${c.port} with Bun microservicing.`);
            return {
              ...c,
              status: 'running',
              memUsage: parseFloat((Math.random() * 15 + 5).toFixed(1)),
              cpuUsage: parseFloat((Math.random() * 1.5 + 0.2).toFixed(1))
            };
          }
          return c;
        })
      );
    }, 1200);
  };

  const handleCleanHold = () => {
    setContainers(INITIAL_CONTAINERS);
    addLog('Reset vessel. Replaced replica stacks with default Docker container configurations.');
  };

  return (
    <div className="bg-slate-55 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6" id="vessel-sim-root">
      
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
              <Ship className="w-5 h-5" />
            </span>
            <h3 className="font-sans font-bold text-lg text-slate-800">SS Stevedore Vessel Operations</h3>
          </div>
          <p className="text-sm text-slate-500">
            A real-time simulator representing the packaging and loading of lightweight Rust micro-binaries into Bun routers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleCleanHold}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-white"
            id="btn-vessel-reset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Bays
          </button>
        </div>
      </div>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Memory Usage */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <HardDrive className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Heap RSS</div>
            <div className="text-xl font-mono font-bold text-slate-800 flex items-baseline gap-1">
              {totalMem.toFixed(1)} <span className="text-xs font-sans text-slate-400">MB</span>
            </div>
            <div className="text-[11px] text-indigo-600 font-medium">Rust + Bun Memory Advantage</div>
          </div>
        </div>

        {/* CPU Util */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Core CPU Draw</div>
            <div className="text-xl font-mono font-bold text-slate-800 flex items-baseline gap-1">
              {totalCpu.toFixed(1)} <span className="text-xs font-sans text-slate-400">%</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-medium">LTO Optimized Kernel Loops</div>
          </div>
        </div>

        {/* Total Microservices */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
            <Server className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Loaded Clusters</div>
            <div className="text-xl font-mono font-bold text-slate-800">
              {activeContainers.length} <span className="text-xs font-sans text-slate-400">/ {containers.length} active</span>
            </div>
            <div className="text-[11px] text-sky-600 font-medium">Dynamic Cargo Allocation</div>
          </div>
        </div>

        {/* Vessel Hold Space */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Ship className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Vessel cargo load</div>
            <div className="text-xl font-mono font-bold text-slate-800">
              {capacity} <span className="text-xs font-sans text-slate-400">%</span>
            </div>
            <div className="relative w-full h-1.5 bg-slate-100 rounded-full mt-1.5">
              <div 
                className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all duration-500" 
                style={{ width: `${capacity}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulator Deck split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Bay visualizer layout (Left/Middle) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-inner relative overflow-hidden flex-1 min-h-[300px]">
            {/* Ambient Background decoration representation of a shipping vessel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            
            {/* Visual Ship Frame */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  VESSEL DECK BAY LAYOUT (Max 12 Slots)
                </span>
                <span className="text-xs font-mono text-orange-400">
                  Total payload footprint: {containers.reduce((total, c) => total + (c.status === 'running' ? parseFloat(c.size) : 0), 0).toFixed(1)} MB
                </span>
              </div>

              {/* The Container Grid representing ship bays */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-auto">
                <AnimatePresence mode="popLayout">
                  {containers.map((cont, index) => {
                    const isRunning = cont.status === 'running';
                    const isDeploying = cont.status === 'deploying';
                    
                    return (
                      <motion.div
                        layout
                        key={cont.id}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className={`h-24 p-3 border rounded-xl flex flex-col justify-between relative cursor-pointer outline-none select-none transition-all ${
                          isRunning 
                            ? 'bg-slate-800/80 border-orange-500/40 shadow-[0_0_12px_-3px_rgba(243,95,34,0.15)] hover:border-orange-500/80' 
                            : isDeploying
                            ? 'bg-slate-800/40 border-sky-500/40 border-dashed animate-pulse'
                            : 'bg-slate-950/90 border-slate-800/60 text-slate-500 hover:border-slate-700'
                        }`}
                        onClick={() => handleToggleStatus(cont.id)}
                        title={`Click to ${isRunning ? 'Stop' : 'Boot'} Container`}
                      >
                        {/* Bay number marker */}
                        <div className="absolute top-1 right-2 text-[9px] font-mono font-bold text-slate-600 bg-slate-900 border border-slate-800 px-1 rounded-sm">
                          BAY {(index + 1).toString().padStart(2, '0')}
                        </div>

                        {/* Cargo Container Icon & Label */}
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-mono font-bold max-w-[85%] truncate ${isRunning ? 'text-orange-400' : 'text-slate-400'}`}>
                            {cont.label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium truncate">
                            {cont.service}
                          </span>
                        </div>

                        {/* Dynamic Metrics when active */}
                        <div className="flex items-center justify-between">
                          {isRunning ? (
                            <div className="flex items-center gap-1.5 w-full justify-between">
                              <span className="text-[10px] text-slate-400 font-mono">
                                {cont.size}
                              </span>
                              <span className="flex items-center gap-1 text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {cont.memUsage}MB
                              </span>
                            </div>
                          ) : isDeploying ? (
                            <span className="text-[9px] font-mono text-sky-400 animate-pulse flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5 animate-spin" /> Packaging...
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                              <span className="w-2 h-2 fill-slate-750 bg-slate-700 rounded-sm" /> Standby
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {/* Visual Empty Slots */}
                {Array.from({ length: Math.max(0, 12 - containers.length) }).map((_, i) => (
                  <div 
                    key={`empty-${i}`}
                    className="h-24 border border-dashed border-slate-800/40 bg-slate-900/20 text-slate-700 rounded-xl flex items-center justify-center text-[11px] font-mono select-none"
                  >
                    EMPTY BAY
                  </div>
                ))}
              </div>

              {/* Deck Legend Info */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Active Service
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" /> Spin-up Container
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700" /> Suspended Bay
                </div>
                <div className="ml-auto text-[10px] text-slate-500">
                  ⚡ Powered by safe memory reference mapping.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load Control Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 flex-1">
            <h4 className="font-sans font-bold text-sm text-slate-800">Container Manifest Dispatcher</h4>
            <p className="text-xs text-slate-500">
              Pick a microservice blueprint and click "Scale Replica" to package and deploy onto the vessel deck automatically.
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Select Microservice Cargo Blueprint
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'api-gateway', label: 'api-gateway (Bun Edge Proxy)' },
                    { id: 'auth-layer', label: 'auth-layer (Rust Security Guard)' },
                    { id: 'session-broker', label: 'session-broker (Rust MemStore Cache)' },
                    { id: 'db-agent', label: 'db-agent (Rust Postgres Client)' }
                  ].map(spec => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedService(spec.id)}
                      className={`text-left px-3 py-2.5 rounded-xl border font-mono text-xs font-medium cursor-pointer transition-all ${
                        selectedService === spec.id
                          ? 'border-orange-500 bg-orange-50/50 text-orange-800 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {spec.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleScaleService}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-sans font-semibold text-sm px-4 py-3 rounded-xl shadow-md transition-all active:translate-y-px cursor-pointer"
                id="btn-scale-replica"
              >
                <Plus className="w-4 h-4" />
                Scale Service Bay Replica
              </button>
            </div>

            {/* Simulated Live Logs feed console */}
            <div className="mt-2 flex-1 flex flex-col">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Live Deployment Outfeed
              </span>
              <div className="bg-slate-950 font-mono text-[10px] leading-relaxed text-slate-300 p-3 rounded-xl border border-slate-900 overflow-y-auto max-h-[140px] flex-1">
                {recentLogs.map((log, index) => (
                  <div key={index} className={index === 0 ? "text-orange-400 font-bold" : "text-slate-400"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
