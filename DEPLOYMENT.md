# 🚀 Deployment Guide - Salalausegeneraattori

This guide provides step-by-step instructions for deploying the Finnish Passphrase Generator to Vercel.

## 📋 Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git installed
- GitHub account
- Vercel account (free tier works)

## 🔧 Pre-Deployment Checklist

1. ✅ All tests pass: `npm test`
2. ✅ No linting errors: `npm run lint`
3. ✅ Production build works: `npm run build`
4. ✅ Environment variables configured
5. ✅ Security settings reviewed
6. ✅ Documentation updated

## 🌐 Deploying to Vercel

### Method 1: Automatic Deployment (Recommended)

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Salalausegeneraattori - Finnish Passphrase Generator"

# Add remote
git remote add origin https://github.com/Echo-Override/fin-passphrase-generator.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 3: Configure Environment Variables

In Vercel Dashboard > Project > Settings > Environment Variables, add:

```
# Optional: If you have custom API URL
VITE_API_BASE_URL=https://your-domain.vercel.app

# API Rate Limiting (optional, has defaults)
API_RATE_LIMIT_MAX=100
API_RATE_LIMIT_WINDOW=900000
```

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### Method 2: Manual Deployment with Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Development preview
vercel

# Production deployment
vercel --prod
```

## 🔐 Post-Deployment Security

### 1. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard > Project > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Enable automatic HTTPS (enabled by default)

### 2. Verify Security Headers

Test your deployment with:

```bash
curl -I https://your-domain.vercel.app
```

You should see these headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: ...`

### 3. Test Security

Visit these tools to verify:
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

## 📊 Monitoring

### Enable Analytics

1. Go to Vercel Dashboard > Project > Analytics
2. Enable Web Analytics (free)
3. View metrics:
   - Page views
   - Unique visitors
   - Performance metrics
   - Error rates

### Set Up Alerts

1. Go to Project > Settings > Notifications
2. Configure alerts for:
   - Deployment failures
   - Build errors
   - Runtime errors

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

### Production Deployments
- Push to `main` branch → Production deployment
- Automatic HTTPS
- Global CDN distribution

### Preview Deployments
- Push to any other branch → Preview deployment
- Unique URL for testing
- Perfect for pull requests

## 🛠️ Troubleshooting

### Build Failures

**Error**: Dependencies not installing
```bash
# Solution: Clear npm cache
npm cache clean --force
npm install
```

**Error**: TypeScript errors
```bash
# Solution: Check types
npm run type-check
```

### Runtime Errors

**Error**: API endpoint not working
- Check Vercel Functions logs
- Verify `api/words.js` is in the repository
- Check `words.json` exists in root

**Error**: 404 on routes
- Verify `vercel.json` rewrites configuration
- Check SPA routing settings

### Performance Issues

**Issue**: Slow loading
```bash
# Analyze bundle size
npm run build
# Check dist/ folder size
```

**Solution**:
- Enable compression (automatic in Vercel)
- Optimize images
- Code splitting (already configured)

## 📈 Performance Optimization

### 1. Enable Edge Functions (Optional)

For even better performance, convert API to Edge Functions:

Create `api/words.ts`:
```typescript
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Your edge function code
}
```

### 2. Configure Caching

Already configured in `vercel.json`:
- Static assets: 1 year cache
- API responses: 1 hour cache
- HTML: No cache (for updates)

### 3. Image Optimization

If adding images later:
```javascript
import { Image } from 'next/image'; // If using Next.js
// Or use Vercel's image optimization API
```

## 🔍 Testing Deployment

### Pre-deployment Testing

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

Visit `http://localhost:4173` to test

### Post-deployment Testing

1. **Functionality Test**
   - Generate passwords
   - Test all settings
   - Verify copy functionality
   - Test dark mode

2. **Security Test**
   - Check HTTPS
   - Verify CSP headers
   - Test rate limiting
   - Check for XSS vulnerabilities

3. **Performance Test**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test on mobile devices

## 🚨 Rollback Procedure

If something goes wrong:

1. **Via Vercel Dashboard**
   - Go to Deployments
   - Find previous working deployment
   - Click "Promote to Production"

2. **Via Git**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

3. **Via Vercel CLI**
   ```bash
   vercel rollback
   ```

## 📱 Mobile Testing

Test on multiple devices:
- iOS Safari
- Android Chrome
- Different screen sizes
- Touch interactions
- Keyboard behavior

## 🌍 Internationalization (Future)

To add more languages later:

1. Create translation files in `src/i18n/`
2. Use i18next or similar
3. Update Vercel config for locale routing

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues**: [GitHub Issues](https://github.com/Echo-Override/fin-passphrase-generator/issues)

## ✅ Deployment Checklist

Before going live:

- [ ] All tests pass
- [ ] No console errors
- [ ] Security headers configured
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Documentation updated
- [ ] README has correct URLs
- [ ] security.txt has correct contact
- [ ] Performance optimized
- [ ] Mobile tested
- [ ] Accessibility checked
- [ ] SEO optimized

## 🎉 Success!

Your Finnish Passphrase Generator is now live! Share it with the world:

- Tweet about it
- Post on Reddit
- Share with friends
- Add to your portfolio

---

**Remember**: Keep your dependencies updated and monitor your deployment for security issues!

🔐 **Happy Deploying!**
