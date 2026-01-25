/**
 * Testit security.ts:lle
 */

import { describe, it, expect } from 'vitest';
import {
  getSecureRandomNumber,
  getSecureRandomElement,
  generateSecureRandomString,
  secureArrayShuffle,
  calculateEntropy,
  calculateStrength,
  validateWordList,
  sanitizeInput,
} from '../../utils/security';

describe('Security Utils', () => {
  describe('getSecureRandomNumber', () => {
    it('should generate a number within range', () => {
      const max = 100;
      for (let i = 0; i < 100; i++) {
        const num = getSecureRandomNumber(max);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(max);
      }
    });

    it('should throw error for invalid max', () => {
      expect(() => getSecureRandomNumber(0)).toThrow();
      expect(() => getSecureRandomNumber(-1)).toThrow();
    });
  });

  describe('getSecureRandomElement', () => {
    it('should return an element from the array', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];
      const element = getSecureRandomElement(array);
      expect(array).toContain(element);
    });

    it('should throw error for empty array', () => {
      expect(() => getSecureRandomElement([])).toThrow();
    });
  });

  describe('generateSecureRandomString', () => {
    it('should generate string of correct length', () => {
      const charset = 'abc123';
      const length = 10;
      const str = generateSecureRandomString(charset, length);
      expect(str).toHaveLength(length);
    });

    it('should only use characters from charset', () => {
      const charset = 'abc';
      const str = generateSecureRandomString(charset, 100);
      for (const char of str) {
        expect(charset).toContain(char);
      }
    });

    it('should throw error for invalid inputs', () => {
      expect(() => generateSecureRandomString('abc', 0)).toThrow();
      expect(() => generateSecureRandomString('', 10)).toThrow();
    });
  });

  describe('secureArrayShuffle', () => {
    it('should return array of same length', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffled = secureArrayShuffle(array);
      expect(shuffled).toHaveLength(array.length);
    });

    it('should contain all original elements', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffled = secureArrayShuffle(array);
      for (const item of array) {
        expect(shuffled).toContain(item);
      }
    });

    it('should not modify original array', () => {
      const array = [1, 2, 3, 4, 5];
      const original = [...array];
      secureArrayShuffle(array);
      expect(array).toEqual(original);
    });
  });

  describe('calculateEntropy', () => {
    it('should calculate entropy correctly', () => {
      const entropy = calculateEntropy(7776, 4); // EFF Diceware: 4 words
      expect(entropy).toBeGreaterThan(0);
      expect(entropy).toBe(Math.floor(4 * Math.log2(7776)));
    });

    it('should return 0 for invalid inputs', () => {
      expect(calculateEntropy(0, 4)).toBe(0);
      expect(calculateEntropy(100, 0)).toBe(0);
      expect(calculateEntropy(-1, 4)).toBe(0);
    });
  });

  describe('calculateStrength', () => {
    it('should calculate strength percentage', () => {
      expect(calculateStrength(77)).toBe(100);
      expect(calculateStrength(38.5)).toBe(50);
      expect(calculateStrength(0)).toBe(0);
    });

    it('should handle high entropy values', () => {
      expect(calculateStrength(154)).toBeGreaterThan(100);
    });
  });

  describe('validateWordList', () => {
    it('should validate correct word list', () => {
      const words = Array.from({ length: 1000 }, (_, i) => `word${i}`);
      expect(() => validateWordList(words)).not.toThrow();
    });

    it('should throw for non-array', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => validateWordList('not an array' as any)).toThrow();
    });

    it('should throw for too few words', () => {
      const words = Array.from({ length: 100 }, (_, i) => `word${i}`);
      expect(() => validateWordList(words)).toThrow();
    });

    it('should throw for invalid word types', () => {
      const words = Array.from({ length: 1000 }, (_, i) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i < 500 ? `word${i}` : (123 as any)
      );
      expect(() => validateWordList(words)).toThrow();
    });

    it('should throw for duplicate words', () => {
      const words = Array.from({ length: 1000 }, () => 'duplicate');
      expect(() => validateWordList(words)).toThrow();
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).not.toContain('<');
      expect(sanitizeInput('test"value')).not.toContain('"');
      expect(sanitizeInput("test'value")).not.toContain("'");
    });

    it('should handle non-string input', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(sanitizeInput(123 as any)).toBe('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(sanitizeInput(null as any)).toBe('');
    });

    it('should preserve safe characters', () => {
      const safe = 'safe-text_123';
      expect(sanitizeInput(safe)).toBe(safe);
    });
  });
});
