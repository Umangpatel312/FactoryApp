import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Alert, AlertVariant, ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string, number } from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';
import TextField from 'common/components/Form/TextField';
import FAIcon from 'common/components/Icon/FAIcon';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import { useCreateAttendence } from '../api/useCreateAttendence';
import SelectField from 'common/components/Form/SelectField';
import { useGetEmployees } from 'pages/EmployeesPage/api/useGetEmployees';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { useGetMachines } from 'pages/MachinesPage/api/useGetMachines';
import { useGetMachine } from 'common/api/useGetMachine';

interface AttendenceFormProps extends PropsWithClassName, PropsWithTestId {
  machineId?: number;
  employeeId?: number;
}

export type Attendance = {
  id?: number | undefined;
  attendanceDate: string;
  production: number;
  frames: number;
  dhaga: number;
  userId: number;
  userName?: string;
  shiftId: number;
  shiftName?: string;
  salaryTypeId: number;
  salaryType?: string;
  machineId: number;
  machineName?: string;
};

const validationSchema = object<Attendance>({
  userId: number()
    .required('Please select an employee')
    .min(1, 'Please select an employee'),
  attendanceDate: string().required('Required.'),
  production: number().required('Required.').min(0, 'Must be greater than or equal to 0'),
  frames: number().required('Required.').min(0, 'Must be greater than or equal to 0'),
  dhaga: number().required('Required.').min(0, 'Must be greater than or equal to 0'),
  shiftId: number().required('Required.'),
  salaryTypeId: number().required('Required.'),
  machineId: number().required('Required.'),
});

const AttendenceForm = ({ className, testId = 'form-attendance', machineId, employeeId }: AttendenceFormProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { mutate: createAttendence } = useCreateAttendence();
  const { data: user } = useGetCurrentUser();

  const initialValues: Attendance = {
    attendanceDate: new Date().toISOString().split('T')[0],
    production: 0,
    frames: 0,
    dhaga: 0,
    userId: employeeId || 0,
    shiftId: 0,
    salaryTypeId: 0,
    machineId: machineId || 0,
    id: 0
  };

  const handleSubmit = (values: Attendance, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setError('');
    
    if (!selectedFile) {
      setError('Please select an image before submitting');
      setSubmitting(false);
      return;
    }
    
    const submissionValues = {
      ...values,
      attendanceDate: new Date(values.attendanceDate).getTime() / 1000
    };
    
    createAttendence(
      {
        attendence: submissionValues,
        file: selectedFile
      },
      {
        onSuccess: () => {
          setSubmitting(false);
          if (machineId && employeeId) {
            navigate("/app");
          }
          else {

            navigate(-1);
          }
        },
        onError: (err: Error) => {
          setError(err.message);
          setSubmitting(false);
        },
      }
    );
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for the captured image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);



  const { data: employeeData, isLoading: isEmployeesLoading } = employeeId
    ? useGetCurrentUser()
    : useGetEmployees(user?.id);


  // const employeeOptions = useMemo(() =>
  //   employees?.map(employee => ({
  //     value: String(employee.id),
  //     label: employee.name
  //   })) ?? [],
  //   [employees]
  // );

  const {
    data: machines,
    isLoading: isMachinesLoading
  } = machineId
      ? useGetMachine({ machineId })
      : useGetMachines(user?.id);

  // Filter employee options if employeeId is provided
  const employeeOptions = useMemo(() => {
    if (!employeeData) return [];

    // Handle single employee response from useGetEmployeeById
    if ('id' in employeeData) {
      return [{
        value: String(employeeData.id),
        label: employeeData.name
      }];
    }

    // Handle array response from useGetEmployees
    return employeeData.map(emp => ({
      value: String(emp.id),
      label: emp.name
    }));
  }, [employeeData]);

  const machineOptions = useMemo(() => {
    if (!machines) return [];

    // Handle single machine response
    if ('id' in machines) {
      return [{
        value: String(machines.id),
        label: machines.name
      }];
    }

    // Handle array response
    return machines.map(machine => ({
      value: String(machine.id),
      label: machine.name
    }));
  }, [machines]);

  // Replace the existing file input with this camera capture section
  const renderImageCapture = () => (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Capture Image
      </label>
      <div className="flex flex-col items-center space-y-4">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-48 w-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                setSelectedFile(null);
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <FAIcon icon="time" size="sm" />
            </button>
          </div>
        ) : (
          <div
            className="h-48 w-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <FAIcon icon="camera" size="2x" className="text-gray-400 mb-2" />
              <div className="text-sm text-gray-500">Click to capture</div>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment" // This forces the camera to open directly
          className="hidden"
          onChange={handleCapture}
        />
      </div>
    </div>
  );

  return (
    <div className={classNames('lg:w-2/3 xl:w-1/2 border p-4 rounded-md shadow-md', className)} data-testid={testId}>
      {error && (
        <Alert
          variant={AlertVariant.Error}
          className="mb-4 flex items-center gap-2 rounded-none"
          testId={`${testId}-alert`}
        >
          <FAIcon icon="circleExclamation" size="lg" />
          {error}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isSubmitting, setFieldValue, values }) => (

          <Form data-testid={`${testId}-form`} className="space-y-4">
            {/* Change to single column layout with responsive width */}
            <div className="max-w-xl mx-auto space-y-4">
              <SelectField
                name="userId" // Changed from employeeId to userId to match Attendance type
                label="Employee"
                disabled={isSubmitting || isEmployeesLoading || !!employeeId}
                testId={`${testId}-select-field-employee`}
                className="w-full"
                options={employeeOptions}
                supportingText={isEmployeesLoading ? "Loading employees..." : undefined}
                value={String(employeeId || values.userId)}
                onChange={(value) => {
                  setFieldValue('userId', Number(value));
                }}
              />
              <SelectField
                name="machineId"
                label="Machine"
                disabled={isSubmitting || isMachinesLoading || !!machineId}
                testId={`${testId}-select-field-machine`}
                className="w-full"
                options={machineOptions}
                supportingText={isMachinesLoading ? "Loading machines..." : undefined}
                value={String(machineId || values.machineId)}
                onChange={(value) => {
                  setFieldValue('machineId', Number(value));
                }}
              />
              <TextField
                type="date"
                name="attendanceDate"
                label="Attendance Date"
                value={values.attendanceDate || ''}
                onChange={(e) => {
                  setFieldValue('attendanceDate', e.target.value);
                }}
                autoComplete="off"
                max={new Date().toISOString().split('T')[0]} // Prevent future dates
                testId={`${testId}-text-field-date`}
                className="w-full"
              />
              <SelectField
                name="shiftId"
                label="Select Shift"
                options={[
                  { value: '1', label: 'Morning Shift' },
                  { value: '2', label: 'Evening Shift' }
                ]}
                supportingText="Please select your preferred shift"
                value={String(values.shiftId)}
                onChange={(value) => {
                  setFieldValue('shiftId', Number(value));
                }}
              />
              <TextField
                type="number"
                name="production"
                label="Production"
                autoComplete="off"
                disabled={isSubmitting}
                testId={`${testId}-text-field-production`}
                className="w-full"
              />
              <TextField
                type="number"
                name="frames"
                label="Frame"
                autoComplete="off"
                disabled={isSubmitting}
                testId={`${testId}-text-field-frame`}
                className="w-full"
              />
              <TextField
                type="number"
                name="dhaga"
                label="Dhaga"
                autoComplete="off"
                disabled={isSubmitting}
                testId={`${testId}-text-field-dhaga`}
                className="w-full"
              />

              {/* Replace the old file input with the new camera capture component */}
              {renderImageCapture()}
              
              {/* File selection error message */}
              {error && !selectedFile && (
                <div className="mt-2 text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Buttons at the bottom */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button
                type="button"
                onClick={() => {
                  if (machineId && employeeId) {
                    navigate("/app");
                  }
                  else {

                    navigate(-1);
                  }
                }}
                className="w-full sm:w-40"
                variant={ButtonVariant.Text}
                testId={`${testId}-button-cancel`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={ButtonVariant.Text}
                className="w-full sm:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={isSubmitting || !dirty}
                testId={`${testId}-button-submit`}
              >
                Save
              </Button>
            </div>
          </Form>

          // ...existing code...
        )}
      </Formik>
    </div>
  );
};

export default AttendenceForm;