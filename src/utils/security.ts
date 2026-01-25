/**
 * Turvallisuustyökalut kryptografisesti turvallisten salasanojen luomiseen
 */

/**
 * Luo kryptografisesti turvallisen satunnaisluvun välillä 0 - max (exclusive)
 * Käyttää Web Crypto API:ta
 *
 * @param max - Maksimiarvo (ei sisälly)
 * @returns Satunnaisluku välillä 0 - (max - 1)
 */
export function getSecureRandomNumber(max: number): number {
  if (max <= 0) {
    throw new Error('Max-arvon tulee olla positiivinen');
  }

  if (!window.crypto || !window.crypto.getRandomValues) {
    throw new Error('Web Crypto API ei ole käytettävissä');
  }

  // Käytetään rejection sampling -menetelmää tasaisen jakauman varmistamiseksi
  const randomBuffer = new Uint32Array(1);
  const max32 = 2 ** 32;
  const range = max32 - (max32 % max);

  let randomValue: number;
  do {
    window.crypto.getRandomValues(randomBuffer);
    randomValue = randomBuffer[0]!;
  } while (randomValue >= range);

  return randomValue % max;
}

/**
 * Valitsee satunnaisen elementin taulukosta turvallisesti
 *
 * @param array - Taulukko, josta valitaan
 * @returns Satunnainen elementti taulukosta
 */
export function getSecureRandomElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Taulukko ei voi olla tyhjä');
  }

  const randomIndex = getSecureRandomNumber(array.length);
  return array[randomIndex]!;
}

/**
 * Luo satunnaisen merkkijonon annetusta merkkijoukosta
 *
 * @param charset - Merkkijono, josta merkit valitaan
 * @param length - Palautettavan merkkijonon pituus
 * @returns Satunnainen merkkijono
 */
export function generateSecureRandomString(
  charset: string,
  length: number
): string {
  if (length <= 0) {
    throw new Error('Pituuden tulee olla positiivinen');
  }

  if (charset.length === 0) {
    throw new Error('Merkkijoukko ei voi olla tyhjä');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getSecureRandomNumber(charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Sekoittaa taulukon elementit turvallisesti (Fisher-Yates shuffle)
 *
 * @param array - Sekoitettava taulukko
 * @returns Uusi sekoitettu taulukko
 */
export function secureArrayShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomNumber(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  return shuffled;
}

/**
 * Laskee entropian biteissä sanaluettelon koolle ja sanojen määrälle
 *
 * @param wordListSize - Sanaluettelon koko
 * @param wordCount - Käytettyjen sanojen määrä
 * @returns Entropia biteissä
 */
export function calculateEntropy(
  wordListSize: number,
  wordCount: number
): number {
  if (wordListSize <= 0 || wordCount <= 0) {
    return 0;
  }

  // Entropia = log2(mahdollisuuksien määrä)
  // = log2(wordListSize^wordCount)
  // = wordCount * log2(wordListSize)
  return Math.floor(wordCount * Math.log2(wordListSize));
}

/**
 * Laskee salasanan vahvuuden entropian perusteella
 *
 * @param entropy - Entropian määrä biteissä
 * @returns Vahvuusprosentti (0-100+)
 */
export function calculateStrength(entropy: number): number {
  // Skaalataan entropia prosenteiksi
  // 77 bittiä = 100% (suositeltu minimi vahva salasana)
  const recommendedBits = 77;
  return Math.floor((entropy / recommendedBits) * 100);
}

/**
 * Validoi sanaluettelon
 *
 * @param words - Validoitava sanaluettelo
 * @throws Error jos validointi epäonnistuu
 */
export function validateWordList(words: string[]): void {
  if (!Array.isArray(words)) {
    throw new Error('Sanaluettelon tulee olla taulukko');
  }

  if (words.length < 1000) {
    throw new Error('Sanaluettelon tulee sisältää vähintään 1000 sanaa');
  }

  // Tarkista että kaikki elementit ovat merkkijonoja
  if (!words.every((word) => typeof word === 'string' && word.length > 0)) {
    throw new Error('Kaikki sanojen tulee olla ei-tyhjiä merkkijonoja');
  }

  // Tarkista duplikaatit
  const uniqueWords = new Set(words);
  if (uniqueWords.size !== words.length) {
    throw new Error('Sanaluettelossa on duplikaatteja');
  }
}

/**
 * Puhdistaa arkaluontoisen datan muistista
 * Huom: Tämä on "best effort" - JavaScript ei tarjoa takuita muistin puhdistamisesta
 *
 * @param data - Puhdistettava merkkijono
 */
export function clearSensitiveData(data: string): void {
  // Yritä nollata muisti
  if (data) {
    // TypeScript/JavaScript ei voi oikeasti muokata immutable stringejä,
    // mutta asetamme viitteen null:ksi
    data = '';
  }
}

/**
 * Sanitoi käyttäjän syöte
 *
 * @param input - Sanitoitava syöte
 * @returns Sanitoitu merkkijono
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Poista vaaralliset merkit
  return input.replace(/[<>"'&]/g, '');
}
