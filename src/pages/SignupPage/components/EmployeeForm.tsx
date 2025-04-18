import { useState } from 'react';
import classNames from 'classnames';
import { Alert, AlertVariant, ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { FieldArray, Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';
import TextField from 'common/components/Form/TextField';
import FAIcon from 'common/components/Icon/FAIcon';
import AlertWithTimer from 'common/components/Alert/Alert';
import { useGetCurrentUser } from 'common/api/useGetUserRoles';
import { EmployeeRequestPayload, useCreateEmployee } from '../api/useCreateEmployee';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import { useGetEmployee } from 'common/api/useGetEmployee';
import { useUpdateEmployee } from '../api/useUpdateEmployee';

/**
 * Properties htmlFor the `SigninForm` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface SignupFormProps extends PropsWithClassName, PropsWithTestId {
}


interface SignUpFormOfEmployeeValues {
  name: string;
  mobileNumber: string;
  password: string;
  salaries: Record<string, number>;
  managerId?: number;
}



const validationOfEmployeeSchema = object<SignUpFormOfEmployeeValues>({
  password: string()
    // .matches(/[0-9]/, 'Must have a number. ')
    // .matches(/[a-z]/, 'Must have a lowercase letter. ')
    // .matches(/[A-Z]/, 'Must have an uppercase letter. ')
    // .matches(/[$*.[{}()?"!@#%&/,><':;|_~`^\]\\]/, 'Must have a special character. ')
    // .min(12, 'Must have at least 12 characters. ')
    .required('Required. '),
  name: string().required('Required.'),
  mobileNumber: string()
    .matches(/[0-9]/, 'Must have a number. ')
    .min(10, 'Must have at least 10 characters. ')
    .max(10, 'Must have at least 10 characters. ')
    .required('Required.'),
  salaries: object().shape({
    oneMachineSalary: number().required('Required.'),
    twoMachineSalary: number().required('Required.'),
  }),
});

const updateValidationOfEmployeeSchema = object<SignUpFormOfEmployeeValues>({
  name: string().required('Required.'),
  mobileNumber: string()
    .matches(/[0-9]/, 'Must have a number. ')
    .min(10, 'Must have at least 10 characters. ')
    .max(10, 'Must have at least 10 characters. ')
    .required('Required.'),
  salaries: object().shape({
    oneMachineSalary: number().required('Required.'),
    twoMachineSalary: number().required('Required.'),
  }),
});



/**
 * The `SigninForm` component renders a form htmlFor user authentication.
 *
 * Upon successful authentication, navigates the user to the authenticated
 * landing page of the application.
 *
 * Upon error, displays messages.
 *
 * @param {SignupFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const EmployeeForm = ({ className, testId = 'form-signup' }: SignupFormProps): JSX.Element => {
  const { employeeId } = useParams();
  const employeeIdNumber = employeeId ? parseInt(employeeId, 10) : undefined;

  const [error, setError] = useState<string>('');

  const { mutate: createEmployee } = useCreateEmployee();
  const { mutate: updateEmployee } = useUpdateEmployee();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>('');
  const { data: currentUser } = useGetCurrentUser();

  const { data: employee, isLoading } = useGetEmployee({ employeeId: employeeIdNumber });


  console.log("employee: ", employee);

  const handleSubmit = (values: EmployeeRequestPayload, { setSubmitting }: {
    setSubmitting: (isSubmitting: boolean) => void
  }) => {
    console.log("handleSubmit: ", values);
    setError('');
    const mutationFn =
      employeeId ? updateEmployee :
        createEmployee;
    mutationFn({ ...values, managerId: currentUser?.id }, {
      onSuccess: () => {
        setSubmitting(false);
        navigate(-1);
      },
      onError: (err: Error) => {
        setError(err.message);
        setSubmitting(false);
      },
    });
  };

  return (
    <>
      {isLoading ? (<> <LoaderSkeleton /> </>) :
        (<div className={classNames('lg:w-2/3 xl:w-1/2 border p-4 rounded-md shadow-md', className)} data-testid={testId}>
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
          {
            message && (
              <AlertWithTimer variant={AlertVariant.Success} onClose={() => setMessage('')} icon='circleExclamation' size='lg' message={message} />
            )
          }

          <Formik<EmployeeRequestPayload>
            key="employee-form"
            initialValues={employee ? employee : {
              id: 0,
              name: '', mobileNumber: '', password: '',
              salaries: { oneMachineSalary: 0, twoMachineSalary: 0 }, managerId: currentUser?.id
            }}
            validationSchema={employeeId ? updateValidationOfEmployeeSchema : validationOfEmployeeSchema}
            onSubmit={handleSubmit}
          >
            {({ dirty, isSubmitting, values }) => (
              <Form data-testid={`${testId}-form`}>
                <TextField
                  name="name"
                  label="Name"
                  className="mb-4"
                  autoComplete="off"
                  maxLength={10}
                  disabled={isSubmitting}
                  testId={`${testId}-text-field-username`}
                />
                <TextField
                  name="mobileNumber"
                  label="Mobile Number"
                  className="mb-4"
                  autoComplete="off"
                  maxLength={10}
                  disabled={isSubmitting}
                  testId={`${testId}-text-field-mobileNumber`}
                />
                {
                  employeeId ? null : (<TextField
                    type="password"
                    name="password"
                    label="Password"
                    className="mb-4"
                    autoComplete="off"
                    maxLength={30}
                    disabled={isSubmitting}
                    testId={`${testId}-text-field-password`}
                  />)
                }

                <FieldArray name="salaries">
                  {() => (
                    <>
                      {Object.keys(values.salaries).map((key) => (
                        <TextField
                          key={key}
                          type="number"
                          name={`salaries.${key}`}
                          label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          className="mb-4"
                          autoComplete="off"
                          maxLength={30}
                          disabled={isSubmitting}
                          testId={`${testId}-text-field-${key}`}
                        />
                      ))}
                    </>
                  )}
                </FieldArray>
                <div >
                  <Button
                    type="submit"
                    variant={ButtonVariant.Text}
                    className="w-full sm:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-2"
                    disabled={isSubmitting || !dirty}
                    testId={`${testId}-button-submit`}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full sm:w-40"
                    // disabled={isSubmitting || !dirty}
                    testId={`${testId}-button-submit`}
                  >
                    Cancel
                  </Button>
                </div>

              </Form>
            )}
          </Formik>

        </div>)
      }
    </>

  );
};

export default EmployeeForm;
