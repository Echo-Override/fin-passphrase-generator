/**
 * Testit passphrase.ts:lle
 */

import { describe, it, expect } from 'vitest';
import {
  generatePassphrase,
  generateMultiplePasswords,
  type PasswordOptions,
} from '../../utils/passphrase';

describe('Passphrase Generator', () => {
  const mockWordList = Array.from({ length: 7776 }, (_, i) => `word${i}`);

  const defaultOptions: PasswordOptions = {
    wordCount: 4,
    minLength: 20,
    separator: '-',
    capitalize: true,
    useSalt: false,
    saltType: 'number',
    saltLength: 1,
    saltPosition: 'end',
  };

  describe('generatePassphrase', () => {
    it('should generate password with at least wordCount words', () => {
      const result = generatePassphrase(mockWordList, defaultOptions);
      const words = result.password.split('-');
      expect(words.length).toBeGreaterThanOrEqual(defaultOptions.wordCount);
    });

    it('should generate password with minimum length', () => {
      const result = generatePassphrase(mockWordList, defaultOptions);
      expect(result.password.length).toBeGreaterThanOrEqual(
        defaultOptions.minLength
      );
    });

    it('should capitalize words when option is true', () => {
      const result = generatePassphrase(mockWordList, {
        ...defaultOptions,
        capitalize: true,
      });
      const words = result.password.split('-');
      words.forEach((word) => {
        expect(word[0]).toBe(word[0]?.toUpperCase());
      });
    });

    it('should not capitalize when option is false', () => {
      const result = generatePassphrase(mockWordList, {
        ...defaultOptions,
        capitalize: false,
      });
      const words = result.password.split('-');
      const hasLowerCase = words.some(
        (word) => word[0] === word[0]?.toLowerCase()
      );
      expect(hasLowerCase).toBe(true);
    });

    it('should use correct separator', () => {
      const separators = ['-', '_', '.', ' ', ''];
      separators.forEach((sep) => {
        const result = generatePassphrase(mockWordList, {
          ...defaultOptions,
          separator: sep,
        });
        if (sep) {
          expect(result.password).toContain(sep);
        }
      });
    });

    it('should add salt when enabled', () => {
      const result = generatePassphrase(mockWordList, {
        ...defaultOptions,
        useSalt: true,
        saltType: 'number',
      });
      // Check that password has additional characters (salt)
      const baseParts = result.password.split(/[0-9]+/);
      expect(baseParts.length).toBeGreaterThan(1);
    });

    it('should calculate entropy correctly', () => {
      const result = generatePassphrase(mockWordList, defaultOptions);
      const expectedEntropy = Math.floor(result.wordCount * Math.log2(7776));
      expect(result.entropy).toBe(expectedEntropy);
    });

    it('should throw error for invalid word count', () => {
      expect(() =>
        generatePassphrase(mockWordList, {
          ...defaultOptions,
          wordCount: 1,
        })
      ).toThrow();

      expect(() =>
        generatePassphrase(mockWordList, {
          ...defaultOptions,
          wordCount: 20,
        })
      ).toThrow();
    });

    it('should throw error for invalid minimum length', () => {
      expect(() =>
        generatePassphrase(mockWordList, {
          ...defaultOptions,
          minLength: 5,
        })
      ).toThrow();

      expect(() =>
        generatePassphrase(mockWordList, {
          ...defaultOptions,
          minLength: 100,
        })
      ).toThrow();
    });

    it('should throw error for invalid word list', () => {
      expect(() => generatePassphrase([], defaultOptions)).toThrow();

      expect(() =>
        generatePassphrase(
          Array.from({ length: 100 }, (_, i) => `word${i}`),
          defaultOptions
        )
      ).toThrow();
    });
  });

  describe('generateMultiplePasswords', () => {
    it('should generate correct number of passwords', () => {
      const count = 5;
      const results = generateMultiplePasswords(
        mockWordList,
        defaultOptions,
        count
      );
      expect(results).toHaveLength(count);
    });

    it('should generate unique passwords', () => {
      const results = generateMultiplePasswords(
        mockWordList,
        defaultOptions,
        10
      );
      const passwords = results.map((r) => r.password);
      const uniquePasswords = new Set(passwords);
      // While theoretically possible to get duplicates, it's extremely unlikely
      expect(uniquePasswords.size).toBeGreaterThan(8);
    });

    it('should throw error for invalid count', () => {
      expect(() =>
        generateMultiplePasswords(mockWordList, defaultOptions, 0)
      ).toThrow();

      expect(() =>
        generateMultiplePasswords(mockWordList, defaultOptions, 101)
      ).toThrow();
    });
  });
});
