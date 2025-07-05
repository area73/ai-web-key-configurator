# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.15] - 2024-12-19

### Added

- **Playwright E2E Testing**: Complete end-to-end testing suite with Playwright for real browser testing
  - Added comprehensive E2E tests for all components (`key-configurator`, `key-pair`, `key-name`, `key-value`)
  - Advanced E2E tests covering edge cases, localStorage persistence, and panel state management
  - Integration tests for input/blur lifecycle and component interactions
  - Smoke tests for basic component functionality
- **Enhanced Test Coverage**: Improved unit test coverage with robust helper functions
  - Added coverage scripts and configuration for web-test-runner
  - Enhanced key-configurator tests with edge case handling and localStorage persistence
  - Utility functions for improved test readability and maintainability
- **TypeScript Improvements**: Better type definitions and module resolution
  - Added TypeScript definitions generation with vite-plugin-dts
  - Updated import paths to include .js extension for proper ESM resolution
  - Enhanced type definitions for all components (KeyConfigurator, KeyPair, KeyName, KeyValue)

### Changed

- **Code Quality**: Significant refactoring and code organization improvements
  - Eliminated code duplication in test files through helper functions
  - Updated component exports to include proper type definitions
  - Improved functional programming patterns and code guidelines
- **Testing Strategy**: Separated unit tests from integration tests
  - Unit tests focus on pure functions and component logic
  - E2E tests handle real browser interactions and component lifecycle
  - Skipped problematic unit tests that require real browser environment

### Fixed

- **Build and Development**: Various fixes for better development experience
  - Fixed examples script to properly open index.html file
  - Refactored click outside listener for better performance
  - Updated web-test-runner configuration for better coverage reporting

### Technical

- **Dependencies**: Updated testing infrastructure
  - Added Playwright for E2E testing
  - Enhanced web-test-runner configuration
  - Added start-server-and-test for automated E2E testing
- **Documentation**: Added comprehensive code guidelines and functional refactor patterns

## [1.0.14] - 2024-07-01

### Changed

- Updated package version and build configuration
- Enhanced TypeScript support and type definitions

## [1.0.13] - 2024-07-01

- Haunted is now bundled inside the final `dist/` output.
- You no longer need to install `haunted` separately when using this package.
- Vite config and dependencies updated for true plug-and-play integration.

## [1.0.11] - 2024-07-01

- release: v1.0.11-V1.0.6
- fixing ci

## [1.0.5] - 2024-07-01

- release: v1.0.5
- release: v1.0.4
- chore: update CHANGELOG.md for version 1.0.4, documenting recent releases and workflow enhancements
- chore: update package name and version in package.json for consistency with organization New organization area73

## [1.0.4] - 2024-07-01

- release: v1.0.4
- fix: enhance npm publish workflow for authentication

## [1.0.3] - 2024-07-01

- release: v1.0.3
- fix: update workflow for GitHub Packages registry

## [1.0.2] - 2024-07-01

- release: v1.0.2
- release: v1.0.1
- fix: revert version to 1.0.0 in package.json
- release: v1.0.1
- chore: update CHANGELOG.md for version 1.0.1
- chore: add CHANGELOG.md for project documentation
- release: v1.0.0
- Update release script to push to the current branch instead of hardcoding 'main', enhancing flexibility for version releases.

## [1.0.1] - 2024-07-01

- chore: add CHANGELOG.md for project documentation

### Changed

- Removed `publishConfig` from package.json to allow correct publishing to GitHub Packages registry.

## [1.0.0] - 2024-07-01

### Added

- First public release of `@area73/ai-web-key-configurator`.
- Functional web components: `<key-configurator>`, `<key-pair>`, `<key-name>`, `<key-value>`.
- LocalStorage namespace support via `id` prop.
- Modern Apple-inspired UI and accessibility improvements.
- Unit tests for all components using web-test-runner and Playwright.
- Vite build for ESM-ready npm package.
