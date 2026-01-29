# Stevedores.org Development Commands

# Default: show help
default:
    @just --list

# Install all dependencies
install:
    cd frontend && bun install
    cd crate-ai-engine && cargo fetch

# Start development server
dev:
    cd frontend && bun run dev

# Build WASM module
wasm:
    cd crate-ai-engine && wasm-pack build --target bundler --out-dir ../frontend/src/wasm

# Run Rust tests
test-rust:
    cd crate-ai-engine && cargo test

# Run all tests
test: test-rust
    @echo "All tests passed!"

# Build for production
build: wasm
    cd frontend && bun run build

# Format code
fmt:
    cd crate-ai-engine && cargo fmt

# Lint
lint:
    cd crate-ai-engine && cargo clippy -- -D warnings

# Clean build artifacts
clean:
    cd crate-ai-engine && cargo clean
    rm -rf frontend/dist frontend/src/wasm
