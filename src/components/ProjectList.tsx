import { useState, useEffect } from 'react';
import type { Project, Commit } from '../types';
import { INITIAL_PROJECTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, GitFork, Star, GitPullRequest, Play } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}


const METADATA_DICT: Record<string, {
  longDescription: string;
  version: string;
  perfMetrics: { label: string; value: string | number; unit: string; subtext: string }[];
  recentCommits: Commit[];
}> = {
  oxidizedgraph: {
    longDescription: 'The core runtime engine block. oxidizedgraph is a highly optimized Rust engine built for defining and running complex, state-checkpointed AI agent workflows with parallel execution pipelines, low-resource supervisors, and compile-time correctness.',
    version: 'v0.5.2',
    perfMetrics: [
      { label: 'Startup Time', value: 3.2, unit: 'ms', subtext: '99th percentile cold start' },
      { label: 'Memory Overhead', value: 0.8, unit: 'MB', subtext: 'Idle memory footprint' },
      { label: 'Step Latency', value: 12, unit: 'μs', subtext: 'Single edge execution' }
    ],
    recentCommits: [
      {
        id: 'c1',
        author: { name: 'claude', username: 'claude', avatar: 'https://avatars.githubusercontent.com/u/81847?v=4' },
        message: 'feat: optimize async epoll context switches for Linux kernel v6.2+',
        timestamp: '2 hours ago',
        hash: '7a04f2e'
      },
      {
        id: 'c2',
        author: { name: 'stevei101', username: 'stevei101', avatar: 'https://avatars.githubusercontent.com/u/287896?v=4' },
        message: 'fix: align multi-core task scheduling with CPU cache residency limits',
        timestamp: '1 day ago',
        hash: 'b5e1903'
      }
    ]
  },
  aivcs: {
    longDescription: 'Ensures absolute reproducibility. aivcs acts as a version-controlled database and snapshot framework that captures agent execution graphs, memory histories, and tools versions. Reverts agent states atomically when error states are reached.',
    version: 'v0.2.1',
    perfMetrics: [
      { label: 'Snapshot Speed', value: 1.4, unit: 'ms', subtext: 'Serialization & write' },
      { label: 'Compressed Size', value: 12, unit: 'KB', subtext: 'Average state payload size' },
      { label: 'State Restore', value: 0.9, unit: 'ms', subtext: 'Time to active memory' }
    ],
    recentCommits: [
      {
        id: 'c3',
        author: { name: 'principle-lgtm', username: 'principle-lgtm', avatar: 'https://avatars.githubusercontent.com/u/246413104?v=4' },
        message: 'refactor: direct binary ingestion into tar archive structures without local disk buffering',
        timestamp: '5 hours ago',
        hash: 'd3f2c51'
      }
    ]
  },
  mom: {
    longDescription: 'The sovereign container supervisor. mom parses declarative Nix blueprints to orchestrate bare-metal or VM microservice structures, deploying and scaling OCI containers instantly. Built with Rust to optimize resource usage under dense orchestration.',
    version: 'v0.8.0',
    perfMetrics: [
      { label: 'Deploy Speed', value: 180, unit: 'ms', subtext: 'Nix-to-OCI instantiation' },
      { label: 'Supervisor Ram', value: 2.1, unit: 'MB', subtext: 'Resident memory usage' },
      { label: 'Max Capacity', value: '10k', unit: 'nodes', subtext: 'Tested cluster density' }
    ],
    recentCommits: [
      {
        id: 'c4',
        author: { name: 'claude', username: 'claude', avatar: 'https://avatars.githubusercontent.com/u/81847?v=4' },
        message: 'perf: utilize Bun.serve native arraybuffer streaming to reduce V8 garbage sweeps',
        timestamp: '3 days ago',
        hash: '2c9e782'
      }
    ]
  },
  'local-ci': {
    longDescription: 'Brings pipeline checks to local development. local-ci utilizes native Bun routing and Rust task pools to run full test suites, lint, and build stages. Integrates seamlessly with dockworker.toml setups to prevent remote CI pipeline delays.',
    version: 'v1.1.0',
    perfMetrics: [
      { label: 'Test Runtime', value: 120, unit: 'ms', subtext: 'Unit test suite compile and run' },
      { label: 'Task Spawn', value: 1.8, unit: 'ms', subtext: 'Process initialization overhead' },
      { label: 'Disk Cache Ratio', value: '92%', unit: 'hit', subtext: 'Cargo build artifact recycling' }
    ],
    recentCommits: [
      {
        id: 'c5',
        author: { name: 'stevei101', username: 'stevei101', avatar: 'https://avatars.githubusercontent.com/u/287896?v=4' },
        message: 'feat: add raw epoll connection tracking to map network topologies in real-time',
        timestamp: '1 week ago',
        hash: 'a90e312'
      }
    ]
  },
  oxidizedRAG: {
    longDescription: 'High-speed search capability. oxidizedRAG implements custom dot-product and cosine-similarity vector queries directly in compiled assembly and Rust, optimized for modern CPUs. Hooks up to SurrealDB or raw memory blocks to feed agent contexts.',
    version: 'v0.3.5',
    perfMetrics: [
      { label: 'Vector Match', value: 0.15, unit: 'ms', subtext: '1M embeddings scan latency' },
      { label: 'Index Build', value: 4.8, unit: 's', subtext: '100k paragraphs index time' },
      { label: 'RAM Footprint', value: 14.2, unit: 'MB', subtext: 'Idle memory footprint' }
    ],
    recentCommits: [
      {
        id: 'c6',
        author: { name: 'principle-lgtm', username: 'principle-lgtm', avatar: 'https://avatars.githubusercontent.com/u/246413104?v=4' },
        message: 'style: revamp layout nodes according to industrial terminal blueprints',
        timestamp: '4 days ago',
        hash: '12ef4b4'
      }
    ]
  },
  ogre: {
    longDescription: 'Optimized graph storage. ogre is a specialized memory-mapped database tailored for highly connected multi-agent networks. It avoids SQL translations by processing raw pointers, ensuring microsecond edge traversal times.',
    version: 'v0.4.1',
    perfMetrics: [
      { label: 'Traversal Speed', value: 8, unit: 'ns', subtext: 'Single hop memory-map access' },
      { label: 'Node Capacity', value: '50M', unit: 'nodes', subtext: 'Maximum memory index capacity' },
      { label: 'Disk Footprint', value: '0.4', unit: 'KB', subtext: 'Average storage per 1000 nodes' }
    ],
    recentCommits: [
      {
        id: 'c7',
        author: { name: 'claude', username: 'claude', avatar: 'https://avatars.githubusercontent.com/u/81847?v=4' },
        message: 'feat: add memory-mapped graph traversal indexes',
        timestamp: '5 days ago',
        hash: '3d9e8c1'
      }
    ]
  }
};

const getLanguageColor = (lang: string): string => {
  switch (lang.toLowerCase()) {
    case 'rust': return '#f35f22';
    case 'typescript': return '#3178c6';
    case 'javascript': return '#f1e05a';
    case 'nix': return '#7e7eff';
    case 'shell': return '#89e051';
    case 'swift': return '#f05138';
    case 'assembly': return '#10b981';
    default: return '#9ca3af';
  }
};

const DEFAULT_METRICS = [
  { label: 'Startup Time', value: '4.8', unit: 'ms', subtext: '99th percentile cold start' },
  { label: 'Memory Overhead', value: '1.2', unit: 'MB', subtext: 'Idle memory footprint' },
  { label: 'Network Throughput', value: '45k', unit: 'req/s', subtext: 'Single-node proxy' }
];

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [activeCompareId, setActiveCompareId] = useState<string | null>(null);
  
  // Compiler Modal Simulation State
  const [compilingProject, setCompilingProject] = useState<Project | null>(null);
  const [compileLogs, setCompileLogs] = useState<string[]>([]);
  const [compileProgress, setCompileProgress] = useState<number>(0);
  const [compileStatus, setCompileStatus] = useState<'idle' | 'running' | 'success'>('idle');

  // Load from GitHub API
  useEffect(() => {
    fetch('https://api.github.com/orgs/stevedores-org/repos')
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data: any[]) => {
        // Map dynamic response with our metadata mappings
        const mapped = data.map((repo: any) => {
          const name = repo.name;
          const meta = METADATA_DICT[name] || {
            longDescription: repo.description || 'No extended architecture summary available.',
            version: 'v1.0.0',
            perfMetrics: DEFAULT_METRICS,
            recentCommits: []
          };

          const primaryLang = repo.language || 'Rust';
          const languages = [
            { name: primaryLang, percentage: 100, color: getLanguageColor(primaryLang) }
          ];

          return {
            id: repo.name,
            name: repo.name,
            description: repo.description || 'No description provided.',
            longDescription: meta.longDescription,
            version: meta.version,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            pullRequests: Math.max(1, Math.floor(repo.open_issues_count * 0.4)),
            languages,
            status: 'deployed' as const,
            perfMetrics: meta.perfMetrics,
            recentCommits: meta.recentCommits
          };
        });

        // Sort to prioritize our active core repos first, then the rest
        const order = ['oxidizedgraph', 'aivcs', 'mom', 'local-ci', 'oxidizedRAG', 'ogre'];
        mapped.sort((a, b) => {
          const indexA = order.indexOf(a.name);
          const indexB = order.indexOf(b.name);
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return b.stars - a.stars;
        });

        setProjects(mapped);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to initial static data
        setProjects(INITIAL_PROJECTS);
        setLoading(false);
      });
  }, []);

  const triggerCompileSimulation = (p: Project) => {
    setCompilingProject(p);
    setCompileStatus('running');
    setCompileProgress(0);
    setCompileLogs([
      `[BUN CLUSTER RUNTIME LOGS] Initiating compilation pipeline for repository: ${p.name}@${p.version}...`,
      `[1/4] Scanning Cargo workspaces for target binaries...`
    ]);

    const logsList = [
      `[2/4] Parsing Rust AST blocks... optimized macro expansion complete.`,
      `[3/4] Packaging static glibc dependencies with Cargo Linker... Link-Time-Optimization activated.`,
      `[4/4] Transpiling TS routes in Bun dynamic bundler (V8 JIT compilation)...`,
      `[METRIC OUT] Size compressed from 14.8MB down to raw microservice payload format (${p.perfMetrics[1]?.value || '1.8'} ${p.perfMetrics[1]?.unit || 'MB'})`,
      `🚀 Build fully packaged inside container sandbox with sub-millisecond local routing initialization!`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setCompileProgress(prev => {
        const next = Math.min(prev + 20, 100);
        
        if (next < 100 && currentLogIndex < logsList.length) {
          setCompileLogs(curr => [...curr, logsList[currentLogIndex]]);
          currentLogIndex++;
        }
        
        if (next === 100) {
          clearInterval(interval);
          setCompileStatus('success');
          setCompileLogs(curr => [...curr, `✨ SUCCESS: Released and configured local container cluster! Ready to deploy.`]);
        }
        return next;
      });
    }, 450);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedLang === 'All') return matchesSearch;
    return matchesSearch && p.languages.some(l => l.name === selectedLang);
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-6 font-sans text-slate-800" id="projects-directory-root">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-sans font-bold text-lg text-slate-800">OSS Repositories & Performance Matrices</h3>
          <p className="text-sm text-slate-500">
            Compare repository characteristics and compile our high-performance modular libraries directly.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Languages filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['All', 'Rust', 'TypeScript'].map(language => (
              <button
                key={language}
                onClick={() => setSelectedLang(language)}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                  selectedLang === language
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {language}
              </button>
            ))}
          </div>

          {/* Search box overlay */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-4 py-2 bg-slate-55 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:bg-white text-slate-800 transition-all placeholder-slate-400"
              id="search-packages-input"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 font-mono text-xs animate-pulse">
          ⚡ Loading live GitHub repository metrics...
        </div>
      ) : (
        /* Grid of Repository Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((proj) => {
            const isComparing = activeCompareId === proj.id;
            
            return (
              <div 
                key={proj.id}
                className="border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50/40 rounded-2xl p-5 flex flex-col gap-4 focus-within:ring-1 focus-within:ring-orange-500/30 transition-all shadow-xs"
                id={`project-card-${proj.id}`}
              >
                {/* Card core name and tags */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold text-slate-800 hover:text-orange-600 transition-colors">
                        {proj.name}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded-full border border-slate-200">
                        {proj.version}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed md:max-w-md">
                      {proj.description}
                    </p>
                  </div>

                  {/* Git quick action buttons */}
                  <div className="flex items-center gap-1.5">
                    <a 
                      href={`https://github.com/stevedores-org/${proj.name}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Jump to GitHub source code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Dynamic Languages gauge bar representation */}
                <div className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full flex overflow-hidden">
                    {proj.languages.map((lang, index) => (
                      <div 
                        key={index} 
                        style={{ 
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color 
                        }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                    {proj.languages.map((lang, index) => (
                      <span key={index} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: lang.color }} />
                        {lang.name} ({lang.percentage}%)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sub-Performance Benchmark metrics grids */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50/80 border border-slate-100 rounded-xl p-3">
                  {proj.perfMetrics.map((met, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">
                        {met.label}
                      </span>
                      <span className="text-sm font-mono font-bold text-slate-800 flex items-baseline gap-0.5">
                        {met.value} 
                        <span className="text-[10px] font-normal text-slate-400 font-sans">{met.unit}</span>
                      </span>
                      <span className="text-[9px] text-slate-500 truncate leading-snug">
                        {met.subtext}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons and expands */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between mt-auto">
                  {/* Stats icons */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1" title="Stars rating">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {proj.stars}
                    </span>
                    <span className="flex items-center gap-1" title="Total Forks">
                      <GitFork className="w-3.5 h-3.5 text-indigo-500" />
                      {proj.forks}
                    </span>
                    <span className="flex items-center gap-1" title="Open pull requests">
                      <GitPullRequest className="w-3.5 h-3.5 text-emerald-500" />
                      {proj.pullRequests}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCompareId(isComparing ? null : proj.id)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer bg-white transition-all shadow-2xs hover:shadow-2xs active:translate-y-px"
                      id={`btn-expand-${proj.id}`}
                    >
                      {isComparing ? 'Close Specs' : 'Technical Specs'}
                    </button>
                    <button
                      onClick={() => triggerCompileSimulation(proj)}
                      className="flex items-center gap-1 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg cursor-pointer transition-all active:translate-y-px shadow-sm animate-none"
                      id={`btn-compile-${proj.id}`}
                    >
                      <Play className="w-3 h-3 fill-white" />
                      Compile
                    </button>
                  </div>
                </div>

                {/* Explanded specs panel */}
                <AnimatePresence>
                  {isComparing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-slate-100 pt-3"
                    >
                      <div className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        <div className="font-semibold text-slate-800 mb-1">Architecture Summary:</div>
                        <p className="leading-relaxed mb-3 text-slate-500 text-slate-600">{proj.longDescription}</p>

                        {proj.recentCommits && proj.recentCommits.length > 0 && (
                          <>
                            <div className="font-semibold text-slate-800 mb-2">Recent Git Commit Outlets:</div>
                            <div className="space-y-2 border-l-2 border-orange-500/30 pl-3">
                              {proj.recentCommits.map(c => (
                                <div key={c.id}>
                                  <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                                    <img src={c.author.avatar} alt="avatar" className="w-4 h-4 rounded-full inline" />
                                    <span className="font-bold">{c.author.name}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">@{c.author.username}</span>
                                    <span className="text-[9px] text-slate-400 font-mono bg-slate-100 border border-slate-200 px-1 rounded-sm ml-auto">{c.hash}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-550 pl-5 leading-normal mt-0.5 italic">{c.message}</div>
                                  <div className="text-[9px] text-slate-400 pl-5">{c.timestamp}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Compiler Simulation Modal popup overlay */}
      <AnimatePresence>
        {compilingProject && (
          <div className="fixed inset-0 bg-slate-900/65 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-950 text-slate-100 border border-slate-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[380px]"
            >
              {/* Modal Chrome Header */}
              <div className="bg-slate-900 hover:bg-slate-900/80 border-b border-slate-800 px-5 py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Rust & Bun Pipeline Compiling Agent</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Target: {compilingProject.name}@vessel-packager</p>
                </div>
                {compileStatus === 'success' && (
                  <button 
                    onClick={() => setCompilingProject(null)}
                    className="text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all border-none"
                  >
                    Close Terminal
                  </button>
                )}
              </div>

              {/* Modal Body Logging panel */}
              <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2 select-text text-slate-350">
                {compileLogs.map((log, index) => (
                  <div key={index} className={index === compileLogs.length - 1 ? "text-orange-400 font-bold" : ""}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Progress Slider representation at footer */}
              <div className="bg-slate-900 border-t border-slate-800/80 p-4 flex items-center justify-between gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-medium text-slate-400">
                    <span>Task progress</span>
                    <span>{compileProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${compileProgress}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] font-mono bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 px-2 py-1 rounded">
                  {compileStatus === 'running' ? 'COMPILING' : 'RELEASED READY'}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
