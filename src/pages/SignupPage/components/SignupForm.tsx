import { useState } from 'react';
import classNames from 'classnames';
import { Alert, AlertVariant, Button, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';

import TextField from 'common/components/Form/TextField';
import FAIcon from 'common/components/Icon/FAIcon';
import Text from 'common/components/Text/Text';
import { useSignup } from '../api/useSignup';
import AlertWithTimer from 'common/components/Alert/Alert';
import OtpForm from './OtpForm';

/**
 * Properties htmlFor the `SigninForm` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface SignupFormProps extends PropsWithClassName, PropsWithTestId {}

/**
 * Signin form values.
 */
interface SignUpFormValues {
  name: string;
  mobileNumber: string;
  password: string;
}

/**
 * Signin form validation schema.
 */
const validationSchema = object<SignUpFormValues>({
  password: string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required'),
  name: string().required('Required.'),
  mobileNumber: string()
    .matches(/[0-9]/, 'Must have a number.')
    .min(10, 'Must have at least 10 characters.')
    .max(10, 'Must have at most 10 characters.')
    .required('Required.')
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
const SignupForm = ({ className, testId = 'form-signup' }: SignupFormProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const { signup } = useSignup();
  const navigate = useNavigate();

  const handleOtpSuccess = () => {
    navigate('/');
  };

  const handleOtpError = (error: string) => {
    setError(error);
  };


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
      {message && (
        <AlertWithTimer
          variant={AlertVariant.Success}
          onClose={() => setMessage('')}
          icon='circleExclamation'
          size='lg'
          message={message}
        />
      )}
      {isOtpSent ? (
        <OtpForm
          userId={userId}
          onSuccess={handleOtpSuccess}
          onError={handleOtpError}
          testId={`${testId}-otp`}
        />
      ) : (
        <Formik<SignUpFormValues>
          initialValues={{ name: '', mobileNumber: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError('');
            try {
              const result = await signup({
                mobileNumber: values.mobileNumber,
                name: values.name,
                password: values.password
              });
              if (result.message === 'User registered successfully!') {
                setUserId(result.data.id);
                setIsOtpSent(true);
                setMessage(result.message);
              }
            } catch (error) {
              console.error('Registration Failed:', error);
              setError('Registration failed. Please try again.');
            }
            setSubmitting(false);
          }}
        >
          {({ dirty, isSubmitting }) => (
            <Form data-testid={`${testId}-form`}>
              <TextField
                name="name"
                label="Name"
                className="mb-4"
                autoComplete="off"
                maxLength={50}
                disabled={isSubmitting}
                testId={`${testId}-text-field-name`}
              />
              <TextField
                name="mobileNumber"
                label="Mobile Number"
                className="mb-4"
                autoComplete="off"
                maxLength={10}
                disabled={isSubmitting}
                testId={`${testId}-text-field-mobile`}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                className="mb-4"
                autoComplete="new-password"
                disabled={isSubmitting}
                testId={`${testId}-text-field-password`}
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-40"
                  disabled={isSubmitting || !dirty}
                  testId={`${testId}-button-submit`}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
                
                <Text className="text-center sm:text-left text-sm sm:text-base">
                  Already have an account?{" "}
                  <NavLink 
                    to="/auth/signin" 
                    className="text-blue-500 hover:text-blue-700 underline decoration-blue-500 hover:decoration-blue-700"
                  >
                    Sign In
                  </NavLink>
                </Text>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SignupForm;
