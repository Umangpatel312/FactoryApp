import { Outlet } from 'react-router-dom';

import Page from 'common/components/Page/Page';
import Text from 'common/components/Text/Text';
import UserList from './components/UserList';
import Tabs from 'common/components/Tabs/Tabs';

/**
 * The `UsersPage` component renders the layout for the users page. It
 * displays a list of selectable users. Renders the details of a selected
 * `User`.
 * @returns {JSX.Element} JSX
 */
const UsersPage = (): JSX.Element => {
  return (
    <Page testId="page-users">
      <div className="container mx-auto my-4 min-h-[50vh]">
        <Text variant="heading1" className="mb-4 border-b border-neutral-500/50 pb-2">
          Users
        </Text>

        <div className="my-6 md:hidden">
          <Tabs
            tabs={[
              { label: 'Users', testId: 'tab-user-list' },
              { label: 'Detail', testId: 'tab-user-detail' },
            ]}
            tabContents={[{ children: <UserList /> }, { children: <Outlet />, className: 'my-6' }]}
            variant="fullWidth"
          />
        </div>

        <div className="my-6 hidden grid-cols-1 gap-8 md:grid md:grid-cols-4">
          <div>
            <UserList />
          </div>
          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default UsersPage;
