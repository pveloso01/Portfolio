# Development Guide

This guide covers everything you need to know to develop on this portfolio project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** v20+: `node --version`
- **pnpm** v9+: `pnpm --version`
- **Git**: `git --version`
- **Python** 3.12+ (for backend): `python --version`

### Initial Setup

```bash
# Clone repository
git clone https://github.com/pveloso/portfolio.git
cd portfolio

# Install frontend dependencies
cd apps/web
pnpm install

# Install pre-commit hooks (recommended)
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg

# Start development server
pnpm dev
```

Visit <http://localhost:3000> to see your portfolio.

---

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in `apps/web/src/`

### 3. Test Your Changes

```bash
pnpm type-check  # TypeScript
pnpm lint        # ESLint
pnpm test        # Unit tests
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat(frontend): Add new feature"
```

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
Scopes: frontend, backend, infra, docs, deps, ci, config
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Code Style

### TypeScript

- Use **strict mode**
- Prefer `type` over `interface` for object shapes
- Use `const` over `let`
- Avoid `any` - use `unknown` or proper types
- Use type inference where possible

**Good:**

```typescript
type User = {
  id: number;
  name: string;
};

const getUser = (id: number): User | undefined => {
  // implementation
};
```

**Bad:**

```typescript
function getUser(id: any): any {
  // implementation
}
```

### React

- Use functional components with hooks
- Prefer named exports
- Use TypeScript for props
- Keep components small and focused
- Use custom hooks for reusable logic

**Good:**

```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### File Organization

```
src/
├── app/              # Pages (App Router)
│   ├── page.tsx      # Home page
│   └── blog/
│       └── page.tsx  # Blog listing
├── components/       # Reusable components
│   ├── ui/          # UI primitives (buttons, inputs)
│   └── layout/      # Layout components
├── lib/             # Utilities and helpers
│   ├── utils.ts     # General utilities
│   └── api.ts       # API calls
└── types/           # TypeScript type definitions
    └── index.ts
```

### Naming Conventions

- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

---

## Git Workflow

### Branch Naming

```
feature/add-blog-post
fix/navigation-bug
docs/update-readme
refactor/improve-performance
```

### Commit Messages

Follow Conventional Commits:

```bash
feat(frontend): Add dark mode toggle
fix(backend): Resolve authentication bug
docs(readme): Update installation steps
style(frontend): Format with prettier
refactor(frontend): Extract utility function
test(frontend): Add button component tests
chore(deps): Update dependencies
```

### Pull Request Process

1. **Create PR** with clear title and description
2. **Automated checks** will run:
   - TypeScript type checking
   - ESLint
   - Prettier
   - Unit tests
   - E2E tests
   - Build verification
3. **Review** (if applicable)
4. **Merge** after all checks pass

---

## Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

### Writing Unit Tests

```typescript
// Button.test.tsx
import { render, screen, userEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run specific browser
pnpm exec playwright test --project=chromium
```

### Writing E2E Tests

```typescript
// home.spec.ts
import { test, expect } from "@playwright/test";

test("homepage loads correctly", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Portfolio/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

---

## Debugging

### Browser DevTools

- Use React DevTools extension
- Use TypeScript source maps
- Use `debugger;` statement

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/web/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/apps/web",
      "console": "integratedTerminal"
    }
  ]
}
```

### Console Logging

```typescript
// Development only
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

---

## Common Tasks

### Add a New Page

```bash
cd apps/web/src/app
mkdir about
touch about/page.tsx
```

```typescript
// about/page.tsx
export default function AboutPage() {
  return <h1>About</h1>;
}
```

### Add a New Component

```bash
cd apps/web/src/components
touch Card.tsx
```

```typescript
// Card.tsx
type CardProps = {
  title: string;
  children: React.ReactNode;
};

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      {children}
    </div>
  );
};
```

### Add a Blog Post

```bash
cd apps/web/content/posts
touch my-new-post.md
```

```markdown
---
title: "My New Post"
date: "2025-12-06"
description: "A great post about something"
---

# My New Post

Content goes here...
```

### Update Dependencies

```bash
cd apps/web

# Update all dependencies
pnpm update

# Update specific package
pnpm update next

# Check for outdated packages
pnpm outdated
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -- -p 3001
```

### Type Errors After Dependency Update

```bash
# Clear TypeScript cache
rm -rf apps/web/.next
rm -rf apps/web/node_modules/.cache

# Reinstall dependencies
pnpm install
```

### Pre-commit Hooks Failing

```bash
# Update hooks
pre-commit autoupdate

# Run manually
pre-commit run --all-files

# Skip hooks (not recommended)
git commit --no-verify
```

### Build Errors

```bash
# Clear build cache
rm -rf apps/web/.next
rm -rf apps/web/out

# Rebuild
pnpm build
```

### Tests Failing in CI but Passing Locally

- Ensure environment variables are set in GitHub Actions
- Check for timezone-dependent tests
- Verify Node.js version matches CI
- Check for race conditions in tests

---

## Performance Tips

### Development Server

- Use Fast Refresh (automatic)
- Avoid unnecessary re-renders
- Use React DevTools Profiler

### Build Optimization

```bash
# Analyze bundle size
pnpm build
pnpm exec next analyze
```

### Code Splitting

```typescript
// Lazy load components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)

---

**Need Help?** Open an issue on GitHub!
