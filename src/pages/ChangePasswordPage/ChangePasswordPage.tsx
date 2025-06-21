import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Page from 'common/components/Page/Page';
import { usePage } from 'common/hooks/usePage';
import ChangePasswordForm from './components/ChangePasswordForm.tsx';
import Button from 'common/components/Button/Button';
import { ButtonVariant } from '@leanstacks/react-common';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * The `ChangePasswordPage` component renders the layout for the change password page.
 * It displays a form for changing the user's password.
 * @returns {JSX.Element} JSX
 */
const ChangePasswordPage = (): JSX.Element => {
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const navigate = useNavigate();

  const { setPageTitle } = usePage();
  useEffect(() => {
    setPageTitle("Change Password");
  }, [setPageTitle]);

  return (
    <Page testId="page-change-password">
      <div className="container mx-auto my-4 min-h-[50vh]">
        <div className="my-6 md:hidden">
          {isMobile && location.pathname.includes("edit") ? (
            <Outlet />
          ) : (
            <>
              <ChangePasswordForm />
              <div className="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full uppercase leading-normal text-white !border-blue-600 !bg-blue-600 !text-white">
                <Button
                  variant={ButtonVariant.Text}
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  className="cursor-pointer rounded-full p-5"
                  onClick={() => navigate("edit")}
                >
                  Edit
                  {/* <FAIcon icon="pen-to-square" /> */}
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="my-6 hidden grid-cols-1 gap-8 md:grid md:grid-cols-3">
          <div className="md:col-span-1">
            <ChangePasswordForm />
          </div>
          <div className="md:col-span-2">
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ChangePasswordPage;
