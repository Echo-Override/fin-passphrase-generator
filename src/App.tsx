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
    <div className="min-h-screen flex flex-col bg-slate-300 dark:bg-gray-900">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors shadow-lg border border-slate-400 dark:border-gray-700"
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
    </div>
  );
}

export default App;
