# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites

- Node.js v20+ installed
- pnpm v9+ installed
- Git installed

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/pveloso/portfolio.git
cd portfolio

# 2. Install frontend dependencies
cd apps/web
pnpm install

# 3. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your First Changes

### Update Site Metadata

Edit `apps/web/src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your description here",
};
```

### Add Content

Create a new blog post in `apps/web/content/posts/`:

```markdown
---
title: "My First Post"
date: "2025-12-06"
description: "This is my first blog post"
---

# Hello World!

This is my first blog post.
```

### Customize Styling

Edit `apps/web/src/app/globals.css` to change colors and styles.

## Available Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm type-check   # Check TypeScript types
pnpm format       # Format with Prettier
pnpm validate     # Run all checks

# Testing
pnpm test         # Run unit tests
pnpm test:e2e     # Run E2E tests
```

## Deployment

### Deploy to GitHub Pages

1. **Update repository URL** in workflows and configs
2. **Enable GitHub Pages** in repository settings:
   - Settings → Pages → Source: GitHub Actions
3. **Push to main branch**:

   ```bash
   git push origin main
   ```

4. **Your site will be live** at: `https://username.github.io/portfolio`

### Custom Domain (Optional)

1. Add a `CNAME` file in `apps/web/public/`:

   ```
   yourdomain.com
   ```

2. Configure DNS:

   ```
   A     @    185.199.108.153
   CNAME www  username.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

## Troubleshooting

### Port 3000 already in use

```bash
lsof -ti:3000 | xargs kill -9
# Or use a different port:
pnpm dev -- -p 3001
```

### Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build errors

```bash
# Clear build cache
rm -rf .next out
pnpm build
```

## Next Steps

- 📖 Read the full [README.md](./README.md)
- 🛠 Check the [Development Guide](./docs/guides/DEVELOPMENT.md)
- 🏗 Review [Architecture Decisions](./docs/architecture/README.md)

## Getting Help

- 📝 [Open an issue](https://github.com/pveloso/portfolio/issues)
- 📚 [Read the docs](./docs/)
- 💬 Check existing issues and discussions

---

Happy coding! 🚀
