/**
 * Hook leikepöydälle kopioimiseen
 */

import { useState, useCallback } from 'react';

interface UseCopyToClipboardResult {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
  error: string | null;
}

/**
 * Hook tekstin kopioimiseen leikepöydälle
 */
export function useCopyToClipboard(): UseCopyToClipboardResult {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        setError('Leikepöytä ei ole tuettu tässä selaimessa');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setError(null);

        // Nollaa kopioitu-tila 2 sekunnin kuluttua
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);

        return true;
      } catch (err) {
        setError('Kopiointi epäonnistui');
        console.error('Failed to copy:', err);
        return false;
      }
    },
    []
  );

  return { isCopied, copyToClipboard, error };
}
