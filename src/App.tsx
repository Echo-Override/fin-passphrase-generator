/**
 * App.tsx - Pääsovellus
 */
import { PasswordGenerator } from './components/PasswordGenerator';
import { useDarkMode } from './hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';
import { UI_TEXT } from './utils/constants';

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
        aria-label={isDarkMode ? UI_TEXT.LIGHT_MODE : UI_TEXT.DARK_MODE}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <PasswordGenerator />
      </main>
      <footer className="py-6 px-4 text-center space-y-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Sanaluettelo: Muokattu versio{' '}
          <a
            href="https://kaino.kotus.fi/sanat/nykysuomi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Nykysuomen sanalistasta
          </a>{' '}
          (Kotimaisten kielten keskus,{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            CC BY 4.0
          </a>
          )
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Ohjelma: Juha Heikkinen (Sasky MSKK - Tekoälyn perusteet kurssille) -
          2026
        </p>
      </footer>
    </div>
  );
}

export default App;
