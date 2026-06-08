import React, { useState, useRef, useEffect } from 'react';
import { Play, Terminal, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'success' | 'warning' | 'info';
}

const PRESET_COMMANDS = [
  {
    cmd: 'stevedore status',
    desc: 'Retrieve active cluster nodes and resource draws'
  },
  {
    cmd: 'stevedore build --all',
    desc: 'LTO compilation & Bun bundling pass of workspace'
  },
  {
    cmd: 'stevedore ship rigging-telemetry',
    desc: 'Deploy sidecar daemon onto minimal scratch layer'
  },
  {
    cmd: 'stevedore help',
    desc: 'Retrieve valid CLI commands and flags'
  }
];

export default function TerminalPlayground() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: 'Stevedores Community CLI v2.4.1 (Rust cargo-stevedore backend)', type: 'info' },
    { text: 'Connected to local node bun-v1.1-runtime with ultra-fast TLS.', type: 'info' },
    { text: 'Type a command below or click a quick-preset trigger to test compilation speed.', type: 'info' },
    { text: '', type: 'output' }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of console lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const runCommandLogic = (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const newLines = [...terminalLines, { text: trimmed, type: 'input' as const }];
    setTerminalLines(newLines);
    setInputVal('');
    setIsCompiling(true);

    setTimeout(() => {
      if (trimmed.startsWith('stevedore build')) {
        simulateBuildCommand();
      } else if (trimmed.startsWith('stevedore status')) {
        simulateStatusCommand();
      } else if (trimmed.startsWith('stevedore ship')) {
        const parts = trimmed.split(' ');
        const target = parts[2] || 'api-gateway';
        simulateShipCommand(target);
      } else if (trimmed.startsWith('stevedore help')) {
        simulateHelpCommand();
      } else if (trimmed === 'clear') {
        setTerminalLines([{ text: 'Console buffer cleared.', type: 'info' }]);
        setIsCompiling(false);
      } else {
        simulateUnknownCommand(trimmed);
      }
    }, 400);
  };

  const simulateBuildCommand = () => {
    const steps: TerminalLine[] = [
      { text: '⚙️ Parsing Cargo.toml and package.json workspaces...', type: 'info' },
      { text: '✓ Discovered 5 microservice projects in GitHub monorepo.', type: 'success' },
      { text: '⚡ Compiling rust components with cargo-lto (level 3 optimizations)...', type: 'info' },
      { text: '  ├─ Compiling core.rs ... 42 files stripped (84ms)', type: 'output' },
      { text: '  ├─ Linking statically against epoll and glibc runtime... done.', type: 'output' },
      { text: '📦 Bundling React/TypeScript frontend with Bun.build engine...', type: 'info' },
      { text: '  ├─ Direct AST resolution of TS components (14ms)', type: 'output' },
      { text: '  ├─ Compiling CSS using Tailwind dynamic engine (19ms)', type: 'output' },
      { text: '✨ Success: Compiled and sealed minimal docker container images:', type: 'success' },
      { text: '  ├─ stevedore-core.raw  -> Size: 1.2 MB  - Hash: 0xf428a', type: 'output' },
      { text: '  ├─ cargo-stevedore.raw -> Size: 2.8 MB  - Hash: 0xa8fb1', type: 'output' },
      { text: '  └─ crane-ui-node.raw   -> Size: 38 KB   - Hash: 0x221ef', type: 'output' },
      { text: '🚀 Execution benchmark: Finished in 138.4ms (94x faster than Docker Compose!)', type: 'success' }
    ];

    appendLinesWithDelay(steps);
  };

  const simulateStatusCommand = () => {
    const steps: TerminalLine[] = [
      { text: '🔍 Directing syscalls to core host cluster state...', type: 'info' },
      { text: 'CONTAINER ID   NAME                SERVICE TYPE             PORT    STATUS    HEAP RSS', type: 'info' },
      { text: '0x12bfa910d    api-gateway         Bun Edge Proxy           8080    RUNNING   32.4 MB', type: 'output' },
      { text: '0x94ccab93ef   auth-layer          Rust Security Guard      8081    RUNNING    8.1 MB', type: 'output' },
      { text: '0xa03e9ff8a3   session-broker      Rust MemStore Cache      6379    RUNNING   14.5 MB', type: 'output' },
      { text: '0xd038bc32ea   stats-engine        Rust Rigging Scraper     9090    RUNNING    4.2 MB', type: 'output' },
      { text: '─────────────────────────────────────────────────────────────────────────────', type: 'info' },
      { text: '⚡ Active: 4/5 bays filled | Cluster efficiency: 98% (Zero GC interference)', type: 'success' }
    ];

    appendLinesWithDelay(steps);
  };

  const simulateShipCommand = (target: string) => {
    const steps: TerminalLine[] = [
      { text: `🚀 Initializing safe delivery protocol for cargo-container <${target}>:`, type: 'info' },
      { text: `  ├─ Validating static binary checksum for <${target}> (PASS)`, type: 'success' },
      { text: '  ├─ Sealing container filesystem layers in lightweight RAM-disk...', type: 'output' },
      { text: '  ├─ Launching host-socket configuration mapping...', type: 'output' },
      { text: '⚡ Active: Running container supervisor in microservice mode!', type: 'success' },
      { text: `  └─ Port mapping: 0.0.0.0:8089 -> Internal namespace inside <${target}>`, type: 'info' }
    ];

    appendLinesWithDelay(steps);
  };

  const simulateHelpCommand = () => {
    const steps: TerminalLine[] = [
      { text: 'STEVEDORE Community Interactive CLI - Command Schema:', type: 'success' },
      { text: 'Commands:', type: 'info' },
      { text: '  stevedore build           - Trigger Rust compilation + Bun packaging pass', type: 'output' },
      { text: '  stevedore status          - Show active containers, memory, and performance', type: 'output' },
      { text: '  stevedore ship <service>  - Launch container module into vessel cargo layout', type: 'output' },
      { text: '  clear                     - Reset console text output buffer', type: 'output' },
      { text: 'Flags:', type: 'info' },
      { text: '  --all, --lto, --fast      - Optimize linker parameters for maximum compiler performance', type: 'output' }
    ];

    appendLinesWithDelay(steps);
  };

  const simulateUnknownCommand = (cmd: string) => {
    const steps: TerminalLine[] = [
      { text: `stderr: Command '<${cmd}>' not found in cargo-stevedore shell.`, type: 'warning' },
      { text: "Did you mean 'stevedore build' or 'stevedore status'? Type 'stevedore help' to inspect valid CLI routes.", type: 'info' }
    ];

    appendLinesWithDelay(steps);
  };

  const appendLinesWithDelay = (linesToAppend: TerminalLine[]) => {
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      if (currentIdx < linesToAppend.length) {
        setTerminalLines(prev => [...prev, linesToAppend[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommandLogic(inputVal);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5" id="cli-terminal-root">
      
      {/* CLI Section Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
            <Terminal className="w-5 h-5" />
          </span>
          <h3 className="font-sans font-bold text-lg text-slate-800">Rust & Bun CLI Compiler Sandbox</h3>
        </div>
        <p className="text-sm text-slate-500">
          Open Source compilation playground. Interact with the <code className="text-xs bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-700 font-bold">stevedore-cli</code> tool target written in Rust for sub-millisecond container shipping actions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Presets Column (Left 1/4) */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Quick Commands</span>
          <p className="text-xs text-slate-400 leading-relaxed mb-1">
            Trigger these standard cargo routines instantly with one tap to witness compiler throughput benchmarks:
          </p>

          <div className="flex flex-col gap-2">
            {PRESET_COMMANDS.map((p, index) => (
              <button
                key={index}
                disabled={isCompiling}
                onClick={() => runCommandLogic(p.cmd)}
                className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                  isCompiling 
                    ? 'opacity-50 cursor-not-allowed border-slate-100 bg-slate-50'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs active:translate-y-px cursor-pointer text-slate-700'
                }`}
              >
                <div className="font-mono text-xs text-orange-600 font-bold flex items-center justify-between mb-0.5">
                  <code>{p.cmd}</code>
                  <Play className="w-3 h-3 text-orange-500 fill-orange-500/10" />
                </div>
                <div className="text-[10px] text-slate-400 font-normal leading-normal">
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Real Console Window (Right 3/4) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="bg-slate-950 text-slate-300 rounded-2xl border border-slate-900 shadow-md flex flex-col overflow-hidden h-[360px]">
            
            {/* Terminal Window Chrome Title bar */}
            <div className="bg-slate-900 border-b border-slate-800/60 px-4 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono font-medium text-slate-400 ml-2">cli@stevedores-vessel-node-1</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                BUN ENGINE
              </div>
            </div>

            {/* Terminal Text Scrollable Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed space-y-1.5 select-text"
            >
              {terminalLines.map((line, idx) => {
                if (line.type === 'input') {
                  return (
                    <div key={idx} className="flex items-baseline text-slate-100 font-bold">
                      <span className="text-orange-500 font-extrabold mr-2 select-none">$</span>
                      <span>{line.text}</span>
                    </div>
                  );
                }
                
                let textCol = 'text-slate-300';
                if (line.type === 'success') textCol = 'text-emerald-400 font-medium';
                if (line.type === 'warning') textCol = 'text-rose-400 font-medium';
                if (line.type === 'info') textCol = 'text-slate-400';

                return (
                  <div key={idx} className={`${textCol} whitespace-pre-wrap`}>
                    {line.text}
                  </div>
                );
              })}

              {isCompiling && (
                <div className="text-orange-400 flex items-center gap-2 animate-pulse mt-1 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping inline-block" />
                  <span>Executing LTO pipeline...</span>
                </div>
              )}
            </div>

            {/* Console Prompt Input Bar */}
            <div className="bg-slate-900 border-t border-slate-800/80 px-4 py-2 flex items-center gap-2">
              <span className="text-orange-500 font-extrabold select-none">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isCompiling}
                placeholder={isCompiling ? 'Stevedores is compiling binaries...' : 'Type a command, e.g. "stevedore build" or "clear"'}
                className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs h-8 focus:outline-none placeholder-slate-600 disabled:opacity-50"
                id="terminal-input-control"
              />
              <button
                onClick={() => runCommandLogic(inputVal)}
                disabled={isCompiling || !inputVal.trim()}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Execute Command"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
