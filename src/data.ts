import type { Contributor, DockerContainer } from './types';

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
