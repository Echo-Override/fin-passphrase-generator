# 👨‍💻 Development Guide

A comprehensive guide for developers working on the Finnish Passphrase Generator.

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Code Style](#code-style)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Performance](#performance)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- VS Code (recommended)

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd fin-passphrase-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Recommended VS Code Extensions

Install these for the best experience:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript

## 🏗️ Project Architecture

### Component Structure

```
src/components/
├── Header.tsx              # Top navigation with theme toggle
├── PasswordDisplay.tsx     # Shows password with copy/regenerate
├── PasswordGenerator.tsx   # Main orchestrator component
└── Settings.tsx            # Password configuration panel
```

**Component Guidelines**:
- Keep components small and focused
- Use TypeScript for props
- Export as named exports
- Document complex logic

### Custom Hooks

```
src/hooks/
├── useCopyToClipboard.ts   # Clipboard operations
├── useDarkMode.ts          # Theme management
├── useLocalStorage.ts      # Persistent state
└── usePasswordGenerator.ts # Core password logic
```

**Hook Guidelines**:
- Prefix with `use`
- Return objects with clear names
- Handle errors gracefully
- Document return values

### Utility Functions

```
src/utils/
├── constants.ts            # App-wide constants
├── passphrase.ts            # Password generation
└── security.ts            # Security utilities
```

**Utility Guidelines**:
- Pure functions where possible
- Thorough input validation
- Comprehensive JSDoc comments
- Unit test coverage

## 💅 Code Style

### TypeScript

```typescript
// ✅ Good
interface PasswordOptions {
  wordCount: number;
  separator: string;
  capitalize: boolean;
}

function generatePassword(options: PasswordOptions): string {
  // ...
}

// ❌ Bad
function generatePassword(wordCount, separator, capitalize) {
  // No types!
}
```

### React Components

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// ❌ Bad
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### Naming Conventions

- **Components**: PascalCase (`PasswordDisplay`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (`isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_WORDS`)
- **Types/Interfaces**: PascalCase (`PasswordOptions`)
- **Functions**: camelCase (`generatePassword`)

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { Copy } from 'lucide-react';

// 2. Internal utilities/hooks
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import { UI_TEXT } from '../utils/constants';

// 3. Types
import type { PasswordOptions } from '../utils/passphrase';

// 4. Styles (if any)
import './styles.css';
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm test -- security.test.ts
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { generatePassphrase } from './diceware';

describe('generatePassphrase', () => {
  it('should generate password with correct word count', () => {
    const result = generatePassphrase(wordList, {
      wordCount: 4,
      // ...options
    });
    
    const words = result.password.split('-');
    expect(words).toHaveLength(4);
  });
});
```

### Test Coverage Goals

- **Lines**: 80%+
- **Functions**: 80%+
- **Branches**: 80%+
- **Statements**: 80%+

## 🐛 Debugging

### Browser DevTools

```typescript
// Add breakpoints in browser
function generatePassword() {
  debugger; // Execution pauses here
  // ...
}

// Console logging
console.log('Password:', password);
console.table(options);
```

### React DevTools

1. Install React DevTools extension
2. Open DevTools
3. Use Components and Profiler tabs

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 📝 Common Tasks

### Adding a New Component

1. Create file in `src/components/`
2. Define TypeScript interface for props
3. Implement component
4. Export component
5. Add to `App.tsx` or parent component
6. Write tests

### Adding a New Utility Function

1. Create/update file in `src/utils/`
2. Add JSDoc comments
3. Export function
4. Write unit tests
5. Update type definitions if needed

### Adding a New Hook

1. Create file in `src/hooks/`
2. Prefix name with `use`
3. Return clear object/array
4. Handle side effects properly
5. Write tests

### Updating Styles

```typescript
// Using Tailwind classes
<div className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800">
  Content
</div>

// Custom styles in globals.css if needed
.custom-class {
  @apply bg-blue-500 hover:bg-blue-600;
}
```

### Adding Constants

Update `src/utils/constants.ts`:

```typescript
export const NEW_CONFIG = {
  OPTION_1: 'value1',
  OPTION_2: 'value2',
} as const;
```

## ⚡ Performance

### Measuring Performance

```typescript
// Use React DevTools Profiler
import { Profiler } from 'react';

<Profiler id="PasswordGenerator" onRender={onRenderCallback}>
  <PasswordGenerator />
</Profiler>
```

### Optimization Techniques

```typescript
// 1. useMemo for expensive calculations
const entropy = useMemo(
  () => calculateEntropy(wordList.length, wordCount),
  [wordList, wordCount]
);

// 2. useCallback for functions
const handleGenerate = useCallback(() => {
  generatePassword();
}, [generatePassword]);

// 3. Code splitting
const Settings = lazy(() => import('./Settings'));
```

### Bundle Size

```bash
# Analyze bundle
npm run build
# Check dist/ folder sizes

# Visualize bundle (add plugin)
npm install --save-dev rollup-plugin-visualizer
```

## 🔐 Security

### Security Checklist

- ✅ Never log passwords
- ✅ Use Web Crypto API
- ✅ Validate all inputs
- ✅ Sanitize user data
- ✅ Set security headers
- ✅ No inline scripts
- ✅ CSP configured
- ✅ HTTPS only in production

### Crypto Best Practices

```typescript
// ✅ Good - Cryptographically secure
const buffer = new Uint32Array(1);
window.crypto.getRandomValues(buffer);

// ❌ Bad - Not cryptographically secure
const random = Math.random();
```

### Input Validation

```typescript
// Always validate
function validateWordCount(count: number): boolean {
  return count >= MIN_WORDS && count <= MAX_WORDS;
}

// Sanitize strings
function sanitizeInput(input: string): string {
  return input.replace(/[<>\"'&]/g, '');
}
```

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear everything and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Type Errors

```bash
# Check types without emitting
npm run type-check

# Update TypeScript
npm install typescript@latest --save-dev
```

### Test Failures

```bash
# Run specific test
npm test -- --run security.test.ts

# Update snapshots (if using)
npm test -- -u
```

### Hot Reload Not Working

```bash
# Restart dev server
# Ctrl+C then npm run dev

# Check Vite config
# Verify vite.config.ts is correct
```

## 📚 Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev)

### Security
- [OWASP](https://owasp.org)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com)

## 🤝 Getting Help

- Read the docs first
- Check existing issues on GitHub
- Ask in discussions
- Create a detailed issue with reproduction

## 📈 Next Steps

1. Understand the architecture
2. Run the project locally
3. Make a small change
4. Write a test
5. Submit a PR
6. Celebrate! 🎉

---

Happy coding! 🚀
