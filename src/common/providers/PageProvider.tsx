import { PropsWithChildren, useState } from 'react';

import { PageContext, PageContextValue } from './PageContext';
import { useGetUserTokens } from 'common/api/useGetUserTokens';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';

/**
 * The `AuthContextProvider` React component creates, maintains, and provides
 * access to the `AuthContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const PageContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [pageTitle, setPageTitle] = useState<string>("");

  const value: PageContextValue = {
    pageTitle,
    setPageTitle
  };

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
