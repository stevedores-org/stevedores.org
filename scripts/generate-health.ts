import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const publicDir = join(__dirname, '../public');
mkdirSync(publicDir, { recursive: true });

let commitSha = process.env.COMMIT_SHA || process.env.GITHUB_SHA;
if (!commitSha) {
  try {
    commitSha = execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    commitSha = 'unknown';
  }
}

const buildTime = new Date().toISOString();

const content = `ok
build: ${commitSha}
built: ${buildTime}
`;

writeFileSync(join(publicDir, 'health'), content, 'utf8');
console.log(`Generated public/health with build ${commitSha} at ${buildTime}`);
