# 🔐 Finnish Passphrase Generator

A secure, easy-to-use passphrase generator that creates strong, memorable passwords using Finnish words and cryptographically secure randomness.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)

## ✨ Features

- 🔒 **Cryptographically secure** — Uses the Web Crypto API
- 🇫🇮 **Finnish word list** — Over 100,000 Finnish words
- 🎨 **Modern UI** — Responsive, dark/light theme, Tailwind CSS
- ⚡ **Fast and lightweight** — Vite + React
- 🔐 **Full privacy** — Passwords are generated locally and never sent to a server
- ♿ **Accessible** — WCAG 2.1 Level AA compliant
- 📱 **Responsive** — Works on all devices
- 🌙 **Dark mode** — Automatic theme switching
- 📊 **Entropy indicator** — Displays password strength in bits
- ⚙️ **Configurable** — Word count, separator, capitalisation, numeric salt

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Echo-Override/fin-passphrase-generator.git
cd fin-passphrase-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview the build

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code quality
npm run lint             # Check code quality
npm run lint:fix         # Fix lint errors
npm run format           # Format code
npm run format:check     # Check formatting
npm run type-check       # Type check without emitting
```

## 🏗️ Project Structure

```
fin-passphrase-generator/
├── api/                      # Vercel serverless functions
│   └── words.js              # Word list API endpoint
├── public/                   # Static files
│   ├── security.txt          # Security contact info
│   ├── robots.txt            # SEO
│   └── favicon.svg           # Favicon
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── PasswordDisplay.tsx
│   │   ├── PasswordGenerator.tsx
│   │   └── Settings.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useCopyToClipboard.ts
│   │   ├── useDarkMode.ts
│   │   ├── useLocalStorage.ts
│   │   └── usePasswordGenerator.ts
│   ├── styles/               # Global CSS
│   │   └── globals.css
│   ├── tests/                # Tests
│   │   ├── setup.ts
│   │   └── utils/
│   ├── utils/                # Utility modules
│   │   ├── constants.ts      # App-wide constants
│   │   ├── passphrase.ts     # Passphrase generation logic
│   │   └── security.ts       # Cryptographic helpers
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # TypeScript env declarations
├── words.json                # Word list (100,000+ words)
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── vercel.json               # Vercel deployment config
├── tailwind.config.js        # Tailwind CSS config
└── README.md
```

## 🔐 Security

- ✅ **Web Crypto API** — Cryptographically secure randomness, rejection-sampling for uniform distribution
- ✅ **Client-side generation** — Passwords never leave the browser
- ✅ **Content Security Policy** — `script-src 'self'` (no `unsafe-inline`)
- ✅ **Security headers** — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- ✅ **Rate limiting** — 100 requests per 15-minute window per IP on the API
- ✅ **Input validation** — All inputs validated and range-constrained
- ✅ **No logging** — Passwords are never logged anywhere
- ✅ **HTTPS enforced** — Strict-Transport-Security header applied

## 🌐 Deploying to Vercel

### Automatic deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Vercel detects the configuration automatically
   - Click **Deploy**

### Manual deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Log in
vercel login

# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Environment variables

Create a `.env.local` file for local development:

```env
VITE_API_BASE_URL=http://localhost:3000
PRODUCTION_URL=https://your-domain.vercel.app
```

Set these in Vercel under **Project Settings → Environment Variables**.

## 🧪 Testing

Tests use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Coverage targets: 80%+ lines, functions, branches, and statements.

## 🎨 Customisation

### Colour theme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // your colours
      },
    },
  },
},
```

### UI text

All UI strings are in `src/utils/constants.ts`:

```typescript
export const UI_TEXT = {
  APP_TITLE: 'Suomenkielinen Salalausegeneraattori',
  // ...
};
```

### Word list

Replace `words.json` with your own list:

```json
{
  "words": ["word1", "word2", "..."]
}
```

The list must contain at least 1,000 unique non-empty strings.

## 📖 Word List Attribution

This project uses the **Nykysuomen sanalista** (Modern Finnish Word List) published by [Kotimaisten kielten keskus](https://kaino.kotus.fi/sanat/nykysuomi/) (Institute for the Languages of Finland).

- **Source**: [Nykysuomen sanalista](https://kaino.kotus.fi/sanat/nykysuomi/)
- **Publisher**: Kotimaisten kielten keskus
- **Licence**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## 📝 Licence

MIT — see the [LICENSE](LICENSE) file.

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please follow the existing ESLint rules, write tests for new functionality, and use semantic commit messages.

## 🙏 Acknowledgements

- [Kotimaisten kielten keskus](https://kaino.kotus.fi/) — Nykysuomen sanalista (CC BY 4.0)
- [React](https://reactjs.org/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — CSS framework
- [Vercel](https://vercel.com/) — Hosting

## 🌐 Live

- **Vercel**: [https://fin-passphrase.vercel.app](https://fin-passphrase.vercel.app)

---

**Note:** This is an open-source project. Use at your own discretion and always verify your password practices against your organisation's security policy.
