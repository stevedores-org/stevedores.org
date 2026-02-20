# ⚓ Stevedores.org

**Open Source AI Agent Packaging Platform**

Package, deploy, and orchestrate AI agents as cloud-native workloads.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

## Overview

Stevedores is a platform for managing AI agents as first-class cloud-native citizens:

- **Package**: Define agents with OCI images or WASM modules
- **Deploy**: Orchestrate via Kubernetes with GraphQL API
- **Monitor**: Real-time status and inter-agent interaction graphs
- **Reproduce**: Nix Flakes for hermetic builds

## Documentation

Learn about Stevedores and its ecosystem:

- **[docs.stevedores.org](https://docs.stevedores.org)** - Main documentation site with guides, API references, and examples
- **[API Documentation](https://docs.rs/releases/search?q=stevedores)** - Rust crate documentation on docs.rs
- **[Architecture Guide](https://docs.stevedores.org/architecture)** - Deep dive into the Stevedores platform design
- **GitHub Issues** - [Feature requests and roadmap](https://github.com/stevedores-org/stevedores.org/issues)

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Stevedores Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐   GraphQL    ┌────────────────────────────┐   │
│  │  Web UI  │◄────────────►│  Agent Manager Service     │   │
│  │ (Bun/TS) │              │  (Rust + async-graphql)    │   │
│  └──────────┘              └─────────────┬──────────────┘   │
│                                          │                   │
│                    ┌─────────────────────┼─────────────────┐ │
│                    ▼                     ▼                 │ │
│         ┌──────────────────┐    ┌─────────────────┐        │ │
│         │    SurrealDB     │    │   Kubernetes    │        │ │
│         │ (State + Graph)  │    │  (Workloads)    │        │ │
│         └──────────────────┘    └────────┬────────┘        │ │
│                                          │                  │ │
│                              ┌───────────┴───────────┐      │ │
│                              ▼                       ▼      │ │
│                      ┌────────────┐          ┌────────────┐ │ │
│                      │ AI Agent 1 │   ...    │ AI Agent N │ │ │
│                      └────────────┘          └────────────┘ │ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled
- Or: [Bun](https://bun.sh) + [Rust](https://rustup.rs)

### Development

```bash
# With Nix (recommended)
nix develop
just dev

# Without Nix
cd frontend && bun install && bun run dev
```

Visit http://localhost:3000

### Build WASM Module

```bash
# With Nix
nix develop
just wasm

# Without Nix
cd crate-ai-engine
wasm-pack build --target bundler --out-dir ../frontend/src/wasm
```

## Project Structure

```
stevedores.org/
├── frontend/              # Bun + TypeScript web UI
│   ├── src/
│   │   └── server.ts      # Hono server
│   └── package.json
├── crate-ai-engine/       # Rust WASM module
│   ├── src/lib.rs         # Package validation, checksums
│   └── Cargo.toml
├── flake.nix              # Nix development environment
├── justfile               # Task runner commands
└── README.md
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Web UI | Bun + TypeScript + Hono |
| Client Logic | Rust → WASM |
| API | GraphQL (async-graphql) |
| Database | SurrealDB |
| Orchestration | Kubernetes |
| Builds | Nix Flakes |

## Roadmap

See [GitHub Issues](https://github.com/stevedores-org/stevedores.org/issues) for details:

- [x] Issue #3: Web UI foundation (Bun + TypeScript + Rust/WASM)
- [ ] Issue #1: Full architecture implementation
- [ ] Issue #2: Epic breakdown and user stories

## Related Projects & Documentation

### Crates.io Packages

Our ecosystem of production-ready Rust crates for AI agents:

- **[oxidizedgraph](https://crates.io/crates/oxidizedgraph)** - High-performance Rust implementation of LangGraph for DAG-based agent orchestration
- **[GraphRAG-rs](https://crates.io/crates/graphrag-rs)** - State-of-the-art knowledge graph construction and retrieval for RAG systems
- **[aivcs](https://crates.io/crates/aivcs)** - Agent Version Control System for reproducible agent checkpoints and merges
- **[local-ci](https://github.com/stevedores-org/local-ci)** - Deterministic CI runner with file-hash caching for Rust workspaces
- **[oxidizedRAG](https://github.com/stevedores-org/oxidizedRAG)** - RAG engine integration with graph-based retrieval

### Documentation

Comprehensive documentation for all Stevedores projects:

- **[docs.stevedores.org](https://docs.stevedores.org)** - Central documentation hub with API references, architecture guides, and tutorials
- **[crate documentation](https://docs.rs/releases/search?q=stevedores)** - Auto-generated Rust API docs on docs.rs for all published crates

### Infrastructure

- [nix-cache](https://github.com/stevedores-org/nix-cache) - Nix binary cache on Cloudflare for reproducible builds

## Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a PR

## License

Apache-2.0 - See [LICENSE](LICENSE)
# stevedores.org

Open source AI packaging platform. Package AI agents into production-ready containers with [oxidizedgraph](https://github.com/stevedores-org/oxidizedgraph).

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Stack

- **Runtime**: Bun
- **Framework**: React + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS v4

## License

Apache-2.0
