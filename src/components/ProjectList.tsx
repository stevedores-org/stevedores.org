import { useState, useEffect } from 'react';
import type { Project, Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, GitFork, Star, GitPullRequest, Play } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Live GitHub data ────────────────────────────────────────────────────────
// All repository stats on this page come straight from the GitHub REST API for
// the stevedores-org org. No invented stars/forks/benchmarks (see issue #19).

const ORG = 'stevedores-org';
const CACHE_KEY = 'stevedores:projects:v1';
const CACHE_TTL_MS = 5 * 60 * 1000; // stay within unauthenticated rate limits

// Pin our core repos to the front; everything else falls back to star order.
const PRIORITY_ORDER = ['oxidizedgraph', 'aivcs', 'mom', 'local-ci', 'oxidizedRAG', 'ogre'];

interface CacheEntry {
  ts: number;
  projects: Project[];
}

const getLanguageColor = (lang: string): string => {
  switch (lang.toLowerCase()) {
    case 'rust': return '#f35f22';
    case 'typescript': return '#3178c6';
    case 'javascript': return '#f1e05a';
    case 'nix': return '#7e7eff';
    case 'shell': return '#89e051';
    case 'swift': return '#f05138';
    case 'assembly': return '#10b981';
    case 'python': return '#3572A5';
    case 'go': return '#00ADD8';
    case 'html': return '#e34c26';
    case 'css': return '#563d7c';
    case 'dockerfile': return '#384d54';
    default: return '#9ca3af';
  }
};

function readCache(allowStale: boolean): Project[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!allowStale && Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return Array.isArray(entry.projects) ? entry.projects : null;
  } catch {
    return null;
  }
}

function writeCache(projects: Project[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), projects } satisfies CacheEntry));
  } catch {
    /* sessionStorage unavailable or over quota — non-fatal */
  }
}

function ghFetch(url: string): Promise<Response> {
  return fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
}

// Real language breakdown by bytes for one repo.
async function fetchLanguages(languagesUrl: string): Promise<Language[]> {
  try {
    const res = await ghFetch(languagesUrl);
    if (!res.ok) return [];
    const bytes = (await res.json()) as Record<string, number>;
    const total = Object.values(bytes).reduce((a, b) => a + b, 0);
    if (total === 0) return [];
    const ranked = Object.entries(bytes)
      .map(([name, b]) => ({ name, percentage: Math.round((b / total) * 100), color: getLanguageColor(name) }))
      .sort((a, b) => b.percentage - a.percentage);
    // Drop the long tail of languages that round to 0% so the legend stays
    // readable, but always keep at least the dominant language.
    const significant = ranked.filter((l) => l.percentage >= 1);
    return significant.length > 0 ? significant : ranked.slice(0, 1);
  } catch {
    return [];
  }
}

// Real open-PR count. GitHub's `open_issues_count` lumps issues + PRs together,
// so we fetch the open PRs to both report PRs and back out the true issue count.
// Returns null when the call fails (e.g. rate-limited) so the caller can degrade.
async function fetchOpenPrCount(fullName: string): Promise<number | null> {
  try {
    const res = await ghFetch(`https://api.github.com/repos/${fullName}/pulls?state=open&per_page=100`);
    if (!res.ok) return null;
    const prs = await res.json();
    return Array.isArray(prs) ? prs.length : null;
  } catch {
    return null;
  }
}

interface GithubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  fork: boolean;
  private: boolean;
}

async function mapRepo(repo: GithubRepo): Promise<Project> {
  const [languages, prCount] = await Promise.all([
    fetchLanguages(repo.languages_url),
    fetchOpenPrCount(repo.full_name),
  ]);

  const pullRequests = prCount ?? 0;
  const openIssues = prCount === null
    ? repo.open_issues_count
    : Math.max(0, repo.open_issues_count - prCount);

  const resolvedLangs: Language[] = languages.length > 0
    ? languages
    : repo.language
      ? [{ name: repo.language, percentage: 100, color: getLanguageColor(repo.language) }]
      : [];

  return {
    id: repo.name,
    name: repo.name,
    description: repo.description || 'No description provided.',
    longDescription: repo.description || 'No extended summary is published for this repository yet.',
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    openIssues,
    pullRequests,
    languages: resolvedLangs,
    status: repo.archived ? 'idle' : 'deployed',
  };
}

async function loadProjects(): Promise<Project[]> {
  const res = await ghFetch(`https://api.github.com/orgs/${ORG}/repos?type=public&sort=updated&per_page=100`);
  if (!res.ok) {
    throw new Error(res.status === 403 || res.status === 429 ? 'rate-limited' : `github-error-${res.status}`);
  }
  const repos = ((await res.json()) as GithubRepo[]).filter((r) => !r.fork && !r.private);
  const projects = await Promise.all(repos.map(mapRepo));

  projects.sort((a, b) => {
    const ia = PRIORITY_ORDER.indexOf(a.name);
    const ib = PRIORITY_ORDER.indexOf(b.name);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return b.stars - a.stars;
  });
  return projects;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>(() => readCache(false) ?? []);
  const [loading, setLoading] = useState<boolean>(() => readCache(false) === null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [activeCompareId, setActiveCompareId] = useState<string | null>(null);

  // Compiler Modal Simulation State
  const [compilingProject, setCompilingProject] = useState<Project | null>(null);
  const [compileLogs, setCompileLogs] = useState<string[]>([]);
  const [compileProgress, setCompileProgress] = useState<number>(0);
  const [compileStatus, setCompileStatus] = useState<'idle' | 'running' | 'success'>('idle');

  // Load live repository data from GitHub, with a 5-minute sessionStorage cache.
  useEffect(() => {
    const fresh = readCache(false);
    if (fresh) {
      setProjects(fresh);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    loadProjects()
      .then((list) => {
        if (cancelled) return;
        setProjects(list);
        writeCache(list);
        setError(null);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        // Degrade gracefully: prefer a stale cache over an error or fictional data.
        const stale = readCache(true);
        if (stale && stale.length > 0) {
          setProjects(stale);
          setError(null);
          return;
        }
        const rateLimited = e instanceof Error && e.message === 'rate-limited';
        setError(
          rateLimited
            ? 'GitHub API rate limit reached — live repository metrics will be available again shortly.'
            : 'Could not load live repository data from GitHub right now.'
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const triggerCompileSimulation = (p: Project) => {
    setCompilingProject(p);
    setCompileStatus('running');
    setCompileProgress(0);
    setCompileLogs([
      `[BUN CLUSTER RUNTIME LOGS] Initiating compilation pipeline for repository: ${p.name}@${p.version ?? 'latest'}...`,
      `[1/4] Scanning Cargo workspaces for target binaries...`
    ]);

    const logsList = [
      `[2/4] Parsing Rust AST blocks... optimized macro expansion complete.`,
      `[3/4] Packaging static glibc dependencies with Cargo Linker... Link-Time-Optimization activated.`,
      `[4/4] Transpiling TS routes in Bun dynamic bundler (V8 JIT compilation)...`,
      `[LINK OUT] Static musl binary linked and stripped; container payload sealed.`,
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
          <h3 className="font-sans font-bold text-lg text-slate-800">OSS Repositories</h3>
          <p className="text-sm text-slate-500">
            Live stars, forks, issues and language mix pulled straight from GitHub for the stevedores-org org.
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
        /* Loading skeleton — placeholder cards while live data is fetched */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-busy="true" aria-label="Loading repositories">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-slate-200 bg-white rounded-2xl p-5 flex flex-col gap-4 animate-pulse" aria-hidden="true">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-full bg-slate-100 rounded mb-1.5" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded" />
                </div>
                <div className="w-7 h-7 bg-slate-100 rounded-lg" />
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full" />
              <div className="border-t border-slate-100 pt-3 flex items-center gap-4">
                <div className="h-3 w-10 bg-slate-100 rounded" />
                <div className="h-3 w-10 bg-slate-100 rounded" />
                <div className="h-3 w-10 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error && filteredProjects.length === 0 ? (
        /* Graceful degradation when GitHub is unavailable / rate-limiting */
        <div className="text-center py-12 px-6">
          <p className="text-sm text-slate-500 font-medium">{error}</p>
          <p className="text-xs text-slate-400 mt-1 font-mono">Source: api.github.com/orgs/stevedores-org/repos</p>
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
                      {proj.version && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded-full border border-slate-200">
                          {proj.version}
                        </span>
                      )}
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
                {proj.languages.length > 0 && (
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
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500">
                      {proj.languages.map((lang, index) => (
                        <span key={index} className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: lang.color }} />
                          {lang.name} ({lang.percentage}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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
                        <p className="leading-relaxed mb-1 text-slate-600">{proj.longDescription}</p>

                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                          <span title="Open issues (excludes pull requests)">Open issues: <span className="text-slate-700 font-semibold">{proj.openIssues}</span></span>
                          <span title="Open pull requests">Open PRs: <span className="text-slate-700 font-semibold">{proj.pullRequests}</span></span>
                        </div>
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
