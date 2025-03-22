import Page from 'common/components/Page/Page';
import SignupForm from './components/SignupForm';
import { usePage } from 'common/hooks/usePage';
import { useEffect } from 'react';

/**
 * The `SignupPage` component renders the content for a user authentication
 * page.
 * @returns {JSX.Element} JSX
 */
const SignupPage = (): JSX.Element => {
  const { setPageTitle } = usePage();
  useEffect(() => {
    // This will be called once when the component mounts
    setPageTitle("Sign Up");

    // Optional cleanup function (not needed in this case)
  }, [setPageTitle]);

  return (
    <Page testId="page-signin">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-6">
          <SignupForm />
        </div>
      </div>
    </Page>
  );
};

export default SignupPage;
