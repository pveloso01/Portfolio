# 4. Deployment to GitHub Pages

Date: 2025-12-06

## Status

Accepted

## Context

We needed a hosting solution for the portfolio that would:

- Be cost-effective (ideally free)
- Support custom domains
- Provide good performance globally
- Integrate with our GitHub workflow
- Support automatic deployments
- Serve static content reliably

## Decision

We will deploy the portfolio to GitHub Pages using GitHub Actions for automated deployments.

### Deployment Configuration

```yaml
# .github/workflows/deploy.yml
- Build Next.js static export
- Deploy to GitHub Pages via actions/deploy-pages
- Automatic deployment on push to main
```

### Next.js Configuration

```typescript
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // basePath/assetPrefix if using username.github.io/repo-name
};
```

## Consequences

### Positive

- **Free Hosting**: No hosting costs
- **Global CDN**: GitHub's CDN for fast global access
- **HTTPS**: Automatic HTTPS certificates
- **Custom Domain**: Support for custom domains
- **Version Control**: Deployment tied to Git commits
- **Automatic Deployments**: CI/CD integration
- **Rollback**: Easy to rollback via Git

### Negative

- **Static Only**: No server-side rendering or API routes
- **Build Required**: Full rebuild for any content change
- **Size Limits**: 1GB repository size limit
- **Bandwidth Limits**: Soft limit of 100GB/month
- **Jekyll Processing**: May need `.nojekyll` file

### Mitigations

- Use static export for all content
- Implement build caching in CI
- Use external services for dynamic features
- Add `.nojekyll` file to disable Jekyll processing
- Monitor bandwidth usage

## Deployment Flow

```mermaid
graph LR
    A[Push to main] --> B[GitHub Actions]
    B --> C[Run Tests]
    C --> D[Build Static Site]
    D --> E[Deploy to Pages]
    E --> F[Live Site]
```

### Steps

1. **Trigger**: Push to `main` branch
2. **CI Checks**: Run all tests and quality gates
3. **Build**: Generate static site in `out/` directory
4. **Upload**: Upload artifact to GitHub Pages
5. **Deploy**: GitHub deploys to CDN
6. **Live**: Site available at URL

## Configuration Files

### 1. Next.js Config

```typescript
// next.config.ts
export default {
  output: "export",
  images: { unoptimized: true },
};
```

### 2. GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 3. Repository Settings

- **Settings** → **Pages**
- Source: GitHub Actions
- Custom domain (optional)

## Performance Optimizations

- **Asset Optimization**: Minified HTML, CSS, JS
- **Caching**: Aggressive caching headers
- **Compression**: Gzip/Brotli compression
- **CDN**: GitHub's global CDN
- **Static Assets**: Fingerprinted filenames

## Custom Domain Setup (Optional)

1. Add `CNAME` file to `public/` directory:

   ```
   yourdomain.com
   ```

2. Configure DNS records:

   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  username.github.io
   ```

3. Enable HTTPS in repository settings

## Monitoring

- **Uptime**: GitHub status page
- **Analytics**: Can add Google Analytics, Plausible, etc.
- **Performance**: Lighthouse CI in pull requests
- **Errors**: Client-side error tracking (optional)

## Alternatives Considered

### 1. Vercel

- **Pros**: Excellent DX, serverless functions, edge network
- **Cons**: Usage limits on free tier, vendor lock-in

### 2. Netlify

- **Pros**: Great build system, form handling, serverless
- **Cons**: Bandwidth limits, build minutes limits

### 3. AWS S3 + CloudFront

- **Pros**: Highly scalable, full control
- **Cons**: Complex setup, costs money, more maintenance

### 4. Firebase Hosting

- **Pros**: Fast CDN, good integration with Firebase
- **Cons**: Bandwidth costs, less familiar

### 5. Cloudflare Pages

- **Pros**: Fast, good free tier, Cloudflare CDN
- **Cons**: Less GitHub integration

## Decision Factors

| Factor        | GitHub Pages | Vercel    | Netlify   | AWS         |
| ------------- | ------------ | --------- | --------- | ----------- |
| Cost          | Free         | Free tier | Free tier | Paid        |
| Setup         | Simple       | Simple    | Simple    | Complex     |
| CI/CD         | Native       | Good      | Good      | Manual      |
| Custom Domain | Yes          | Yes       | Yes       | Yes         |
| Bandwidth     | 100GB/mo     | 100GB/mo  | 100GB/mo  | Pay per use |
| **Score**     | ⭐⭐⭐⭐⭐   | ⭐⭐⭐⭐  | ⭐⭐⭐⭐  | ⭐⭐⭐      |

GitHub Pages wins for this use case due to:

- Zero cost
- Native GitHub integration
- Simple setup
- Sufficient for portfolio traffic
