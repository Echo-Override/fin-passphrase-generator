# ⚡ Quick Start Guide

Get your Finnish Passphrase Generator up and running in 5 minutes!

## 1️⃣ Install Dependencies

```bash
npm install
```

**What this does**: Installs all required packages (React, Vite, TypeScript, Tailwind, etc.)

**Expected time**: 1-2 minutes

## 2️⃣ Start Development Server

```bash
npm run dev
```

**What this does**: Starts a local development server with hot-reload

**URL**: http://localhost:3000

**Expected output**:
```
VITE v8.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## 3️⃣ Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Finnish Passphrase Generator!

## ✅ Verify It's Working

1. **Generate a password** - Click the refresh button
2. **Copy the password** - Click the copy button
3. **Change settings** - Adjust word count, separator, etc.
4. **Toggle dark mode** - Click the moon/sun icon

## 🧪 Run Tests (Optional)

```bash
npm test
```

**What this does**: Runs all unit tests

**Expected**: All tests should pass ✅

## 🏗️ Build for Production (Optional)

```bash
npm run build
```

**What this does**: Creates optimized production build in `dist/`

**Preview the build**:
```bash
npm run preview
```

## 🚀 Deploy to Vercel (When Ready)

### Option 1: Automatic (Recommended)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Echo-Override/fin-passphrase-generator.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 2: Manual with CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

## 🎯 What's Next?

- 📖 Read the full [README.md](README.md)
- 🚀 Check out [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide
- 🔐 Review [SECURITY.md](SECURITY.md) for security best practices
- 🤝 See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## ❗ Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check
```

### Build Errors

```bash
# Clear cache and rebuild
rm -rf dist node_modules .vite
npm install
npm run build
```

## 💬 Need Help?

- Create an issue on GitHub
- Check existing issues
- Read the documentation

---

🎉 **You're all set! Happy password generating!** 🔐
