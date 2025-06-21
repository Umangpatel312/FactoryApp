import { useParams } from 'react-router-dom';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import { useGetEmployees } from '../api/useGetEmployees';
import EmployeeListItem from './EmployeeListItem';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';

/**
 * Properties for the `UserList` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface EmployeeListProps extends PropsWithClassName, PropsWithTestId { }

/**
 * The `UserList` React component renders a list of `User` objects with the
 * `UserListItem` component.
 * @param {EmployeeListProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const EmployeeList = ({ className, testId = 'list-users' }: EmployeeListProps): JSX.Element => {
  const { employeeId } = useParams();
  const { data: user } = useGetCurrentUser();

  const { data: employees, error, isPending } = useGetEmployees(user?.id);

  return (
    <div
      className={classNames('flex h-full flex-col overflow-y-auto', className)}
      data-testid={testId}
    >
      {isPending && (
        <>
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
        </>
      )}
      {employees &&
        employees.map((user) => (
          <EmployeeListItem
            key={user.id}
            employee={user}
            isActive={user.id === Number(employeeId)}
            testId={`list-item-user-${user.id}`}
          />
        ))}
      {!!error && (
        <div className="text-red-600" data-testid={`${testId}-error`}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
