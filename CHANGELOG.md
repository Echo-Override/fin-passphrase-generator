# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-25

### 🎉 Initial Release

#### Added
- ✨ Finnish word-based password generation with Web Crypto API
- 🇫🇮 Finnish word list with 102,993 unique words
- 🎨 Modern, responsive UI with Tailwind CSS
- 🌙 Dark mode with persistent theme switching
- 📋 One-click copy to clipboard functionality
- 📊 Real-time entropy calculation and display
- 💪 Visual password strength indicator
- ⚙️ Customizable password options:
  - Word count (3-7 words)
  - Separator characters (hyphen, space, underscore, period, comma, none)
  - Capitalization toggle
  - Optional salt (numbers, special chars, alphanumeric)
  - Salt position (start, end, random)
- 🔐 Security features:
  - Client-side only password generation
  - Cryptographically secure randomness
  - Content Security Policy headers
  - Rate limiting on API
  - Input validation and sanitization
- ♿ WCAG 2.1 Level AA accessibility compliance
- 📱 Fully responsive design
- 🧪 Comprehensive test suite with 80%+ coverage
- 📚 Complete documentation:
  - README.md
  - QUICKSTART.md
  - DEPLOYMENT.md
  - CONTRIBUTING.md
  - PROJECT_SUMMARY.md
- 🚀 Vercel deployment configuration
- 🎯 TypeScript strict mode
- 📦 Optimized production build with code splitting
- 🔧 Development tools:
  - ESLint configuration
  - Prettier formatting
  - Husky pre-commit hooks
  - VS Code settings
- 🌐 API endpoint for word list with:
  - Rate limiting
  - Security headers
  - CORS configuration
  - Caching

#### Security
- Implemented Web Crypto API for secure random generation
- Added Content Security Policy
- Configured security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Implemented rate limiting (100 requests per 15 minutes)
- Added input validation and sanitization
- Created security.txt for vulnerability reporting
- No server-side password handling or logging

#### Performance
- Bundle size optimization with Vite
- Code splitting for optimal loading
- Tree shaking for minimal bundle
- Lazy loading where applicable
- CDN-ready static assets
- Efficient caching strategy

#### Developer Experience
- TypeScript for type safety
- Comprehensive ESLint rules
- Automatic code formatting with Prettier
- Hot module replacement in development
- Fast builds with Vite
- Test coverage reporting
- VS Code extensions recommendations

### Technical Details
- **Frontend**: React 18.3.1, TypeScript 5.6.3
- **Build**: Vite 5.4.10
- **Styling**: Tailwind CSS 3.4.1
- **Testing**: Vitest 1.2.2, Testing Library
- **Deployment**: Vercel with serverless functions
- **Node**: >= 18.0.0
- **npm**: >= 9.0.0

### Breaking Changes
None (initial release)

### Known Issues
None at this time

### Future Enhancements
See PROJECT_SUMMARY.md for planned features

---

## Release Notes Template for Future Versions

### [X.Y.Z] - YYYY-MM-DD

#### Added
- New features go here

#### Changed
- Changes to existing functionality

#### Deprecated
- Features that will be removed in future versions

#### Removed
- Features that were removed

#### Fixed
- Bug fixes

#### Security
- Security improvements and fixes

---

[1.0.0]: https://github.com/Echo-Override/fin-passphrase-generator/releases/tag/v1.0.0
