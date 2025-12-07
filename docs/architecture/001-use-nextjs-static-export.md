# 1. Use Next.js with Static Export

Date: 2025-12-06

## Status

Accepted

## Context

We needed to choose a frontend framework for the portfolio website that would:

- Provide excellent performance
- Support static site generation for GitHub Pages
- Offer modern developer experience
- Enable easy content management
- Support TypeScript out of the box

## Decision

We will use Next.js 16 with static export (`output: "export"`) as our frontend framework.

### Key Configuration

```typescript
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactCompiler: true,
};
```

## Consequences

### Positive

- **Performance**: Static HTML files served directly from CDN
- **SEO**: Pre-rendered pages for optimal search engine indexing
- **Developer Experience**: Hot reloading, TypeScript support, modern tooling
- **Free Hosting**: Can deploy to GitHub Pages at no cost
- **React Ecosystem**: Access to the entire React component ecosystem
- **Future Proof**: Easy to migrate to server-side rendering if needed

### Negative

- **No Server-Side Features**: Cannot use API routes, server components with data fetching
- **Build Time**: Must rebuild entire site for content changes
- **Image Optimization**: Native Next.js image optimization unavailable in static export

### Mitigations

- Use client-side data fetching for dynamic content
- Implement incremental builds in CI/CD
- Use external image CDN or unoptimized images

## Alternatives Considered

### 1. Gatsby

- **Pros**: Built for static sites, excellent plugin ecosystem
- **Cons**: Slower build times, less active development than Next.js

### 2. Astro

- **Pros**: Excellent performance, component framework agnostic
- **Cons**: Smaller ecosystem, less familiar

### 3. Create React App

- **Pros**: Simple setup
- **Cons**: No static generation, no file-based routing, deprecated

### 4. Vite + React Router

- **Pros**: Fast development, flexible
- **Cons**: More manual setup, no built-in static generation
