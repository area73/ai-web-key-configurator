# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
