import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { User } from 'common/api/useGetUser';
import Avatar from 'common/components/Icon/Avatar';

/**
 * Properties for the `UserListItem` component.
 * @param {User} user - A `User` object.
 * @param {boolean} [isActive] - Optional. Indicates if this is the currently
 * selected item in the list. Default: `false`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface EmployeeListItemProps extends PropsWithClassName, PropsWithTestId {
  employee: User;
  isActive?: boolean;
}

/**
 * The `UserListItem` React component renders select `User` attributes to
 * create a selectable item within a list.
 *
 * When clicked, navigates to a route which displays the details of the
 * clicked `User`.
 * @param {EmployeeListItemProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const EmployeeListItem = ({
  className,
  isActive = false,
  testId = 'list-item-user',
  employee,
}: EmployeeListItemProps): JSX.Element => {
  const navigate = useNavigate();

  const doClick = () => {
    navigate(`edit/${employee.id}`);
  };

  return (
    <div
      className={classNames(
        'flex min-h-16 items-center border-b-2 px-2 py-1.5 hover:cursor-pointer hover:border-b-blue-300 hover:dark:border-b-blue-600',
        { 'border-b-neutral-500/10': !isActive },
        { 'border-b-blue-300 dark:border-b-blue-600': isActive },
        className,
      )}
      onClick={() => doClick()}
      data-testid={testId}
    >
      <div className="flex items-center">
        <Avatar value={employee.name} className="me-2 rounded-full" />
        <div className="text-sm">{employee.name}</div>
      </div>
      {/* <div className="flex min-w-0 flex-col">
        <div className="truncate">{employee.name}</div>
      </div> */}
    </div>
  );
};

export default EmployeeListItem;
