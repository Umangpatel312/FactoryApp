import { createContext } from 'react';
import { QueryObserverBaseResult } from '@tanstack/react-query';

import { UserTokens } from 'common/api/useGetUserTokens';

/**
 * The `value` provided by the `PageContext`.
 */
export interface PageContextValue {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

/**
 * The default/initial `PageContext` value.
 */
const DEFAULT_CONTEXT_VALUE: PageContextValue = {
  pageTitle: '',
  setPageTitle: () => { }
};

/**
 * The `PageContext` instance.
 */
export const PageContext = createContext<PageContextValue | undefined>(DEFAULT_CONTEXT_VALUE);
