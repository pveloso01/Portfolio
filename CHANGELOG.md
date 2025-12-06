# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Professional portfolio rebuild with modern tech stack
- Next.js 16 with React 19 and TypeScript strict mode
- Comprehensive CI/CD with GitHub Actions
- Automated deployment to GitHub Pages
- Testing infrastructure (Vitest + Playwright)
- Pre-commit hooks with extensive checks
- ESLint, Prettier, and code quality tools
- Lighthouse CI for performance monitoring
- Architecture Decision Records (ADRs)
- Comprehensive documentation (README, DEVELOPMENT, CONTRIBUTING)
- Dependabot for automated dependency updates
- Issue and PR templates
- Conventional Commits enforcement

### Changed
- Migrated to Next.js static export for GitHub Pages
- Enhanced TypeScript configuration with strict mode
- Improved project structure and organization
- Updated dependencies to latest versions

### Infrastructure
- GitHub Actions workflows for CI/CD
- GitHub Pages deployment pipeline
- Automated testing on pull requests
- Code coverage reporting with Codecov
- Performance monitoring with Lighthouse CI

## [0.1.0] - 2025-12-06

### Initial Release
- Basic Next.js setup
- Django backend for local development
- Tailwind CSS styling
- Basic blog functionality

---

## How to Update This File

When making changes, add them under the `[Unreleased]` section using these categories:

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for security fixes

When releasing a new version:
1. Change `[Unreleased]` to the version number and date
2. Create a new `[Unreleased]` section above it
3. Update the version in `package.json`
4. Create a git tag for the release

