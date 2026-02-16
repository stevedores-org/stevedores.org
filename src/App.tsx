export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <header className="border-b border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚢</span>
            <span className="font-bold text-xl">stevedores</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/stevedores-org" className="text-zinc-400 hover:text-white transition">
              GitHub
            </a>
            <a href="https://github.com/stevedores-org/oxidizedgraph" className="text-zinc-400 hover:text-white transition">
              Docs
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Package AI.<br />
            <span className="text-orange-500">Ship Everywhere.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Open source platform for packaging AI agents into production-ready containers.
            Built on <span className="text-orange-400 font-mono">oxidizedgraph</span> for high-performance orchestration.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/stevedores-org/oxidizedgraph"
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Get Started
            </a>
            <a
              href="https://github.com/stevedores-org"
              className="border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-lg transition"
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-zinc-800 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Stevedores?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Rust-Powered</h3>
                <p className="text-zinc-400">
                  oxidizedgraph delivers 10x faster startup and 10x less memory than Python alternatives. True multi-core parallelism.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">Container-Native</h3>
                <p className="text-zinc-400">
                  Package your AI agents as OCI containers. Deploy anywhere—Kubernetes, Cloud Run, or bare metal.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold mb-2">Graph Orchestration</h3>
                <p className="text-zinc-400">
                  Build complex agent workflows with conditional edges, parallel execution, and checkpointing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="border-t border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-4">Simple. Powerful.</h2>
            <p className="text-zinc-400 text-center mb-10">Define agent graphs in pure Rust</p>
            <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-x-auto text-sm">
              <code className="text-zinc-300">{`use oxidizedgraph::prelude::*;

let graph = GraphBuilder::new()
    .add_node(ProcessNode)
    .add_node(LLMNode::new("agent"))
    .add_conditional_edge("agent", |state| {
        if state.is_complete { "END" } else { "process" }
    })
    .compile()?;

let result = GraphRunner::with_defaults(graph)
    .invoke(AgentState::new())
    .await?;`}</code>
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
            <p className="text-zinc-400 mb-8">
              Open source. Built by developers, for developers.
            </p>
            <a
              href="https://github.com/stevedores-org"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Stevedores. Open source under Apache-2.0.</p>
        </div>
      </footer>
    </div>
  )
}
