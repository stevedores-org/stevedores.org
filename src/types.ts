export interface Language {
  name: string;
  percentage: number;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  /** Optional — only set when a real release/tag is known. Never fabricated. */
  version?: string;
  stars: number;
  forks: number;
  openIssues: number;
  pullRequests: number;
  languages: Language[];
  status: 'idle' | 'building' | 'deployed' | 'error';
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
