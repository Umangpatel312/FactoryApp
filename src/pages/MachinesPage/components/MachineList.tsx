import { useParams } from 'react-router-dom';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import { useGetMachines } from '../api/useGetMachines';
import MachineListItem from './MachineListItem';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import { useGetCurrentUser } from 'common/api/useGetUserRoles';

/**
 * Properties for the `UserList` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface UserListProps extends PropsWithClassName, PropsWithTestId { }

/**
 * The `UserList` React component renders a list of `User` objects with the
 * `UserListItem` component.
 * @param {UserListProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const MachineList = ({ className, testId = 'list-users' }: UserListProps): JSX.Element => {
  const { machineId } = useParams();
  const { data: user } = useGetCurrentUser();
  const { data: machines, error, isPending } = useGetMachines(user?.id);
  console.log("machines list comp", machines, isPending, error);
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
      {machines &&
        machines.map((machine) => (
          <MachineListItem
            key={machine.id}
            machine={machine}
            isActive={machine.id == Number(machineId)}
            testId={`list-item-user-${machine.id}`}
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

export default MachineList;
