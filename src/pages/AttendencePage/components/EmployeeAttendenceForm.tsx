import { FC, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Alert, AlertVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import AttendenceForm from './AttendenceForm';
import { useGetUseRoles } from 'common/api/useGetUseRoles';
import { usePage } from 'common/hooks/usePage';

interface EmployeeAttendenceFormProps extends PropsWithClassName, PropsWithTestId { }

const EmployeeAttendenceForm: FC<EmployeeAttendenceFormProps> = ({
  className,
  testId = 'employee-attendance-form'
}) => {

  const { setPageTitle } = usePage();
  useEffect(() => {
    // This will be called once when the component mounts
    setPageTitle("Attendence");

    // Optional cleanup function (not needed in this case)
  }, [setPageTitle]);
  const { data: user, isLoading } = useGetCurrentUser();
  const [searchParams] = useSearchParams();
  const machineId = searchParams.get('machineId');

  const roles = useGetUseRoles();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if not an employee
  console.log('roles', roles.data);
  if (!roles.data?.find(role => role == 'EMPLOYEE' || role == 'MERCHANT')) {
    return <Navigate to="/app/attendence" replace />;
  }

  // Check for required parameters
  if (!machineId || !user?.id) {
    return (
      <div className="p-4">
        <Alert
          variant={AlertVariant.Error}
          className="mb-4"
          testId={`${testId}-error`}
        >
          <div className="flex flex-col gap-2">
            <p className="font-medium">Missing Required Parameters</p>
            <ul className="list-disc list-inside text-sm">
              {!machineId && <li>Machine ID is required</li>}
              {!user?.id && <li>Employee ID is required</li>}
            </ul>
            <p className="text-sm mt-2">
              Please ensure you have selected a machine and are properly logged in.
            </p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className={className} data-testid={testId}>
      <AttendenceForm machineId={+machineId} employeeId={user.id} />
    </div>
  );
};

export default EmployeeAttendenceForm;