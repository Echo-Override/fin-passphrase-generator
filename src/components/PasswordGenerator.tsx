/**
 * PasswordGenerator - Pääkomponentti salasanageneraattorille
 */

import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';
import { PasswordDisplay } from './PasswordDisplay';
import { Settings } from './Settings';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { UI_TEXT } from '../utils/constants';

export const PasswordGenerator: React.FC = () => {
  const {
    password,
    entropy,
    isLoading,
    error,
    generatePassword,
    updateOptions,
    options,
  } = usePasswordGenerator();

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    if (password) {
      copyToClipboard(password);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Otsikko */}
      <div className="flex items-center justify-center mb-8">
        <Shield className="w-7 h-7 text-primary-600 dark:text-primary-400 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {UI_TEXT.APP_TITLE}
        </h1>
      </div>
      {/* Virheilmoitus */}
      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold text-red-800 dark:text-red-300 mb-0.5">
              Virhe
            </h3>
            <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Salasanan näyttö */}
        <div>
          <PasswordDisplay
            password={password}
            entropy={entropy}
            onCopy={handleCopy}
            onRegenerate={generatePassword}
            isCopied={isCopied}
            isLoading={isLoading}
          />
        </div>

        {/* Asetukset */}
        <div>
          <Settings options={options} onUpdateOptions={updateOptions} />
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        Sanaluettelo:{' '}
        <a
          href="https://kaino.kotus.fi/sanat/nykysuomi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Nykysuomen sanalista
        </a>
        {' '}(Kotimaisten kielten keskus,{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          CC BY 4.0
        </a>
        )
      </p>
    </div>
  );
};
