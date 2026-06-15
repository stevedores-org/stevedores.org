export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  version: string;
  stars: number;
  forks: number;
  openIssues: number;
  pullRequests: number;
  languages: { name: string; percentage: number; color: string }[];
  status: 'idle' | 'building' | 'deployed' | 'error';
  perfMetrics: {
    label: string;
    value: string | number;
    unit: string;
    subtext: string;
  }[];
  recentCommits: Commit[];
}

export interface Commit {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  message: string;
  timestamp: string;
  hash: string;
}

export interface Contributor {
  username: string;
  avatar: string;
  commitsCount: number;
  pullRequestsCount: number;
  role: 'Core Maintainer' | 'Active Contributor' | 'Community Member';
  location: string;
}

export interface DockerContainer {
  id: string;
  label: string;
  service: string;
  status: 'running' | 'deploying' | 'stopped' | 'failed';
  memUsage: number; // in MB
  cpuUsage: number; // in percentage
  size: string; // e.g. "4.2 MB"
  port: number;
}
