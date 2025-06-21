import { useAuth } from 'common/hooks/useAuth';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';

import logo from './logo.png';
import SideMenu, { SideMenuProps } from 'common/components/Menu/SideMenu/SideMenu';
import MenuNavLink from 'common/components/Menu/MenuNavLink';
import Avatar from 'common/components/Icon/Avatar';
import MenuSeparator from 'common/components/Menu/MenuSeparator';

import { ROLES } from 'common/utils/role';
import { useGetUseRoles } from 'common/api/useGetUseRoles';

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

  const { data: userRoles = [] } = useGetUseRoles();

  const hasRole = (roles: string[]) => {
    return roles.some(role => userRoles.includes(role));
  };

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
          <MenuNavLink to="/app" icon="puzzlePiece">
            Dashboard
          </MenuNavLink>

          {/* Admin Menu Items */}
          {hasRole([ROLES.ADMIN]) && (
            <>
              <MenuNavLink to="/app/admin/users" icon="users">
                User Management
              </MenuNavLink>
              <MenuNavLink to="/app/admin/userAccess" title="Users" icon="universalAccess">
                User Access
              </MenuNavLink>
            </>
          )}

          {/* Merchant Menu Items */}
          {hasRole([ROLES.MERCHANT, ROLES.ADMIN]) && (
            <>
              <MenuNavLink to="/app/merchant/machines" icon="gears">
                Machines
              </MenuNavLink>
              <MenuNavLink to="/app/merchant/employees" title="Users" icon="users">
                Employees
              </MenuNavLink>
              <MenuNavLink to="/app/merchant/attendence" title="Users" icon="penToSquare">
                Attendence
              </MenuNavLink>
              <MenuNavLink to="/app/merchant/salary" title="Salary" icon="handHoldingDollar">
                Salary
              </MenuNavLink>
            </>
          )}

          {/* Employee Menu Items */}
          {hasRole([ROLES.EMPLOYEE, ROLES.ADMIN]) && (
            <>
              <MenuNavLink to="/app/employee/attendence" icon="calendar">
                Attendance
              </MenuNavLink>
              <MenuNavLink to="/app/employee/salary" title="Salary" icon="handHoldingDollar">
                Salary
              </MenuNavLink>
            </>
          )}

          {/* Common Menu Items */}
          {/* <MenuNavLink to="/app/profile" icon="user">
            Profile
          </MenuNavLink> */}
          <MenuNavLink to="/auth/signout" title="Sign Out" icon="rightFromBracket">
            Sign Out
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
          {/* <MenuSeparator /> */}
      
        </>
      )}
    </SideMenu>
  );
};

export default AppMenu;
