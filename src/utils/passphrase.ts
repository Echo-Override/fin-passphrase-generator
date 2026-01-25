/**
 * Suomalainen salalausegeneraattori
 * Käyttää kryptografisesti turvallista satunnaisuutta
 */

import {
  getSecureRandomNumber,
  generateSecureRandomString,
  calculateEntropy,
  validateWordList,
} from './security';
import { CHARSET, SALT_CONFIG, PASSWORD_CONFIG, SECURITY } from './constants';

export type SaltType = 'number' | 'custom';
export type SaltPosition = 'start' | 'end' | 'random';

export interface PasswordOptions {
  wordCount: number;
  minLength: number;
  separator: string;
  capitalize: boolean;
  useSalt: boolean;
  saltType: SaltType;
  saltLength: number;
  customSalt?: string;
  saltPosition: SaltPosition;
}

export interface GeneratedPassword {
  password: string;
  entropy: number;
  wordCount: number;
  options: PasswordOptions;
}

/**
 * Luo salalauseen annetuilla asetuksilla
 *
 * @param wordList - Sanaluettelo
 * @param options - Salasanan asetukset
 * @returns Generoitu salasana entropian kera
 */
export function generatePassphrase(
  wordList: string[],
  options: PasswordOptions
): GeneratedPassword {
  // Validoi sanaluettelo
  validateWordList(wordList);

  // Validoi asetukset
  if (options.wordCount < 2 || options.wordCount > PASSWORD_CONFIG.MAX_WORDS) {
    throw new Error(
      `Sanojen määrän tulee olla välillä 2-${PASSWORD_CONFIG.MAX_WORDS}`
    );
  }

  if (
    options.minLength < PASSWORD_CONFIG.MIN_LENGTH ||
    options.minLength > PASSWORD_CONFIG.MAX_LENGTH
  ) {
    throw new Error(
      `Pituuden tulee olla välillä ${PASSWORD_CONFIG.MIN_LENGTH}-${PASSWORD_CONFIG.MAX_LENGTH}`
    );
  }

  // Valitse satunnaiset sanat - aloita vähintään wordCount määrällä
  const selectedWords: string[] = [];

  // Lisää ensin vaadittu määrä sanoja
  for (let i = 0; i < options.wordCount; i++) {
    const randomIndex = getSecureRandomNumber(wordList.length);
    const word = wordList[randomIndex]!;
    selectedWords.push(word);
  }

  // Jos salasana on vielä liian lyhyt, lisää sanoja kunnes minLength saavutetaan
  // Rajoita iteraatioita estämään mahdolliset ikuiset silmukat
  const maxIterations = 1000;
  let iterations = 0;
  while (iterations < maxIterations) {
    // Laske nykyinen pituus erottimien kanssa
    let currentLength = 0;
    for (let i = 0; i < selectedWords.length; i++) {
      currentLength += selectedWords[i]!.length;
      if (i > 0) currentLength += options.separator.length;
    }

    if (currentLength >= options.minLength) {
      break;
    }

    // Lisää uusi sana
    const randomIndex = getSecureRandomNumber(wordList.length);
    const word = wordList[randomIndex]!;
    selectedWords.push(word);
    iterations++;
  }

  // Sovella muotoilu (isot alkukirjaimet)
  const formattedWords = selectedWords.map((word) =>
    options.capitalize ? capitalizeWord(word) : word
  );

  // Yhdistä sanat erottimella
  let password = formattedWords.join(options.separator);

  // Lisää suola jos halutaan
  if (options.useSalt) {
    const salt = generateSalt(
      options.saltType,
      options.saltLength,
      options.customSalt
    );
    password = addSaltToPassword(
      password,
      salt,
      options.saltPosition,
      options.separator
    );
  }

  // Validoi salasanan pituus
  if (password.length > SECURITY.MAX_PASSWORD_LENGTH) {
    throw new Error('Salasana on liian pitkä');
  }

  // Laske entropia
  let entropy = calculateEntropy(wordList.length, selectedWords.length);

  // Lisää suolan entropia
  if (options.useSalt) {
    const saltCharsetSize = getSaltCharsetSize(options.saltType);
    const saltLength =
      options.saltType === 'custom' && options.customSalt
        ? options.customSalt.length
        : SALT_CONFIG.LENGTH;
    const saltEntropy = Math.floor(saltLength * Math.log2(saltCharsetSize));
    entropy += saltEntropy;
  }

  return {
    password,
    entropy,
    wordCount: selectedWords.length,
    options,
  };
}

/**
 * Generoi suola annetulla tyypillä
 *
 * @param saltType - Suolan tyyppi
 * @param saltLength - Suolan pituus
 * @param customSalt - Oma suola jos käytetään
 * @returns Suolamerkkijono
 */
function generateSalt(
  saltType: SaltType,
  saltLength: number,
  customSalt?: string
): string {
  // Jos käytetään omaa suolaa, palauta se suoraan
  if (saltType === 'custom') {
    return customSalt || '';
  }

  let charset: string;

  switch (saltType) {
    case 'number':
      charset = CHARSET.NUMBERS;
      break;
    default:
      throw new Error(`Tuntematon suolan tyyppi: ${saltType}`);
  }

  return generateSecureRandomString(charset, saltLength);
}

/**
 * Lisää suolan salasanaan
 *
 * @param password - Perus salasana
 * @param salt - Suola
 * @param position - Suolan sijainti
 * @param separator - Erotinmerkki (korvataan jos position on random)
 * @returns Salasana suolan kera
 */
function addSaltToPassword(
  password: string,
  salt: string,
  position: SaltPosition,
  separator: string
): string {
  switch (position) {
    case 'start':
      return salt + password;
    case 'end':
      return password + salt;
    case 'random': {
      // Valitse satunnainen paikka: alku, loppu tai erottimen paikka
      const positions: Array<{ type: 'start' | 'end' | 'separator'; index?: number }> = [
        { type: 'start' },
        { type: 'end' }
      ];

      // Lisää erottimien paikat jos niitä on
      if (separator && separator.length > 0) {
        const sepRegex = new RegExp(
          separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'g'
        );
        let match;
        while ((match = sepRegex.exec(password)) !== null) {
          positions.push({ type: 'separator', index: match.index });
        }
      }

      // Valitse satunnainen paikka
      const randomPosIndex = getSecureRandomNumber(positions.length);
      const selectedPos = positions[randomPosIndex]!;

      switch (selectedPos.type) {
        case 'start':
          return salt + password;
        case 'end':
          return password + salt;
        case 'separator':
          // Korvaa erotin suolalla
          return (
            password.substring(0, selectedPos.index!) +
            salt +
            password.substring(selectedPos.index! + separator.length)
          );
        default:
          return password + salt;
      }
    }
    default:
      throw new Error(`Tuntematon suolan sijainti: ${position}`);
  }
}

/**
 * Palauttaa suolan merkkijoukon koon
 *
 * @param saltType - Suolan tyyppi
 * @returns Merkkijoukon koko
 */
function getSaltCharsetSize(saltType: SaltType): number {
  switch (saltType) {
    case 'number':
      return CHARSET.NUMBERS.length;
    case 'custom':
      // Custom salt entropy is harder to calculate, use conservative estimate
      return 62; // Assume alphanumeric as a baseline
    default:
      return 0;
  }
}

/**
 * Muuttaa sanan ensimmäisen kirjaimen isoksi
 *
 * @param word - Muutettava sana
 * @returns Sana isolla alkukirjaimella
 */
function capitalizeWord(word: string): string {
  if (!word || word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Luo useita salasanoja kerralla
 *
 * @param wordList - Sanaluettelo
 * @param options - Salasanan asetukset
 * @param count - Luotavien salasanojen määrä
 * @returns Taulukko generoituja salasanoja
 */
export function generateMultiplePasswords(
  wordList: string[],
  options: PasswordOptions,
  count: number
): GeneratedPassword[] {
  if (count <= 0 || count > 100) {
    throw new Error('Määrän tulee olla välillä 1-100');
  }

  const passwords: GeneratedPassword[] = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassphrase(wordList, options));
  }

  return passwords;
}
