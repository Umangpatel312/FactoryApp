import Page from 'common/components/Page/Page';
import SigninForm from './components/SigninForm';
import { usePage } from 'common/hooks/usePage';
import { useEffect } from 'react';

/**
 * The `SigninPage` component renders the content for a user authentication
 * page.
 * @returns {JSX.Element} JSX
 */
const SigninPage = (): JSX.Element => {
  const { setPageTitle } = usePage();
  useEffect(() => {
    // This will be called once when the component mounts
    setPageTitle("Sign In");

    // Optional cleanup function (not needed in this case)
  }, [setPageTitle]);

  return (
    <Page testId="page-signin">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-6">
          <SigninForm />
        </div>
      </div>
    </Page>
  );
};

export default SigninPage;
