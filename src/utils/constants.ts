/**
 * Sovelluksen vakiot ja konfiguraatio
 */

// Salasanan asetukset
export const PASSWORD_CONFIG = {
  MIN_WORDS: 2,
  MAX_WORDS: 10,
  DEFAULT_WORDS: 4,
  MIN_LENGTH: 12,
  MAX_LENGTH: 50,
  DEFAULT_LENGTH: 20,
  MIN_ENTROPY_BITS: 50,
  RECOMMENDED_ENTROPY_BITS: 77,
} as const;

// Suolan asetukset
export const SALT_CONFIG = {
  LENGTH: 3,
  MIN_LENGTH: 1,
  MAX_LENGTH: 4,
  DEFAULT_LENGTH: 1,
  TYPES: {
    NUMBER: 'number',
    SPECIAL: 'special',
    ALPHANUMERIC: 'alphanumeric',
  } as const,
  POSITIONS: {
    START: 'start',
    END: 'end',
    RANDOM: 'random',
  } as const,
} as const;

// Merkkijoukot suolalle
export const CHARSET = {
  NUMBERS: '0123456789',
  SPECIAL: '!@#$%&*-_+=',
  ALPHANUMERIC:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
} as const;

// Erotinmerkit
export const SEPARATORS = [
  { value: '-', label: 'Viiva (-)' },
  { value: ' ', label: 'Välilyönti ( )' },
  { value: '_', label: 'Alaviiva (_)' },
  { value: '.', label: 'Piste (.)' },
  { value: ',', label: 'Pilkku (,)' },
  { value: '', label: 'Ei erotinta' },
  { value: 'custom', label: 'Oma merkki...' },
] as const;

// Salasanan vahvuuden luokittelut
export const STRENGTH_LEVELS = {
  WEAK: {
    min: 0,
    max: 50,
    label: 'Heikko',
    color: 'text-red-600',
    bgColor: 'bg-red-500',
  },
  FAIR: {
    min: 51,
    max: 76,
    label: 'Tyydyttävä',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500',
  },
  GOOD: {
    min: 77,
    max: 99,
    label: 'Hyvä',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
  },
  STRONG: {
    min: 100,
    max: Infinity,
    label: 'Erittäin vahva',
    color: 'text-green-600',
    bgColor: 'bg-green-500',
  },
} as const;

// UI tekstit
export const UI_TEXT = {
  APP_TITLE: 'Suomenkielinen Salalausegeneraattori',
  APP_DESCRIPTION:
    'Luo turvallisia ja helposti muistettavia salasanoja suomalaisilla sanoilla.',
  GENERATE_BUTTON: 'Luo salasana',
  REGENERATE_BUTTON: 'Luo uusi',
  COPY_BUTTON: 'Kopioi',
  COPIED_MESSAGE: 'Kopioitu!',
  WORD_COUNT_LABEL: 'Sanat',
  MIN_LENGTH_LABEL: 'Vähimmäispituus',
  SEPARATOR_LABEL: 'Erotin',
  CUSTOM_SEPARATOR_LABEL: 'Oma erotinmerkki',
  CUSTOM_SEPARATOR_PLACEHOLDER: 'Kirjoita oma merkki...',
  CAPITALIZE_LABEL: 'Isot alkukirjaimet',
  USE_SALT_LABEL: 'Käytä suolaa (lisämerkit)',
  SALT_TYPE_LABEL: 'Suolan tyyppi',
  SALT_LENGTH_LABEL: 'Numeromäärä',
  CUSTOM_SALT_LABEL: 'Oma suola',
  CUSTOM_SALT_PLACEHOLDER: 'Kirjoita oma merkkijono...',
  SALT_POSITION_LABEL: 'Suolan sijainti',
  ENTROPY_LABEL: 'Entropia',
  ENTROPY_UNIT: 'bittiä',
  STRENGTH_LABEL: 'Vahvuus',
  DARK_MODE: 'Tumma tila',
  LIGHT_MODE: 'Vaalea tila',
  SETTINGS_TITLE: 'Asetukset',
  PASSWORD_TITLE: 'Salasanasi',
  ERROR_LOADING_WORDS: 'Virhe sanojen lataamisessa',
  ERROR_GENERATING: 'Virhe salasanan luomisessa',
} as const;

// Suola tyypit (lokalisoitu)
export const SALT_TYPE_LABELS = {
  number: 'Numerot',
  custom: 'Oma',
} as const;

// Suolan sijainnit (lokalisoitu)
export const SALT_POSITION_LABELS = {
  start: 'Alussa',
  end: 'Lopussa',
  random: 'Satunnaisesti',
} as const;

// API konfiguraatio
export const API_CONFIG = {
  WORDS_ENDPOINT: '/api/words',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Turvallisuusasetukset
export const SECURITY = {
  CLEAR_CLIPBOARD_DELAY: 60000, // 60 sekuntia
  MAX_PASSWORD_LENGTH: 1000,
  WORD_LIST_MIN_SIZE: 1000,
} as const;
