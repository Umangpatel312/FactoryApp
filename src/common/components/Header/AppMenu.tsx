import { useAuth } from 'common/hooks/useAuth';
import { useGetCurrentUser } from 'common/api/useGetUserRoles';

import logo from './logo.png';
import SideMenu, { SideMenuProps } from 'common/components/Menu/SideMenu/SideMenu';
import MenuNavLink from 'common/components/Menu/MenuNavLink';
import Avatar from 'common/components/Icon/Avatar';
import MenuSeparator from 'common/components/Menu/MenuSeparator';

/**
 * Properties fro the `AppMenu` component.
 * @see {@see SideMenuProps}
 */
interface AppMenuProps extends Omit<SideMenuProps, 'headerContent'> { }

/**
 * The `AppMenu` component a `SideMenu` which contains application menu
 * items. The `AppMenu` is typically rendered at small media breakpoints.
 * @param {AppMenuProps} props - Component properties, `AppMenuProps`.
 * @returns {JSX.Element} JSX
 */
const AppMenu = ({ side = 'right', testId = 'menu-app', ...props }: AppMenuProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { data: user } = useGetCurrentUser();

  const renderHeader = () => {
    if (isAuthenticated && user) {
      return (
        <div className="flex items-center">
          <Avatar value={user.name} className="me-2 rounded-full" />
          <div className="text-sm">{user.name}</div>
        </div>
      );
    } else {
      return <img src={logo} alt="Logo" height="32" width="32" />;
    }
  };

  return (
    <SideMenu side={side} testId={testId} headerContent={renderHeader()} {...props}>
      {isAuthenticated ? (
        <>
          <MenuNavLink to="/auth/signout" title="Sign Out" icon="rightFromBracket">
            Sign Out
          </MenuNavLink>
          <MenuSeparator />
          {/* <MenuNavLink to="/app/settings" title="Settings" icon="sliders">
            Settings
          </MenuNavLink>
          <MenuNavLink to="/app/components" title="Components" icon="puzzlePiece">
            Components
          </MenuNavLink>
          <MenuNavLink to="/app/users" title="Users" icon="users">
            Users
          </MenuNavLink> */}
          <MenuNavLink to="/app/machines" title="Users" icon="gears">
            Machines
          </MenuNavLink>
          <MenuNavLink to="/app/employees" title="Users" icon="users">
            Employees
          </MenuNavLink>
          <MenuNavLink to="/app/attendence" title="Users" icon="penToSquare">
            Attendence
          </MenuNavLink>
          <MenuNavLink to="/app/salary" title="Salary" icon="handHoldingDollar">
            Salary
          </MenuNavLink>
          <MenuNavLink to="/app/billing" title="Users" icon="moneyBill">
            Billing
          </MenuNavLink>
          <MenuNavLink to="/app/admin/userAccess" title="Users" icon="universalAccess">
            User Access
          </MenuNavLink>
          <MenuNavLink to="/app/admin/paymentHistory" title="Users" icon="fileInvoice">
            Payment History
          </MenuNavLink>
        </>
      ) : (
        <>
          <MenuNavLink to="/auth/signin" title="Sign In" icon="rightToBracket">
            Sign In
          </MenuNavLink>
          <MenuNavLink to="/auth/signin" title="Sign Up" className="text-xs">
            Need an account? Sign Up
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/app/components" title="Components" icon="puzzlePiece">
            Components
          </MenuNavLink>
        </>
      )}
    </SideMenu>
  );
};

export default AppMenu;
