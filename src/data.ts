import type { Project, Contributor, DockerContainer } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'oxidizedgraph',
    name: 'oxidizedgraph',
    description: 'High-performance async graph execution runtime in Rust. Powering agent workflows with sub-millisecond overhead.',
    longDescription: 'The core runtime engine block. oxidizedgraph is a highly optimized Rust engine built for defining and running complex, state-checkpointed AI agent workflows with parallel execution pipelines, low-resource supervisors, and compile-time correctness.',
    version: 'v0.5.2',
    stars: 845,
    forks: 92,
    openIssues: 12,
    pullRequests: 5,
    languages: [
      { name: 'Rust', percentage: 100, color: '#f35f22' }
    ],
    status: 'deployed',
    perfMetrics: [
      { label: 'Startup Time', value: 3.2, unit: 'ms', subtext: '99th percentile cold start' },
      { label: 'Memory Overhead', value: 0.8, unit: 'MB', subtext: 'Idle memory footprint' },
      { label: 'Step Latency', value: 12, unit: 'μs', subtext: 'Single edge execution' }
    ],
    recentCommits: []
  },
  {
    id: 'aivcs',
    name: 'aivcs',
    description: 'AI-native version control and state snapshot manager for agents. Track code, memory, and environment shifts.',
    longDescription: 'Ensures absolute reproducibility. aivcs acts as a version-controlled database and snapshot framework that captures agent execution graphs, memory histories, and tools versions. Reverts agent states atomically when error states are reached.',
    version: 'v0.2.1',
    stars: 432,
    forks: 31,
    openIssues: 4,
    pullRequests: 2,
    languages: [
      { name: 'Rust', percentage: 94, color: '#f35f22' },
      { name: 'TypeScript', percentage: 6, color: '#3178c6' }
    ],
    status: 'idle',
    perfMetrics: [
      { label: 'Snapshot Speed', value: 1.4, unit: 'ms', subtext: 'Serialization & write' },
      { label: 'Compressed Size', value: 12, unit: 'KB', subtext: 'Average state payload size' },
      { label: 'State Restore', value: 0.9, unit: 'ms', subtext: 'Time to active memory' }
    ],
    recentCommits: []
  },
  {
    id: 'mom',
    name: 'mom',
    description: 'Container orchestrator and cluster manager for sovereign agent deployments. Replaces heavy runtimes.',
    longDescription: 'The sovereign container supervisor. mom parses declarative Nix blueprints to orchestrate bare-metal or VM microservice structures, deploying and scaling OCI containers instantly. Built with Rust to optimize resource usage under dense orchestration.',
    version: 'v0.8.0',
    stars: 712,
    forks: 58,
    openIssues: 8,
    pullRequests: 6,
    languages: [
      { name: 'Rust', percentage: 98, color: '#f35f22' },
      { name: 'Nix', percentage: 2, color: '#7e7eff' }
    ],
    status: 'deployed',
    perfMetrics: [
      { label: 'Deploy Speed', value: 180, unit: 'ms', subtext: 'Nix-to-OCI instantiation' },
      { label: 'Supervisor Ram', value: 2.1, unit: 'MB', subtext: 'Resident memory usage' },
      { label: 'Max Capacity', value: '10k', unit: 'nodes', subtext: 'Tested cluster density' }
    ],
    recentCommits: []
  },
  {
    id: 'local-ci',
    name: 'local-ci',
    description: 'High-speed local-first CI/CD pipeline manager. Run, verify, and package changes within milliseconds.',
    longDescription: 'Brings pipeline checks to local development. local-ci utilizes native Bun routing and Rust task pools to run full test suites, lint, and build stages. Integrates seamlessly with dockworker.toml setups to prevent remote CI pipeline delays.',
    version: 'v1.1.0',
    stars: 219,
    forks: 18,
    openIssues: 3,
    pullRequests: 1,
    languages: [
      { name: 'TypeScript', percentage: 80, color: '#3178c6' },
      { name: 'Rust', percentage: 20, color: '#f35f22' }
    ],
    status: 'deployed',
    perfMetrics: [
      { label: 'Test Runtime', value: 120, unit: 'ms', subtext: 'Unit test suite compile and run' },
      { label: 'Task Spawn', value: 1.8, unit: 'ms', subtext: 'Process initialization overhead' },
      { label: 'Disk Cache Ratio', value: '92%', unit: 'hit', subtext: 'Cargo build artifact recycling' }
    ],
    recentCommits: []
  },
  {
    id: 'oxidizedRAG',
    name: 'oxidizedRAG',
    description: 'Fast, secure retrieval augmented generation engine in Rust. Local vector search, zero python deps.',
    longDescription: 'High-speed search capability. oxidizedRAG implements custom dot-product and cosine-similarity vector queries directly in compiled assembly and Rust, optimized for modern CPUs. Hooks up to SurrealDB or raw memory blocks to feed agent contexts.',
    version: 'v0.3.5',
    stars: 388,
    forks: 24,
    openIssues: 5,
    pullRequests: 3,
    languages: [
      { name: 'Rust', percentage: 100, color: '#f35f22' }
    ],
    status: 'deployed',
    perfMetrics: [
      { label: 'Vector Match', value: 0.15, unit: 'ms', subtext: '1M embeddings scan latency' },
      { label: 'Index Build', value: 4.8, unit: 's', subtext: '100k paragraphs index time' },
      { label: 'RAM Footprint', value: 14.2, unit: 'MB', subtext: 'Idle memory footprint' }
    ],
    recentCommits: []
  },
  {
    id: 'ogre',
    name: 'ogre',
    description: 'Rust-based Graph Engine for agent coordination graphs. High density memory-mapped nodes.',
    longDescription: 'Optimized graph storage. ogre is a specialized memory-mapped database tailored for highly connected multi-agent networks. It avoids SQL translations by processing raw pointers, ensuring microsecond edge traversal times.',
    version: 'v0.4.1',
    stars: 310,
    forks: 19,
    openIssues: 2,
    pullRequests: 2,
    languages: [
      { name: 'Rust', percentage: 100, color: '#f35f22' }
    ],
    status: 'deployed',
    perfMetrics: [
      { label: 'Traversal Speed', value: 8, unit: 'ns', subtext: 'Single hop memory-map access' },
      { label: 'Node Capacity', value: '50M', unit: 'nodes', subtext: 'Maximum memory index capacity' },
      { label: 'Disk Footprint', value: '0.4', unit: 'KB', subtext: 'Average storage per 1000 nodes' }
    ],
    recentCommits: []
  }
];

export const CONTRIBUTORS: Contributor[] = [
  {
    username: 'claude',
    avatar: 'https://avatars.githubusercontent.com/u/81847?v=4',
    commitsCount: 342,
    pullRequestsCount: 84,
    role: 'Core Maintainer',
    location: 'Remote space'
  },
  {
    username: 'principle-lgtm',
    avatar: 'https://avatars.githubusercontent.com/u/246413104?v=4',
    commitsCount: 219,
    pullRequestsCount: 57,
    role: 'Core Maintainer',
    location: 'Remote space'
  },
  {
    username: 'stevei101',
    avatar: 'https://avatars.githubusercontent.com/u/287896?v=4',
    commitsCount: 184,
    pullRequestsCount: 42,
    role: 'Active Contributor',
    location: 'Remote space'
  }
];

export const INITIAL_CONTAINERS: DockerContainer[] = [
  {
    id: 'cont-1',
    label: 'api-gateway',
    service: 'Bun Edge Proxy',
    status: 'running',
    memUsage: 32.4,
    cpuUsage: 1.2,
    size: '11.8 MB',
    port: 8080
  },
  {
    id: 'cont-2',
    label: 'auth-layer',
    service: 'Rust Guard',
    status: 'running',
    memUsage: 8.1,
    cpuUsage: 0.2,
    size: '4.1 MB',
    port: 8081
  },
  {
    id: 'cont-3',
    label: 'session-broker',
    service: 'Rust MemStore',
    status: 'running',
    memUsage: 14.5,
    cpuUsage: 0.4,
    size: '5.2 MB',
    port: 6379
  },
  {
    id: 'cont-4',
    label: 'db-agent',
    service: 'Postgres Connector',
    status: 'stopped',
    memUsage: 0,
    cpuUsage: 0,
    size: '12.4 MB',
    port: 5432
  },
  {
    id: 'cont-5',
    label: 'stats-engine',
    service: 'Rust Rigging Scraper',
    status: 'running',
    memUsage: 4.2,
    cpuUsage: 0.1,
    size: '2.5 MB',
    port: 9090
  }
];
