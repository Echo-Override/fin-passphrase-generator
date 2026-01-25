/**
 * Header-komponentti sovelluksen otsikolla
 */

import React from 'react';
import { Shield } from 'lucide-react';
import { UI_TEXT } from '../utils/constants';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {UI_TEXT.APP_TITLE}
          </h1>
        </div>
      </div>
    </header>
  );
};
