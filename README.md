# 🚀 Portfolio

[![CI](https://github.com/pveloso/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/pveloso/portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/pveloso/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/pveloso/portfolio/actions/workflows/deploy.yml)
[![Lighthouse](https://github.com/pveloso/portfolio/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/pveloso/portfolio/actions/workflows/lighthouse.yml)
[![codecov](https://codecov.io/gh/pveloso/portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/pveloso/portfolio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern, performant, and professionally architected portfolio website built with industry best practices.

🌐 **Live Site**: [https://pveloso.github.io/portfolio](https://pveloso.github.io/portfolio)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Code Quality](#code-quality)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This portfolio is designed to showcase professional development skills with:

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript
- **Performance First**: Lighthouse scores > 90 across all metrics
- **Type Safety**: Strict TypeScript configuration
- **Comprehensive Testing**: Unit, Integration, and E2E tests
- **CI/CD**: Automated testing, linting, and deployment
- **Code Quality**: Pre-commit hooks, linting, formatting
- **Accessibility**: WCAG 2.1 Level AA compliant
- **SEO Optimized**: Static generation for optimal SEO

---

## 🛠 Tech Stack

### Frontend (`/apps/web`)

| Category            | Technologies                              |
| ------------------- | ----------------------------------------- |
| **Framework**       | Next.js 16 (Static Export), React 19      |
| **Language**        | TypeScript (Strict Mode)                  |
| **Styling**         | Tailwind CSS v4, CSS Modules              |
| **UI Components**   | Radix UI, shadcn/ui                       |
| **Content**         | Markdown, gray-matter                     |
| **Testing**         | Vitest, React Testing Library, Playwright |
| **Linting**         | ESLint 9, Prettier                        |
| **Package Manager** | pnpm                                      |

### Infrastructure & DevOps

| Category          | Technologies               |
| ----------------- | -------------------------- |
| **CI/CD**         | GitHub Actions             |
| **Hosting**       | GitHub Pages (Frontend)    |
| **Quality Gates** | Lighthouse CI, Codecov     |
| **Pre-commit**    | Gitleaks, ESLint, Prettier |
| **Dependencies**  | Dependabot                 |

---

## 📁 Project Structure

```
portfolio/
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   │   ├── ci.yml          # Main CI checks
│   │   ├── deploy.yml      # GitHub Pages deployment
│   │   └── lighthouse.yml  # Performance monitoring
│   └── dependabot.yml      # Automated dependency updates
│
├── apps/
│   ├── web/                # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/        # App router pages
│   │   │   ├── components/ # React components
│   │   │   ├── lib/        # Utilities & helpers
│   │   │   └── types/      # TypeScript definitions
│   │   ├── e2e/            # Playwright E2E tests
│   │   ├── public/         # Static assets
│   │   ├── content/        # Blog posts & content
│   │   ├── next.config.ts  # Next.js configuration
│   │   ├── tailwind.config # Tailwind configuration
│   │   ├── vitest.config.ts # Vitest configuration
│   │   └── playwright.config.ts # Playwright configuration
│
├── docs/                   # Documentation
│   ├── architecture/       # Architecture Decision Records
│   └── guides/             # Development guides
│
├── infra/                  # Infrastructure as Code
│   ├── terraform/          # Terraform configurations
│   └── k8s/                # Kubernetes manifests
│
├── .pre-commit-config.yaml # Pre-commit hooks
├── .prettierrc             # Prettier configuration
├── .editorconfig           # Editor configuration
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20+ ([Download](https://nodejs.org/))
- **pnpm**: v9+ ([Install](https://pnpm.io/installation))
- **Git**: Latest version

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/pveloso/portfolio.git
cd portfolio
```

2. **Install frontend dependencies**

```bash
cd apps/web
pnpm install
```

3. **Install pre-commit hooks** (optional but recommended)

```bash
# From project root
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg
```

4. **Set up environment variables** (if needed)

```bash
cd apps/web
cp .env.example .env.local
# Edit .env.local with your configuration
```

---

## 💻 Development

### Frontend Development

```bash
cd apps/web

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm type-check

# Run linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format
pnpm format:check

# Run all validation checks
pnpm validate
```

The development server will be available at [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing

### Unit & Integration Tests

```bash
cd apps/web

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### End-to-End Tests

```bash
cd apps/web

# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

### Performance Testing

Lighthouse CI runs automatically on pull requests to ensure performance standards.

---

## 🚢 Deployment

### Automatic Deployment (GitHub Pages)

Deployment happens automatically when pushing to the `main` branch:

1. **Push to main branch**

```bash
git push origin main
```

2. **GitHub Actions** will:
   - Run all tests and quality checks
   - Build the static site
   - Deploy to GitHub Pages

3. **View your site** at: `https://pveloso.github.io/portfolio`

### Manual Deployment

```bash
cd apps/web

# Build static export
pnpm build

# The `out/` directory contains the static site
# Upload to any static hosting service
```

### Deployment Configuration

If deploying to a subdirectory (e.g., `username.github.io/portfolio`), update `next.config.ts`:

```typescript
const nextConfig = {
  basePath: "/portfolio",
  assetPrefix: "/portfolio",
  // ... other config
};
```

---

## ✨ Code Quality

### Automated Checks

All code goes through multiple quality gates:

- **Pre-commit Hooks**: Automatic formatting, linting, secret scanning
- **CI Pipeline**: Type checking, testing, building
- **Lighthouse CI**: Performance, accessibility, SEO checks
- **Dependabot**: Automated dependency updates

### Code Standards

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with recommended rules
- **Formatting**: Prettier with consistent style
- **Commit Messages**: Conventional Commits format
- **Branch Protection**: No direct commits to `main`

### Running Quality Checks Locally

```bash
# Frontend
cd apps/web
pnpm validate  # Runs all checks

# Or individually:
pnpm type-check
pnpm lint
pnpm format:check
pnpm test run
```

---

## 🏗 Architecture

### Key Architectural Decisions

- **Static Site Generation**: Using Next.js static export for optimal performance and SEO
- **Component-Driven**: Modular, reusable React components
- **Type Safety**: Comprehensive TypeScript types
- **Testing Strategy**: Test pyramid with unit, integration, and E2E tests
- **Performance First**: Optimized bundle size, lazy loading, image optimization

### Performance Optimizations

- **React Compiler**: Automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **CSS**: Tailwind CSS with PurgeCSS
- **Bundle Analysis**: Webpack bundle analyzer

For detailed architecture decisions, see [docs/architecture/](./docs/architecture/).

---

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions:

1. **Open an Issue** describing the bug or feature request
2. **Fork the repository** and create a feature branch
3. **Make your changes** following the code quality standards
4. **Submit a Pull Request** with a clear description

All contributions must pass:

- ✅ Type checking
- ✅ Linting
- ✅ Tests
- ✅ Build process

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Playwright](https://playwright.dev/) - E2E testing framework
- [Vitest](https://vitest.dev/) - Unit testing framework

---

## 📞 Contact

**Paulo Veloso**

- GitHub: [@pveloso](https://github.com/pveloso)
- Website: [pveloso.github.io/portfolio](https://pveloso.github.io/portfolio)

---

<p align="center">
  Built using modern web technologies
</p>
