import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Page from 'common/components/Page/Page';
import MachineList from './components/MachineList';
import Tabs from 'common/components/Tabs/Tabs';
import { usePage } from 'common/hooks/usePage';
import { useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import FAIcon from 'common/components/Icon/FAIcon';
import Button from 'common/components/Button/Button';
import { ButtonVariant } from '@leanstacks/react-common';


/**
 * The `UsersPage` component renders the layout for the users page. It
 * displays a list of selectable users. Renders the details of a selected
 * `User`.
 * @returns {JSX.Element} JSX
 */
const MachinesPage = (): JSX.Element => {
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 }); // Detect mobile view
  const location = useLocation();
  const navigate = useNavigate();


  const { setPageTitle } = usePage();
  useEffect(() => {
    // This will be called once when the component mounts
    setPageTitle("Machines");

    // Optional cleanup function (not needed in this case)
  }, [setPageTitle]);
  return (
    <Page testId="page-users">
      <div className="container mx-auto my-4 min-h-[50vh]">


        <div className="my-6 md:hidden">

          {isMobile && (location.pathname.includes("create") || location.pathname.includes("edit")) ? <Outlet /> :
            <>
              <MachineList />
              <div
                className="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full uppercase leading-normal text-white !border-blue-600 !bg-blue-600 !text-white">
                <Button
                  variant={ButtonVariant.Text}
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  className="cursor-pointer rounded-full p-5"
                  onClick={() => navigate("create")}
                >
                  <FAIcon icon='plus' />
                </Button>

              </div>
            </>
          }

        </div>

        <div className="my-6 hidden grid-cols-1 gap-8 md:grid md:grid-cols-3">
          <div className="md:col-span-1">
            <MachineList />
          </div>
          <div className="md:col-span-2">
            <Outlet />
          </div>
        </div>
      </div>
    </Page >
  );
};

export default MachinesPage;
