# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial implementation of the changelog following Keep a Changelog guidelines.

## [1.0.0] - 2024-07-01

### Added

- First public release of `@a73/ai-web-key-configurator`.
- Functional web components: `<key-configurator>`, `<key-pair>`, `<key-name>`, `<key-value>`.
- LocalStorage namespace support via `id` prop.
- Modern Apple-inspired UI and accessibility improvements.
- Unit tests for all components using web-test-runner and Playwright.
- Vite build for ESM-ready npm package.

## [1.0.1] - 2024-07-01

### Added

- chore: add CHANGELOG.md for project documentation

### Changed

- Removed `publishConfig` from package.json to allow correct publishing to GitHub Packages registry.
