# Deployment Guide

Complete guide to deploying your portfolio to GitHub Pages and other platforms.

## Table of Contents

- [GitHub Pages (Recommended)](#github-pages-recommended)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [Custom Server](#custom-server)
- [Troubleshooting](#troubleshooting)

---

## GitHub Pages (Recommended)

### Prerequisites

- GitHub account
- Repository with your portfolio code
- GitHub Actions enabled

### Setup Steps

#### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**

#### 2. Configure Base Path (if needed)

If deploying to `username.github.io/repository-name`, update `next.config.ts`:

```typescript
const nextConfig = {
  // ...other config
  basePath: "/portfolio",
  assetPrefix: "/portfolio",
};
```

If deploying to `username.github.io` (root domain), no changes needed.

#### 3. Update Site URL

In `apps/web/public/robots.txt`:

```txt
Sitemap: https://username.github.io/portfolio/sitemap.xml
```

#### 4. Deploy

```bash
git add .
git commit -m "feat(config): Configure for GitHub Pages"
git push origin main
```

The GitHub Action will automatically:

1. Run tests and quality checks
2. Build the static site
3. Deploy to GitHub Pages

#### 5. Verify Deployment

Visit: `https://username.github.io/portfolio`

### Custom Domain

#### Add CNAME File

Create `apps/web/public/CNAME`:

```
yourdomain.com
```

#### Configure DNS

Add these DNS records at your domain provider:

```
Type  Host  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   username.github.io
```

#### Enable HTTPS

1. Go to **Settings** → **Pages**
2. Check **Enforce HTTPS**

Wait up to 24 hours for DNS propagation and SSL certificate.

---

## Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Setup

1. **Install Vercel CLI**:

   ```bash
   pnpm install -g vercel
   ```

2. **Login**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   cd apps/web
   vercel
   ```

4. **Production Deploy**:

   ```bash
   vercel --prod
   ```

### Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "cd apps/web && pnpm build",
  "outputDirectory": "apps/web/out",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Environment Variables

Add in Vercel dashboard:

- Go to **Settings** → **Environment Variables**
- Add your variables from `.env.example`

---

## Netlify

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Manual Setup

1. **Install Netlify CLI**:

   ```bash
   pnpm install -g netlify-cli
   ```

2. **Login**:

   ```bash
   netlify login
   ```

3. **Initialize**:

   ```bash
   netlify init
   ```

4. **Deploy**:

   ```bash
   netlify deploy --prod
   ```

### Configuration

Create `netlify.toml` in project root:

```toml
[build]
  base = "apps/web"
  command = "pnpm build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Custom Server

### Prerequisites

- VPS or hosting provider
- Node.js v20+ installed
- Nginx or Apache

### Build Static Site

```bash
cd apps/web
pnpm build
```

The static site will be in `apps/web/out/`.

### Deploy to Server

#### Using rsync

```bash
rsync -avz --delete apps/web/out/ user@server:/var/www/portfolio/
```

#### Using SCP

```bash
scp -r apps/web/out/* user@server:/var/www/portfolio/
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Enable gzip
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Docker Deployment

### Dockerfile

Create `apps/web/Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production
FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
cd apps/web
docker build -t portfolio .
docker run -p 3000:80 portfolio
```

---

## CI/CD Automation

### GitHub Actions (Included)

The project includes workflows for:

- ✅ Automated testing
- ✅ Code quality checks
- ✅ Deployment to GitHub Pages

### Other CI/CD Platforms

#### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
image: node:20

stages:
  - test
  - build
  - deploy

cache:
  paths:
    - apps/web/node_modules/

test:
  stage: test
  script:
    - cd apps/web
    - npm install -g pnpm
    - pnpm install
    - pnpm run validate

build:
  stage: build
  script:
    - cd apps/web
    - npm install -g pnpm
    - pnpm install
    - pnpm build
  artifacts:
    paths:
      - apps/web/out

deploy:
  stage: deploy
  only:
    - main
  script:
    -  # Your deployment script
```

---

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
cd apps/web
pnpm build
pnpm exec next analyze
```

### CDN Integration

Consider using a CDN for static assets:

- Cloudflare
- AWS CloudFront
- Fastly

### Caching Strategy

Set appropriate cache headers:

```nginx
# Static assets - 1 year
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML - no cache
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}
```

---

## Monitoring

### Analytics

Add Google Analytics or Plausible:

```typescript
// apps/web/src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Error Tracking

Add Sentry or similar:

```bash
cd apps/web
pnpm add @sentry/nextjs
```

### Uptime Monitoring

Use services like:

- UptimeRobot
- Pingdom
- Better Uptime

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf apps/web/.next apps/web/out
pnpm build
```

### 404 on Refresh

Ensure your server is configured for SPA routing (try_files or redirects).

### Assets Not Loading

Check `basePath` and `assetPrefix` in `next.config.ts`.

### Slow Build Times

- Enable build caching
- Use faster CI runners
- Implement incremental builds

### Large Bundle Size

```bash
# Analyze bundle
pnpm exec next analyze

# Optimize by:
# - Lazy loading components
# - Tree shaking unused code
# - Optimizing images
# - Code splitting
```

---

## Rollback

### GitHub Pages

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

### Manual Deployment

Keep backup of previous build:

```bash
# Before deploying
cp -r /var/www/portfolio /var/www/portfolio.backup

# Rollback if needed
rm -rf /var/www/portfolio
mv /var/www/portfolio.backup /var/www/portfolio
```

---

## Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com)

---

**Questions?** Open an issue on GitHub!
