import { ShieldCheck, Cpu, HardDrive, Zap, ArrowUpRight, Flame } from 'lucide-react';

export default function TechSpecs() {
  return (
    <div className="bg-slate-55 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6" id="tech-specs-root">
      
      {/* Title block */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
            <Cpu className="w-5 h-5" />
          </span>
          <h3 className="font-sans font-bold text-lg text-slate-800">The Stevedores Architecture Stack</h3>
        </div>
        <p className="text-sm text-slate-500">
          How our OSS Community implements a lightning-fast runtime pipeline by pairing Bun's high-speed bundler with Rust's bare-metal supervisor layers.
        </p>
      </div>

      {/* Grid comparing Bun + Rust vs Industry Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bun + Rust Stack (Elite Winner) */}
        <div className="bg-white border border-orange-200 rounded-2xl p-5 relative overflow-hidden shadow-xs hover:shadow-xs transition-shadow">
          {/* Subtle Orange highlighted glow badge */}
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-700 border-l border-b border-orange-200/50 font-mono text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 inline animate-pulse text-orange-600" />
            STEVEDORES ENGINE
          </div>

          <span className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider block mb-1">
            Bun Bundler + Rust Micro-VM
          </span>
          <h4 className="font-sans font-extrabold text-base text-slate-800 mb-4">
            Sub-millisecond Containerization Pipeline
          </h4>

          {/* Comparative Metrics stack */}
          <div className="space-y-4">
            
            {/* Startup time */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-500">Node startup latency</span>
                <span className="text-xs font-mono font-bold text-emerald-600">3.2ms cold start</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '4%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Direct kernel syscall mapping bypasses container hypervisor cold starts.</p>
            </div>

            {/* Container overhead */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-500">Average container payload weight</span>
                <span className="text-xs font-mono font-bold text-emerald-600">2.8 MB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '8%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Statically compiled Rust binaries stripped of symbols packed directly in empty scratch memory.</p>
            </div>

            {/* RAM Draw */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-500">Idle RAM Footprint (per cluster node)</span>
                <span className="text-xs font-mono font-bold text-emerald-600">0.8 MB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '6%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Zero Garbage Collector sweeps. Microsecond allocation recycling mapped at memory build-time.</p>
            </div>

          </div>

          {/* Micro-Features banner list */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              Kernel isolation wrapping
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
              TypeScript Native (Bun)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <HardDrive className="w-4 h-4 text-emerald-500 shrink-0" />
              Scratch OCI Ingestions
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Cpu className="w-4 h-4 text-emerald-500 shrink-0" />
              LTO Optimized Rust Targets
            </span>
          </div>

        </div>

        {/* Traditional JVM / Go Architecture (The Slow Contender) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-xs text-slate-500">
          <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 border-l border-b border-slate-200 font-mono text-[10px] font-semibold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider">
            STANDARD DEVOPS
          </div>

          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block mb-1">
            JVM / Large Go microservices
          </span>
          <h4 className="font-sans font-extrabold text-base text-slate-600 mb-4">
            Bulky Container Infrastructure
          </h4>

          {/* Comparative Metrics stack */}
          <div className="space-y-4">
            
            {/* Startup time */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-400">Average cold start latency</span>
                <span className="text-xs font-mono font-bold text-slate-600">450ms+ startup latency</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '85%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Interpreted containers drag along heavy Node runtime engine headers or JVM hypervisors.</p>
            </div>

            {/* Container overhead */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-400">Container image weight</span>
                <span className="text-xs font-mono font-bold text-slate-600">350 MB average</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '92%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Node/Go containers require full base system distribution files to host execution steps.</p>
            </div>

            {/* RAM Draw */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-400">Memory draw per daemon thread</span>
                <span className="text-xs font-mono font-bold text-slate-600">140 MB average</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '78%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Garbage collected thread loops require thick memory arenas to continuously inspect memory cycles.</p>
            </div>

          </div>

          {/* Comparison metadata link */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-xs flex justify-between items-center text-slate-400 font-medium">
            <span>Comparison verified in Bun benchmark audits.</span>
            <a 
              href="https://bun.sh/" 
              target="_blank" 
              rel="noreferrer"
              className="text-orange-500 hover:text-orange-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              Examine Bun benchmarks
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
