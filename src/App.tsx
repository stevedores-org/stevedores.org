import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ship, 
  Terminal as TerminalIcon, 
  Layers, 
  Users, 
  Cpu, 
  ExternalLink, 
  Heart, 
  Flame, 
  ArrowUpRight, 
  Code2,
  ArrowLeft
} from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}


// Modular Component Imports
import VesselSimulator from './components/VesselSimulator';
import TerminalPlayground from './components/TerminalPlayground';
import ProjectList from './components/ProjectList';
import ContributorsRank from './components/ContributorsRank';
import TechSpecs from './components/TechSpecs';

type TabId = 'projects' | 'vessel' | 'terminal' | 'contributors' | 'specs';

const getPath = () => window.location.pathname;

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getPath());
  const [activeTab, setActiveTab] = useState<TabId>('projects');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    // Scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    {
      id: 'projects' as TabId,
      label: 'OSS Packages & Metrics',
      desc: 'Explore active repositories of stevedores-org',
      icon: Layers,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-150'
    },
    {
      id: 'vessel' as TabId,
      label: 'SS Stevedore Vessel Console',
      desc: 'Interactive container bay load simulator',
      icon: Ship,
      color: 'text-orange-600 bg-orange-50 border-orange-150'
    },
    {
      id: 'terminal' as TabId,
      label: 'CLI Compiler Sandbox',
      desc: 'Simulate LTO rust compiles & Bun packaging',
      icon: TerminalIcon,
      color: 'text-slate-700 bg-slate-100 border-slate-200'
    },
    {
      id: 'contributors' as TabId,
      label: 'Community Roster',
      desc: 'Leaderboard roster built from organization repos',
      icon: Users,
      color: 'text-sky-600 bg-sky-50 border-sky-150'
    },
    {
      id: 'specs' as TabId,
      label: 'Technical Stack Specs',
      desc: 'Benchmark diagrams comparing Bun + Rust vs GVM',
      icon: Cpu,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-150'
    }
  ];

  // If path is /community, render the dashboard
  if (currentPath === '/community' || currentPath.startsWith('/community')) {
    return (
      <div className="min-h-screen bg-slate-50/40 text-slate-800 antialiased selection:bg-orange-500 selection:text-white pb-12 font-sans" id="app-viewport">
        
        {/* Dynamic Ambient Hero Top Row */}
        <div className="border-b border-slate-200/85 bg-white relative overflow-hidden">
          {/* Visual engineering grid decorative */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0/30_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0/30_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_40%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
            {/* Main Logo & Hub Identifier */}
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => navigate('/', e)} 
                className="p-2.5 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-850 flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors"
                title="Return to Home"
              >
                <Ship className="w-5 h-5 text-orange-400 rotate-12" />
              </button>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => navigate('/', e)}
                    className="text-sm font-sans font-black uppercase tracking-wider text-slate-900 hover:text-orange-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    STEVEDORES.ORG
                  </button>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-mono font-bold px-2 py-0.5 rounded-full border border-slate-200">
                    OSS COMMUNITY HUB
                  </span>
                </div>
                <p className="text-xs text-slate-400">High-Performance Container Operations on Bun & oxidizedgraph Rust runtime</p>
              </div>
            </div>

            {/* Social Indicators and workspace benchmarks */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => navigate('/', e)}
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white text-slate-650 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <a 
                href="https://github.com/stevedores-org" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Org</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              
              <span className="text-xs font-mono font-bold bg-orange-50 text-orange-850 border border-orange-200/50 px-3 py-2 rounded-xl flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 animate-pulse text-orange-600" />
                RUST PIPELINE ACTIVATED
              </span>
            </div>
          </div>
        </div>

        {/* Main Structural Space */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Control Column (1/4 Width) */}
          <div className="lg:col-span-1 flex flex-col gap-6" id="navigation-sidebar">
            {/* Introduction Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">The Mission Goal</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                We replace heavy runtime container management platforms with ultra-optimized Rust cargo builders and Bun HTTP routers. Built on <span className="font-mono text-orange-600 font-semibold">oxidizedgraph</span>. Run compilers, load cargo bays, and inspect live community output.
              </p>
            </div>

            {/* Selector Navigation Menu */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                Dashboard Workspace
              </span>
              <div className="flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const isSelected = activeTab === item.id;
                  const IconComp = item.icon;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all flex gap-3 cursor-pointer items-start relative group ${
                        isSelected
                          ? 'bg-white border-orange-400/80 shadow-md text-slate-900'
                          : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-2xs text-slate-500 hover:text-slate-800'
                      }`}
                      id={`sidebar-tab-${item.id}`}
                    >
                      {/* Visual left colored focal bar when active */}
                      {isSelected && (
                        <div className="absolute top-4 left-0 w-1 h-6 rounded-r bg-orange-500" />
                      )}

                      <span className={`p-2 rounded-xl border shrink-0 transition-all ${
                        isSelected ? item.color : 'text-slate-400 bg-slate-100 border-slate-150'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </span>

                      <div className="min-w-0">
                        <div className={`text-xs font-bold leading-none mb-1 ${
                          isSelected ? 'text-slate-900' : 'text-slate-700'
                        }`}>
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-normal truncate group-hover:text-slate-500">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Newsletter / Community Join Sub-widget */}
            <div className="bg-slate-900 text-slate-100 border border-slate-850 rounded-2xl p-5 relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(243,95,34,0.1),transparent_50%)] opacity-70" />
              
              <div className="relative z-10 flex flex-col gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded">
                    NEWSLETTER DISPATCH
                  </span>
                  <h4 className="font-sans font-bold text-xs mt-2 text-slate-200">System updates & releases</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                    Signups are temporarily paused while migrating to our new dispatch systems. Follow our GitHub releases for active updates!
                  </p>
                </div>

                <a
                  href="https://github.com/stevedores-org"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center p-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer transition-colors text-center decoration-none"
                >
                  Follow on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Feature Panel Workspace (3/4 Width) */}
          <div className="lg:col-span-3 flex flex-col gap-6" id="workspace-main-panel">
            {/* Active component loaded depending on tab */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="outline-none"
              >
                {activeTab === 'projects' && <ProjectList />}
                {activeTab === 'vessel' && <VesselSimulator />}
                {activeTab === 'terminal' && <TerminalPlayground />}
                {activeTab === 'contributors' && <ContributorsRank />}
                {activeTab === 'specs' && <TechSpecs />}
              </motion.div>
            </AnimatePresence>

            {/* Persistent global platform overview indicators */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-505 font-medium">
                ⚡ <span className="font-bold text-slate-800">stevedores.org OSS version 2.4</span> is running with full compatibility. Built with React 19, TypeScript 5, Vite 7, and Tailwind CSS 4.
              </div>
              
              <div className="flex items-center gap-4 text-xs font-mono font-semibold text-slate-500">
                <span className="flex items-center gap-1 text-slate-650">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Community Supported
                </span>
                <span className="text-slate-305">|</span>
                <a 
                  href="https://github.com/stevedores-org" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
                  id="footer-github-link"
                >
                  Join Organization
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render the marketing landing page by default
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Hero */}
      <header className="border-b border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚢</span>
            <span className="font-bold text-xl tracking-tight">stevedores</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/community"
              onClick={(e) => navigate('/community', e)}
              className="text-orange-400 hover:text-orange-355 transition font-semibold"
            >
              Community Dashboard
            </a>
            <a href="https://github.com/stevedores-org" className="text-zinc-400 hover:text-white transition">
              GitHub
            </a>
            <a href="https://github.com/stevedores-org/oxidizedgraph" className="text-zinc-400 hover:text-white transition">
              Docs
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Package AI.<br />
            <span className="text-orange-500">Ship Everywhere.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Open source platform for packaging AI agents into production-ready containers.
            Built on <span className="text-orange-400 font-mono">oxidizedgraph</span> for high-performance orchestration.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/community"
              onClick={(e) => navigate('/community', e)}
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Launch Community Hub
            </a>
            <a
              href="https://github.com/stevedores-org"
              className="border border-zinc-700 hover:border-zinc-550 px-6 py-3 rounded-lg transition text-zinc-300 hover:text-white"
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-zinc-800 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Why Stevedores?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Rust-Powered</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  oxidizedgraph delivers 10x faster startup and 10x less memory than Python alternatives. True multi-core parallelism.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">Container-Native</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Package your AI agents as OCI containers. Deploy anywhere—Kubernetes, Cloud Run, or bare metal.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold mb-2">Graph Orchestration</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Build complex agent workflows with conditional edges, parallel execution, and checkpointing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="border-t border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-4 tracking-tight">Simple. Powerful.</h2>
            <p className="text-zinc-400 text-center mb-10">Define agent graphs in pure Rust</p>
            <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-x-auto text-xs font-mono text-zinc-300">
              <code>{`use oxidizedgraph::prelude::*;

let graph = GraphBuilder::new()
    .add_node(ProcessNode)
    .add_node(LLMNode::new("agent"))
    .add_conditional_edge("agent", |state| {
        if state.is_complete { "END" } else { "process" }
    })
    .compile()?;

let result = GraphRunner::with_defaults(graph)
    .invoke(AgentState::new())
    .await?;`}</code>
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 bg-gradient-to-b from-zinc-900/30 to-zinc-950">
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Join the Community</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Open source. Built by developers, for developers. Explore live metrics and simulations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="/community"
                onClick={(e) => navigate('/community', e)}
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition"
              >
                Go to Community Dashboard
              </a>
              <a
                href="https://github.com/stevedores-org"
                className="inline-flex items-center gap-2 bg-zinc-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-zinc-700 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Stevedores. Open source under Apache-2.0.</p>
        </div>
      </footer>
    </div>
  );
}
