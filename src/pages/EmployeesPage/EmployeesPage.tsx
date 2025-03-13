import { Outlet } from 'react-router-dom';

import Page from 'common/components/Page/Page';
import Text from 'common/components/Text/Text';
import EmployeeList from './components/EmployeeList';
import Tabs from 'common/components/Tabs/Tabs';
import { usePage } from 'common/hooks/usePage';
import { useEffect } from 'react';

/**
 * The `EmployeesPage` component renders the layout for the users page. It
 * displays a list of selectable users. Renders the details of a selected
 * `User`.
 * @returns {JSX.Element} JSX
 */
const EmployeesPage = (): JSX.Element => {
  const { setPageTitle } = usePage();
  useEffect(() => {
    // This will be called once when the component mounts
    setPageTitle("Employees");

    // Optional cleanup function (not needed in this case)
  }, [setPageTitle]);
  return (
    <Page testId="page-users">
      <div className="container mx-auto my-4 min-h-[50vh]">

        <div className="my-6 md:hidden">
          <Tabs
            tabs={[
              { label: 'Employees', testId: 'tab-user-list' },
              { label: 'Detail', testId: 'tab-user-detail' },
            ]}
            tabContents={[{ children: <EmployeeList /> }, { children: <Outlet />, className: 'my-6' }]}
            variant="fullWidth"
          />
        </div>

        <div className="my-6 hidden grid-cols-1 gap-8 md:grid md:grid-cols-4">
          <div>
            <EmployeeList />
          </div>
          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EmployeesPage;
