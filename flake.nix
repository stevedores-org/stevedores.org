{
  description = "Stevedores.org - AI Agent Packaging Platform";

  nixConfig = {
    extra-substituters = [ "https://nix-cache.stevedores.org/stevedores" ];
    extra-trusted-substituters = [ "https://nix-cache.stevedores.org/stevedores" ];
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { self, nixpkgs, flake-utils, rust-overlay }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs { inherit system overlays; };

        rustToolchain = pkgs.rust-bin.stable.latest.default.override {
          extensions = [ "rust-src" "rust-analyzer" ];
          targets = [ "wasm32-unknown-unknown" ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            # Rust
            rustToolchain
            wasm-pack
            wasm-bindgen-cli

            # Bun/TypeScript
            bun
            nodejs_22

            # Tools
            attic-client
            cargo-watch
            just

            # Platform deps
            pkg-config
            openssl
          ];

          shellHook = ''
            echo "⚓ Stevedores Development Environment"
            echo ""
            echo "Commands:"
            echo "  cd frontend && bun install && bun run dev  # Start web server"
            echo "  cd crate-ai-engine && cargo test           # Test Rust code"
            echo "  cd crate-ai-engine && wasm-pack build      # Build WASM"
            echo ""
            echo "Nix Cache (Attic):"
            echo "  attic login stevedores https://nix-cache.stevedores.org \$ATTIC_TOKEN"
            echo "  attic push stevedores <store-path>         # Push to cache"
            echo ""
          '';

          RUST_SRC_PATH = "${rustToolchain}/lib/rustlib/src/rust/library";
        };

        packages = {
          # Build the WASM module
          wasm = pkgs.rustPlatform.buildRustPackage {
            pname = "ai-engine-wasm";
            version = "0.1.0";
            src = ./crate-ai-engine;
            cargoLock.lockFile = ./crate-ai-engine/Cargo.lock;

            nativeBuildInputs = [ pkgs.wasm-pack ];

            buildPhase = ''
              wasm-pack build --target bundler --out-dir $out
            '';

            installPhase = "true";
          };
        };
      }
    );
}
