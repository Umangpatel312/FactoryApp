import { useContext } from 'react';

import { PageContext, PageContextValue } from 'common/providers/PageContext';

/**
 * The `useAuth` hook returns the current `AuthContext` value.
 * @returns {AuthContextValue} The current `AuthContext` value, `AuthContextValue`.
 */
export const usePage = (): PageContextValue => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('useSettings hook must be used within a SettingsContextProvider');
  }

  return context;
};
