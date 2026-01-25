/**
 * Hook tumman tilan hallintaan
 */

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

interface UseDarkModeResult {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

/**
 * Hook tumman tilan hallintaan
 */
export function useDarkMode(): UseDarkModeResult {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setDarkMode = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return {
    isDarkMode: theme === 'dark',
    toggleDarkMode,
    setDarkMode,
  };
}
