/**
 * Hook salasanan generoimiseen ja sanaluettelon hallintaan
 */

import { useState, useEffect, useCallback } from 'react';
import {
  generatePassphrase,
  type PasswordOptions,
  type GeneratedPassword,
} from '../utils/passphrase';
import {
  calculateEntropy,
  getSecureRandomNumber,
  generateSecureRandomString,
} from '../utils/security';
import {
  API_CONFIG,
  PASSWORD_CONFIG,
  SALT_CONFIG,
  CHARSET,
} from '../utils/constants';
import { useLocalStorage } from './useLocalStorage';

interface UsePasswordGeneratorResult {
  password: string;
  entropy: number;
  isLoading: boolean;
  error: string | null;
  wordList: string[];
  generatePassword: () => void;
  updateOptions: (options: Partial<PasswordOptions>) => void;
  options: PasswordOptions;
}

const defaultOptions: PasswordOptions = {
  wordCount: PASSWORD_CONFIG.MIN_WORDS,
  minLength: PASSWORD_CONFIG.MIN_LENGTH,
  separator: '-',
  capitalize: true,
  useSalt: false,
  saltType: 'number',
  saltLength: 1,
  saltPosition: 'end',
};

const STORAGE_KEY = 'passwordGeneratorSettings';

/**
 * Calculate entropy for current options without generating password
 */
function calculateEntropyForOptions(
  wordListSize: number,
  options: PasswordOptions,
  wordCount: number
): number {
  let entropy = calculateEntropy(wordListSize, wordCount);

  if (options.useSalt) {
    let saltCharsetSize: number;
    switch (options.saltType) {
      case 'number':
        saltCharsetSize = CHARSET.NUMBERS.length;
        break;
      case 'custom':
        saltCharsetSize = 62; // Conservative estimate
        break;
      default:
        saltCharsetSize = 1;
    }

    const saltLength =
      options.saltType === 'custom' && options.customSalt
        ? options.customSalt.length
        : SALT_CONFIG.LENGTH;

    const saltEntropy = Math.floor(saltLength * Math.log2(saltCharsetSize));
    entropy += saltEntropy;
  }

  return entropy;
}

/**
 * Hook salasanageneraattorin logiikalle
 */
export function usePasswordGenerator(): UsePasswordGeneratorResult {
  const [wordList, setWordList] = useState<string[]>([]);
  const [baseWords, setBaseWords] = useState<string[]>([]); // Store selected words
  const [password, setPassword] = useState<string>('');
  const [entropy, setEntropy] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use localStorage to persist user settings
  const [options, setOptions] = useLocalStorage<PasswordOptions>(
    STORAGE_KEY,
    defaultOptions
  );

  // Lataa sanaluettelo
  useEffect(() => {
    const loadWordList = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          API_CONFIG.TIMEOUT
        );

        const response = await fetch(API_CONFIG.WORDS_ENDPOINT, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.words || !Array.isArray(data.words)) {
          throw new Error('Virheellinen sanaluettelo');
        }

        setWordList(data.words);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('Sanaluettelon lataus aikakatkaistiin');
          } else {
            setError(`Virhe sanaluettelon lataamisessa: ${err.message}`);
          }
        } else {
          setError('Tuntematon virhe sanaluettelon lataamisessa');
        }
        console.error('Error loading word list:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWordList();
  }, []);

  // Generoi salasana
  const generatePassword = useCallback(() => {
    if (wordList.length === 0) {
      setError('Sanaluetteloa ei ole ladattu');
      return;
    }

    try {
      setError(null);
      const result: GeneratedPassword = generatePassphrase(
        wordList,
        options
      );

      // Store the base words (lowercase) - regenerate to match the count
      const newBaseWords: string[] = [];
      for (let i = 0; i < result.wordCount; i++) {
        const randomIndex = getSecureRandomNumber(wordList.length);
        const word = wordList[randomIndex]!;
        newBaseWords.push(word);
      }

      setBaseWords(newBaseWords);
      setPassword(result.password);
      setEntropy(result.entropy);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Virhe salasanan luomisessa: ${err.message}`);
      } else {
        setError('Tuntematon virhe salasanan luomisessa');
      }
      console.error('Error generating password:', err);
    }
  }, [wordList, options]);

  // Generoi salasana automaattisesti kun sanaluettelo on ladattu
  useEffect(() => {
    if (wordList.length > 0 && !password) {
      generatePassword();
    }
  }, [wordList, password, generatePassword]);

  // Reformat password when options change (without generating new words)
  const reformatPassword = useCallback(
    (words: string[], opts: PasswordOptions) => {
      if (words.length === 0) return;

      try {
        // Use at least wordCount words, but add more if needed for minLength
        let neededWords = words.slice(0, opts.wordCount);

        // Check if we need more words to satisfy minLength
        let wordIndex = opts.wordCount;
        let testLength = 0;

        neededWords.forEach((word, idx) => {
          testLength += word.length + (idx > 0 ? opts.separator.length : 0);
        });

        // Add more words if current length is less than minLength
        while (testLength < opts.minLength && wordIndex < words.length) {
          const word = words[wordIndex]!;
          neededWords.push(word);
          testLength += word.length + opts.separator.length;
          wordIndex++;
        }

        // If we don't have enough words in baseWords, we need to regenerate
        if (
          neededWords.length < opts.wordCount ||
          testLength < opts.minLength
        ) {
          // Will trigger full regeneration
          return;
        }

        // Apply capitalization
        const processedWords = opts.capitalize
          ? neededWords.map(
              (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            )
          : neededWords;

        // Join with separator
        let pwd = processedWords.join(opts.separator);

        // Add salt if needed
        if (opts.useSalt) {
          const salt =
            opts.saltType === 'custom' && opts.customSalt
              ? opts.customSalt
              : generateSecureRandomString(CHARSET.NUMBERS, opts.saltLength);

          // Apply salt position
          switch (opts.saltPosition) {
            case 'start':
              pwd = salt + pwd;
              break;
            case 'end':
              pwd = pwd + salt;
              break;
            case 'random': {
              // Choose random position: start, end, or separator location
              const positions: Array<{ type: 'start' | 'end' | 'separator'; index?: number }> = [
                { type: 'start' },
                { type: 'end' }
              ];

              // Add separator positions if they exist
              if (opts.separator && opts.separator.length > 0 && processedWords.length >= 2) {
                const sepRegex = new RegExp(
                  opts.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                  'g'
                );
                let match;
                while ((match = sepRegex.exec(pwd)) !== null) {
                  positions.push({ type: 'separator', index: match.index });
                }
              }

              // Choose random position
              const randomPosIndex = getSecureRandomNumber(positions.length);
              const selectedPos = positions[randomPosIndex]!;

              switch (selectedPos.type) {
                case 'start':
                  pwd = salt + pwd;
                  break;
                case 'end':
                  pwd = pwd + salt;
                  break;
                case 'separator':
                  // Replace separator with salt
                  pwd =
                    pwd.substring(0, selectedPos.index!) +
                    salt +
                    pwd.substring(selectedPos.index! + opts.separator.length);
                  break;
              }
              break;
            }
          }
        }

        setPassword(pwd);
        setEntropy(
          calculateEntropyForOptions(wordList.length, opts, neededWords.length)
        );
      } catch (err) {
        console.error('Error reformatting password:', err);
      }
    },
    [wordList.length]
  );

  // Päivitä asetuksia
  const updateOptions = useCallback(
    (newOptions: Partial<PasswordOptions>) => {
      setOptions((prev) => {
        const updated = { ...prev, ...newOptions };

        // Check if we need to regenerate or reformat
        const wordCountChanged =
          newOptions.wordCount !== undefined &&
          newOptions.wordCount !== prev.wordCount;
        const needsRegeneration =
          // wordCount changed beyond what we have
          (wordCountChanged && newOptions.wordCount! > baseWords.length) ||
          // minLength increased and current words can't satisfy it
          (newOptions.minLength !== undefined &&
            newOptions.minLength > prev.minLength &&
            (() => {
              let totalLength = 0;
              baseWords.forEach((word, idx) => {
                totalLength +=
                  word.length + (idx > 0 ? updated.separator.length : 0);
              });
              return totalLength < newOptions.minLength;
            })());

        if (needsRegeneration) {
          // Will trigger regeneration via useEffect
          return updated;
        }

        // If word count changed but we have enough words, just reformat
        if (baseWords.length > 0) {
          reformatPassword(baseWords, updated);
        }

        return updated;
      });
    },
    [baseWords, reformatPassword, setOptions]
  );

  // Regenerate password when wordCount or minLength requires it
  useEffect(() => {
    if (wordList.length > 0 && baseWords.length > 0) {
      // Calculate if current base words can satisfy both requirements
      let totalLength = 0;
      baseWords.forEach((word, idx) => {
        totalLength += word.length + (idx > 0 ? options.separator.length : 0);
      });

      // Regenerate if:
      // 1. We don't have enough words for wordCount
      // 2. Current words can't satisfy minLength
      if (
        baseWords.length < options.wordCount ||
        totalLength < options.minLength
      ) {
        generatePassword();
      }
    }
  }, [
    options.wordCount,
    options.minLength,
    wordList.length,
    baseWords,
    options.separator.length,
    generatePassword,
  ]);

  return {
    password,
    entropy,
    isLoading,
    error,
    wordList,
    generatePassword,
    updateOptions,
    options,
  };
}
