import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.crypto for tests
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: (buffer: Uint32Array) => {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 4294967296);
      }
      return buffer;
    },
  },
  writable: true,
});

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: async (_text: string) => {
      return Promise.resolve();
    },
    readText: async () => {
      return Promise.resolve('');
    },
  },
});

// Suppress console errors in tests (optional)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
};
