import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Employee } from 'common/api/useGetEmployee';

/**
 * Properties for the `UserListItem` component.
 * @param {User} user - A `User` object.
 * @param {boolean} [isActive] - Optional. Indicates if this is the currently
 * selected item in the list. Default: `false`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface EmployeeListItemProps extends PropsWithClassName, PropsWithTestId {
  employee: Employee;
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
    navigate(`${employee.id}?tab=1`);
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
      <div className="flex min-w-0 flex-col">
        <div className="truncate">{employee.name}</div>
        {/* <div className="truncate text-xs opacity-75">{employee.email}</div> */}
      </div>
    </div>
  );
};

export default EmployeeListItem;
