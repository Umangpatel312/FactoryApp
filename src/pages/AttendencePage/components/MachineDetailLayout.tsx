import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Outlet, useParams } from 'react-router-dom';

import { useGetMachine } from 'common/api/useGetMachine';
import Text from 'common/components/Text/Text';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import Avatar from 'common/components/Icon/Avatar';
import FAIcon from 'common/components/Icon/FAIcon';
import MachineForm from './AttendenceOfEmployeeForm';

/**
 * Properties for the `UserDetailLayout` React component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface MachineDetailLayoutProps extends PropsWithClassName, PropsWithTestId { }

/**
 * The `UserDetailLayout` component renders a layout for the display of
 * the detailed attributes of a `User` object.
 * @param {MachineDetailLayoutProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const MachineDetailLayout = ({
  className,
  testId = 'layout-user-detail',
}: MachineDetailLayoutProps): JSX.Element => {
  const { machineId } = useParams();
  const { data: machine, error, isPending } = useGetMachine({ machineId: Number(machineId) });

  return (
    <div className={className} data-testid={testId}>
      {/* {isPending && (
        <>
          <LoaderSkeleton className="mb-8 h-8 w-64" />
          <div className="mb-3 flex flex-wrap gap-4">
            <LoaderSkeleton className="mb-2 h-3 w-32" />
            <LoaderSkeleton className="mb-2 h-3 w-32" />
            <LoaderSkeleton className="mb-2 h-3 w-32" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <LoaderSkeleton className="mb-2 h-24 w-64" />
            <LoaderSkeleton className="mb-2 h-24 w-64" />
          </div>
        </>
      )} */}
      {!!machine && (
        <div data-testid={`${testId}-user`}>
          {/* <MachineForm /> */}
          <Outlet />
        </div>
      )}
      {!!error && (
        <div className="text-red-600" data-testid={`${testId}-error`}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default MachineDetailLayout;
