/**
 * Stevedores.org - AI Agent Packaging Platform
 *
 * Control plane UI for managing cloud-native AI agents.
 * Built with Bun + Hono + Rust/WASM
 */

import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Static assets
app.use("/static/*", serveStatic({ root: "./" }));

// Landing page
app.get("/", (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stevedores - AI Agent Packaging Platform</title>
  <style>
    :root {
      --bg: #0a0a0a;
      --fg: #fafafa;
      --accent: #ff9f1c;
      --accent-dim: #cc7f16;
      --surface: #1a1a1a;
      --border: #333;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--fg);
      line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

    /* Header */
    header {
      border-bottom: 1px solid var(--border);
      padding: 1rem 0;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--accent);
      text-decoration: none;
    }
    .nav-links a {
      color: var(--fg);
      text-decoration: none;
      margin-left: 2rem;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .nav-links a:hover { opacity: 1; }

    /* Hero */
    .hero {
      padding: 6rem 0;
      text-align: center;
    }
    .hero h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--fg), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      font-size: 1.25rem;
      opacity: 0.8;
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary {
      background: var(--accent);
      color: var(--bg);
    }
    .btn-secondary {
      background: var(--surface);
      color: var(--fg);
      border: 1px solid var(--border);
    }

    /* Features */
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 4rem 0;
    }
    .feature {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
    }
    .feature-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .feature h3 {
      color: var(--accent);
      margin-bottom: 0.5rem;
    }

    /* Architecture */
    .architecture {
      padding: 4rem 0;
      text-align: center;
    }
    .architecture h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    .arch-diagram {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      font-family: monospace;
      text-align: left;
      overflow-x: auto;
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 2rem 0;
      text-align: center;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <a href="/" class="logo">⚓ Stevedores</a>
      <div class="nav-links">
        <a href="/docs">Docs</a>
        <a href="/packages">Packages</a>
        <a href="/dashboard">Dashboard</a>
        <a href="https://github.com/stevedores-org">GitHub</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero container">
      <h1>AI Agent Packaging Platform</h1>
      <p>
        Package, deploy, and orchestrate AI agents as cloud-native workloads.
        Built with Rust performance, GraphQL flexibility, and Nix reproducibility.
      </p>
      <div class="cta-buttons">
        <a href="/docs/quickstart" class="btn btn-primary">Get Started</a>
        <a href="https://github.com/stevedores-org" class="btn btn-secondary">View on GitHub</a>
      </div>
    </section>

    <section class="features container">
      <div class="feature">
        <div class="feature-icon">🦀</div>
        <h3>Rust-Powered</h3>
        <p>High-performance Agent Manager Service built with Tokio and async-graphql for maximum throughput.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">📊</div>
        <h3>GraphQL API</h3>
        <p>Declarative API for managing agent packages, deployments, and real-time status via subscriptions.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">☸️</div>
        <h3>Cloud-Native</h3>
        <p>Deploy agents as K8s workloads with automatic scaling, self-healing, and resource isolation.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">❄️</div>
        <h3>Reproducible</h3>
        <p>Nix Flakes ensure hermetic builds from development to production OCI images.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🗄️</div>
        <h3>SurrealDB</h3>
        <p>Multi-model database for agent metadata, state, and inter-agent interaction graphs.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔧</div>
        <h3>Tool Execution</h3>
        <p>Sandboxed K8s Jobs for secure tool execution with full audit trails.</p>
      </div>
    </section>

    <section class="architecture container">
      <h2>Architecture Overview</h2>
      <pre class="arch-diagram">
┌─────────────────────────────────────────────────────────────────────┐
│                        Stevedores Platform                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    GraphQL     ┌──────────────────────────────┐   │
│  │   Web UI    │◄──────────────►│  Agent Manager Service       │   │
│  │  (Bun/TS)   │                │  (Rust + async-graphql)      │   │
│  └─────────────┘                └──────────────┬───────────────┘   │
│                                                │                    │
│                         ┌──────────────────────┼──────────────────┐ │
│                         │                      │                  │ │
│                         ▼                      ▼                  │ │
│              ┌──────────────────┐    ┌─────────────────┐          │ │
│              │    SurrealDB     │    │   Kubernetes    │          │ │
│              │  (State + Graph) │    │   (Workloads)   │          │ │
│              └──────────────────┘    └────────┬────────┘          │ │
│                                               │                    │ │
│                                    ┌──────────┴──────────┐         │ │
│                                    │                     │         │ │
│                                    ▼                     ▼         │ │
│                           ┌──────────────┐      ┌──────────────┐   │ │
│                           │  AI Agent 1  │      │  AI Agent N  │   │ │
│                           │  (OCI/WASM)  │      │  (OCI/WASM)  │   │ │
│                           └──────────────┘      └──────────────┘   │ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
      </pre>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>© 2026 Stevedores. Apache-2.0 License.</p>
    </div>
  </footer>
</body>
</html>
  `);
});

// API endpoints (proxy to Rust service in production)
app.get("/api/health", (c) => {
  return c.json({ status: "ok", service: "stevedores-web", version: "0.1.0" });
});

// Packages list (mock for now, will proxy to GraphQL)
app.get("/api/packages", (c) => {
  return c.json({
    packages: [
      { name: "gpt-agent", version: "1.0.0", status: "verified" },
      { name: "claude-agent", version: "0.9.0", status: "verified" },
      { name: "toolbox-executor", version: "2.1.0", status: "verified" },
    ],
  });
});

// Dashboard placeholder
app.get("/dashboard", (c) => {
  return c.html(`
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard - Stevedores</title>
  <style>
    body { font-family: sans-serif; background: #0a0a0a; color: #fafafa; padding: 2rem; }
    h1 { color: #ff9f1c; }
  </style>
</head>
<body>
  <h1>⚓ Agent Dashboard</h1>
  <p>Coming soon: Real-time agent monitoring and deployment controls.</p>
  <p><a href="/" style="color: #ff9f1c;">← Back to Home</a></p>
</body>
</html>
  `);
});

// Start server
const port = process.env.PORT || 3000;
console.log(`⚓ Stevedores Platform running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
