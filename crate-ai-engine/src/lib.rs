//! Stevedores AI Engine
//!
//! WASM module for client-side AI package validation and utilities.
//! Compiled with wasm-pack for use in the browser.

use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use wasm_bindgen::prelude::*;

/// Agent package manifest
#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct AgentPackage {
    pub name: String,
    pub version: String,
    pub image_uri: String,
    pub checksum: String,
}

#[wasm_bindgen]
impl AgentPackage {
    #[wasm_bindgen(constructor)]
    pub fn new(name: String, version: String, image_uri: String) -> Self {
        let checksum = compute_checksum(&format!("{}:{}:{}", name, version, image_uri));
        Self {
            name,
            version,
            image_uri,
            checksum,
        }
    }

    /// Validate the package manifest
    #[wasm_bindgen]
    pub fn validate(&self) -> ValidationResult {
        let mut errors: Vec<String> = Vec::new();

        if self.name.is_empty() {
            errors.push("Package name is required".to_string());
        }

        if !self.name.chars().all(|c| c.is_alphanumeric() || c == '-' || c == '_') {
            errors.push("Package name contains invalid characters".to_string());
        }

        if self.version.is_empty() {
            errors.push("Version is required".to_string());
        }

        if !is_valid_semver(&self.version) {
            errors.push("Version must be valid semver (e.g., 1.0.0)".to_string());
        }

        if self.image_uri.is_empty() {
            errors.push("Image URI is required".to_string());
        }

        ValidationResult {
            valid: errors.is_empty(),
            errors: errors.join("; "),
            checksum: self.checksum.clone(),
        }
    }

    /// Serialize to JSON
    #[wasm_bindgen]
    pub fn to_json(&self) -> String {
        serde_json::to_string_pretty(self).unwrap_or_default()
    }
}

/// Validation result
#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct ValidationResult {
    pub valid: bool,
    pub errors: String,
    pub checksum: String,
}

/// Validate an agent package manifest (JSON string input)
#[wasm_bindgen]
pub fn validate_package_json(json: &str) -> ValidationResult {
    match serde_json::from_str::<AgentPackage>(json) {
        Ok(pkg) => pkg.validate(),
        Err(e) => ValidationResult {
            valid: false,
            errors: format!("Invalid JSON: {}", e),
            checksum: String::new(),
        },
    }
}

/// Compute SHA256 checksum of content
#[wasm_bindgen]
pub fn compute_checksum(content: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    hex::encode(hasher.finalize())
}

/// Verify a checksum matches expected value
#[wasm_bindgen]
pub fn verify_checksum(content: &str, expected: &str) -> bool {
    compute_checksum(content) == expected
}

/// Format a package name for display
#[wasm_bindgen]
pub fn format_package_status(name: &str, version: &str, status: &str) -> String {
    format!(
        "⚓ Stevedore Package '{}@{}' - Status: {}",
        name, version, status.to_uppercase()
    )
}

/// Check if a string is valid semver
fn is_valid_semver(version: &str) -> bool {
    let parts: Vec<&str> = version.split('.').collect();
    if parts.len() != 3 {
        return false;
    }
    parts.iter().all(|p| p.parse::<u32>().is_ok())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_package_validation() {
        let pkg = AgentPackage::new(
            "test-agent".to_string(),
            "1.0.0".to_string(),
            "ghcr.io/stevedores-org/test-agent:latest".to_string(),
        );
        let result = pkg.validate();
        assert!(result.valid);
    }

    #[test]
    fn test_invalid_version() {
        let pkg = AgentPackage::new(
            "test-agent".to_string(),
            "invalid".to_string(),
            "ghcr.io/test:latest".to_string(),
        );
        let result = pkg.validate();
        assert!(!result.valid);
        assert!(result.errors.contains("semver"));
    }

    #[test]
    fn test_checksum() {
        let sum = compute_checksum("hello world");
        assert_eq!(sum.len(), 64); // SHA256 hex = 64 chars
    }
}
