/**
 * PasswordDisplay-komponentti salasanan näyttämiseen ja kopiointiin
 */

import React from 'react';
import { Copy, Check, RotateCw } from 'lucide-react';
import { UI_TEXT, STRENGTH_LEVELS } from '../utils/constants';
import { calculateStrength } from '../utils/security';

interface PasswordDisplayProps {
  password: string;
  entropy: number;
  onCopy: () => void;
  onRegenerate: () => void;
  isCopied: boolean;
  isLoading: boolean;
}

export const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  entropy,
  onCopy,
  onRegenerate,
  isCopied,
  isLoading,
}) => {
  const strengthPercentage = calculateStrength(entropy);

  // Määritä vahvuustaso
  type StrengthLevel =
    | typeof STRENGTH_LEVELS.WEAK
    | typeof STRENGTH_LEVELS.FAIR
    | typeof STRENGTH_LEVELS.GOOD
    | typeof STRENGTH_LEVELS.STRONG;
  let strengthLevel: StrengthLevel = STRENGTH_LEVELS.WEAK;
  if (strengthPercentage >= STRENGTH_LEVELS.STRONG.min) {
    strengthLevel = STRENGTH_LEVELS.STRONG;
  } else if (strengthPercentage >= STRENGTH_LEVELS.GOOD.min) {
    strengthLevel = STRENGTH_LEVELS.GOOD;
  } else if (strengthPercentage >= STRENGTH_LEVELS.FAIR.min) {
    strengthLevel = STRENGTH_LEVELS.FAIR;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        {UI_TEXT.PASSWORD_TITLE}
      </h2>

      {/* Salasana */}
      <div className="mb-4">
        <div className="relative">
          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 pr-20 min-h-[60px] flex items-center">
            {isLoading ? (
              <div className="text-gray-400 dark:text-gray-500 text-sm">
                Ladataan...
              </div>
            ) : (
              <div className="font-mono text-base break-all text-gray-900 dark:text-white selection:bg-primary-200 dark:selection:bg-primary-700">
                {password || 'Luo salasana'}
              </div>
            )}
          </div>

          {/* Toimintopainikkeet */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="p-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={UI_TEXT.REGENERATE_BUTTON}
              title={UI_TEXT.REGENERATE_BUTTON}
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={onCopy}
              disabled={!password || isLoading}
              className="p-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={UI_TEXT.COPY_BUTTON}
              title={UI_TEXT.COPY_BUTTON}
            >
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {isCopied && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            {UI_TEXT.COPIED_MESSAGE}
          </p>
        )}
      </div>

      {/* Entropia ja vahvuus */}
      <div className="space-y-2">
        {/* Entropia */}
        <div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {UI_TEXT.ENTROPY_LABEL}
            </span>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {entropy} {UI_TEXT.ENTROPY_UNIT}
            </span>
          </div>
        </div>

        {/* Vahvuus */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {UI_TEXT.STRENGTH_LABEL}
            </span>
            <span
              className={`text-xs font-semibold ${strengthLevel.color} dark:opacity-90`}
            >
              {strengthLevel.label} ({strengthPercentage}%)
            </span>
          </div>

          {/* Vahvuuspalkki */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${strengthLevel.bgColor} transition-all duration-300`}
              style={{ width: `${Math.min(strengthPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
