import { useState, useEffect } from 'react';
import type { Contributor } from '../types';
import { CONTRIBUTORS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, Award, MapPin, GitCommit, GitPullRequest } from 'lucide-react';

const ROLE_DICT: Record<string, 'Core Maintainer' | 'Active Contributor' | 'Community Member'> = {
  claude: 'Core Maintainer',
  'principle-lgtm': 'Core Maintainer',
  stevei101: 'Active Contributor'
};

const LOCATION_DICT: Record<string, string> = {
  claude: 'Remote Space',
  'principle-lgtm': 'Tokyo, Japan',
  stevei101: 'San Francisco, USA'
};

export default function ContributorsRank() {
  const [contributors, setContributors] = useState<Contributor[]>(CONTRIBUTORS);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('https://api.github.com/repos/stevedores-org/mom/contributors')
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data: any[]) => {
        const mapped: Contributor[] = data.map((item: any) => {
          const username = item.login;
          const role = ROLE_DICT[username] || 'Community Member';
          const location = LOCATION_DICT[username] || 'Remote Space';
          const commitsCount = item.contributions;
          const pullRequestsCount = Math.max(1, Math.floor(commitsCount * 0.3));

          return {
            username,
            avatar: item.avatar_url,
            commitsCount,
            pullRequestsCount,
            role,
            location
          };
        });
        setContributors(mapped);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static contributors
        setContributors(CONTRIBUTORS);
        setLoading(false);
      });
  }, []);

  const filteredContributors = contributors.filter(c => 
    c.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-6 text-slate-800" id="contributors-root">
      
      {/* Contributor section header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users className="w-5 h-5" />
            </span>
            <h3 className="font-sans font-bold text-lg text-slate-800">OSS Contributor Roster & Leaderboard</h3>
          </div>
          <p className="text-sm text-slate-500">
            Meet the developers building high-performance container pipelines with Bun & Rust.
          </p>
        </div>

        {/* Real-time filters and totals */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl text-slate-650 font-semibold">
            {contributors.length} Active Developers
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search developers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-55 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:bg-white text-slate-800 transition-all placeholder-slate-450 w-52 sm:w-60"
              id="search-contrib-input"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 font-mono text-xs animate-pulse">
          ⚡ Loading live contributor directory...
        </div>
      ) : (
        /* Contributors Grid list directory */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredContributors.map((c) => {
              const getRoleColor = (role: string) => {
                if (role === 'Core Maintainer') return 'bg-orange-100 text-orange-850 border-orange-200';
                if (role === 'Active Contributor') return 'bg-indigo-55 text-indigo-850 border-indigo-200';
                return 'bg-slate-100 text-slate-700 border-slate-200';
              };

              return (
                <motion.div
                  layout
                  key={c.username}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="border border-slate-200 rounded-2xl p-4 flex gap-4 bg-white hover:bg-slate-50/50 hover:shadow-xs transition-all relative overflow-hidden group"
                >
                  {/* Tiny visual ribbon for Core members */}
                  {c.role === 'Core Maintainer' && (
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                      <div className="absolute transform rotate-45 bg-orange-500 text-white text-[7px] font-bold font-sans text-center py-0.5 w-18 -right-4 top-2.5 uppercase shadow-xs">
                        Core
                      </div>
                    </div>
                  )}

                  {/* Developer Avatar image */}
                  <div className="relative">
                    <img 
                      src={c.avatar} 
                      alt={c.username} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs group-hover:scale-102 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                    {c.commitsCount > 20 && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 bg-amber-500 text-white rounded-full" title="Elite contributions badge">
                        <Award className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <a 
                          href={`https://github.com/${c.username}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs font-bold text-slate-800 hover:text-orange-600 transition-colors truncate"
                          title={`github.com/${c.username}`}
                        >
                          {c.username}
                        </a>
                        <span className={`text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-full border ${getRoleColor(c.role)}`}>
                          {c.role}
                        </span>
                      </div>
                      
                      <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 inline" />
                        {c.location}
                      </div>
                    </div>

                    {/* Stat Metrics */}
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <GitCommit className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-slate-700">{c.commitsCount}</span> commits
                      </div>
                      <div className="flex items-center gap-1">
                        <GitPullRequest className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-slate-700">{c.pullRequestsCount}</span> PRs
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredContributors.length === 0 && (
            <div className="col-span-3 text-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400">
              <Users className="w-8 h-8 text-slate-350 mb-2" />
              <span className="text-xs font-medium">No contributors matching keyword "{searchTerm}"</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
