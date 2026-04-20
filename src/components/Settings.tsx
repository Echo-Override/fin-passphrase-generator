/**
 * Settings-komponentti salasanan asetusten hallintaan
 */

import React from 'react';
import {
  UI_TEXT,
  PASSWORD_CONFIG,
  SALT_CONFIG,
  SALT_TYPE_LABELS,
  SALT_POSITION_LABELS,
} from '../utils/constants';
import type { PasswordOptions } from '../utils/passphrase';

interface SettingsProps {
  options: PasswordOptions;
  onUpdateOptions: (options: Partial<PasswordOptions>) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  options,
  onUpdateOptions,
}) => {
  return (
    <div className="bg-slate-200 dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-slate-500 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        {UI_TEXT.SETTINGS_TITLE}
      </h2>

      <div className="space-y-3">
        {/* Sanat ja Pituus - samalla rivillä */}
        <div className="grid grid-cols-2 gap-3">
          {/* Sanojen määrä */}
          <div>
            <label
              htmlFor="wordCount"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {UI_TEXT.WORD_COUNT_LABEL}: {options.wordCount}
            </label>
            <input
              type="range"
              id="wordCount"
              min={PASSWORD_CONFIG.MIN_WORDS}
              max={PASSWORD_CONFIG.MAX_WORDS}
              value={options.wordCount}
              onChange={(e) =>
                onUpdateOptions({ wordCount: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-slate-400 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Vähimmäispituus */}
          <div>
            <label
              htmlFor="minLength"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {UI_TEXT.MIN_LENGTH_LABEL}: {options.minLength}
            </label>
            <input
              type="range"
              id="minLength"
              min={PASSWORD_CONFIG.MIN_LENGTH}
              max={PASSWORD_CONFIG.MAX_LENGTH}
              value={options.minLength}
              onChange={(e) =>
                onUpdateOptions({ minLength: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-slate-400 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
        </div>

        {/* Erotinmerkki */}
        <div>
          <label
            htmlFor="separator"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {UI_TEXT.SEPARATOR_LABEL}
          </label>
          <input
            type="text"
            id="separator"
            value={options.separator}
            onChange={(e) => onUpdateOptions({ separator: e.target.value })}
            placeholder="-"
            maxLength={3}
            className="w-full px-2 py-1.5 text-sm bg-slate-50 dark:bg-gray-700 border border-slate-500 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Valinnat samalla rivillä */}
        <div className="flex items-center gap-4 pt-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="capitalize"
              checked={options.capitalize}
              onChange={(e) =>
                onUpdateOptions({ capitalize: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-gray-700 border-slate-500 dark:border-gray-600 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {UI_TEXT.CAPITALIZE_LABEL}
            </span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="useSalt"
              checked={options.useSalt}
              onChange={(e) => onUpdateOptions({ useSalt: e.target.checked })}
              className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-gray-700 border-slate-500 dark:border-gray-600 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {UI_TEXT.USE_SALT_LABEL}
            </span>
          </label>
        </div>

        {/* Suolan asetukset */}
        {options.useSalt && (
          <div className="space-y-3 pt-2 border-t border-slate-400 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="saltType"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {UI_TEXT.SALT_TYPE_LABEL}
                </label>
                <select
                  id="saltType"
                  value={options.saltType}
                  onChange={(e) =>
                    onUpdateOptions({
                      saltType: e.target.value as PasswordOptions['saltType'],
                    })
                  }
                  className="w-full px-2 py-1.5 text-sm bg-slate-50 dark:bg-gray-700 border border-slate-500 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="number">{SALT_TYPE_LABELS.number}</option>
                  <option value="custom">{SALT_TYPE_LABELS.custom}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="saltPosition"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {UI_TEXT.SALT_POSITION_LABEL}
                </label>
                <select
                  id="saltPosition"
                  value={options.saltPosition}
                  onChange={(e) =>
                    onUpdateOptions({
                      saltPosition: e.target
                        .value as PasswordOptions['saltPosition'],
                    })
                  }
                  className="w-full px-2 py-1.5 text-sm bg-slate-50 dark:bg-gray-700 border border-slate-500 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="start">{SALT_POSITION_LABELS.start}</option>
                  <option value="end">{SALT_POSITION_LABELS.end}</option>
                  <option value="random">{SALT_POSITION_LABELS.random}</option>
                </select>
              </div>
            </div>

            {options.saltType === 'number' && (
              <div className="w-1/2">
                <label
                  htmlFor="saltLength"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {UI_TEXT.SALT_LENGTH_LABEL}: {options.saltLength}
                </label>
                <input
                  type="range"
                  id="saltLength"
                  min={SALT_CONFIG.MIN_LENGTH}
                  max={SALT_CONFIG.MAX_LENGTH}
                  value={options.saltLength}
                  onChange={(e) =>
                    onUpdateOptions({ saltLength: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-slate-400 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            )}

            {options.saltType === 'custom' && (
              <div>
                <input
                  type="text"
                  placeholder={UI_TEXT.CUSTOM_SALT_PLACEHOLDER}
                  value={options.customSalt || ''}
                  onChange={(e) =>
                    onUpdateOptions({ customSalt: e.target.value })
                  }
                  maxLength={20}
                  className="w-full px-2 py-1.5 text-sm bg-slate-50 dark:bg-gray-700 border border-slate-500 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
