import { useState } from 'react';
import classNames from 'classnames';
import { Alert, AlertVariant, ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { FieldArray, Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';

import { useOTPVerify } from '../api/useOtpVerify';
import TextField from 'common/components/Form/TextField';
import FAIcon from 'common/components/Icon/FAIcon';
import Text from 'common/components/Text/Text';
import { useSignup } from '../api/useSignup';
import AlertWithTimer from 'common/components/Alert/Alert';

/**
 * Properties htmlFor the `SigninForm` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface SignupFormProps extends PropsWithClassName, PropsWithTestId {
}

/**
 * Signin form values.
 */
interface SignUpFormValues {
  name: string;
  mobileNumber: string;
  password: string;
}

interface OtpFormValues {
  otp: string;
}

/**
 * Signin form validation schema.
 */
const validationSchema = object<SignUpFormValues>({
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
    .required('Required.')
});


const otpSchema = object<OtpFormValues>({
  otp: string()
    .matches(/[0-9]/, 'Must have a number. ')
    // .matches(/[a-z]/, 'Must have a lowercase letter. ')
    // .matches(/[A-Z]/, 'Must have an uppercase letter. ')
    // .matches(/[$*.[{}()?"!@#%&/,><':;|_~`^\]\\]/, 'Must have a special character. ')
    // .min(12, 'Must have at least 12 characters. ')
    .required('Required. '),
  userId: number()
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
  const { signup } = useSignup();
  const { mutate: otpVerify } = useOTPVerify();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number>(0);
  const [message, setMessage] = useState<string>('');


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
      {
        message && (
          <AlertWithTimer variant={AlertVariant.Success} onClose={() => setMessage('')} icon='circleExclamation' size='lg' message={message} />
        )
      }
      {
        isOtpSent ?
          <Formik<OtpFormValues>
            key="otp-form"
            initialValues={{ otp: '' }}
            validationSchema={otpSchema}
            onSubmit={(values, { setSubmitting }) => {
              setError('');
              otpVerify({
                userId,
                otp: values.otp
              }, {
                onSuccess: () => {
                  setSubmitting(false);
                  navigate('/');
                },
                onError: (err: Error) => {
                  setError(err.message);
                  setSubmitting(false);
                },
              });
            }}
          >
            {({ dirty, isSubmitting }) => (
              <Form id='otp-form' data-testid={`${testId}-form-signup`}>
                <TextField
                  id='otp'
                  name="otp"
                  label="OTP"
                  className="mb-4"
                  autoComplete="off"
                  maxLength={4}
                  disabled={isSubmitting}
                  testId={`${testId}-text-field-otp`}

                />
                <div className='flex'>
                  <Button
                    type="submit"
                    className="w-full sm:w-40"
                    disabled={isSubmitting || !dirty}
                    testId={`${testId}-button-submit`}
                  >
                    Submit
                  </Button>
                  <Text className='mt-2 ml-2'>Dont have an account yet?
                    <NavLink to="/auth/signin" className="ml-2 text-blue-500 decoration-blue-500 underline hover:text-blue-700 hover:decoration-blue-700">Sign In</NavLink>
                  </Text>
                </div>

              </Form>
            )}
          </Formik>
          :
          <Formik<SignUpFormValues>
            key="signup-form"
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
                  console.log('OTP Verified:', result);
                  setUserId(result.data.id);
                  setIsOtpSent(true);
                  setMessage(result.message);
                }
              } catch (error) {
                console.error('OTP Verification Failed:', error);
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
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  className="mb-4"
                  autoComplete="off"
                  maxLength={30}
                  disabled={isSubmitting}
                  testId={`${testId}-text-field-password`}
                />
                <div className='flex'>
                  <Button
                    type="submit"
                    className="w-full sm:w-40"
                    disabled={isSubmitting || !dirty}
                    testId={`${testId}-button-submit`}
                  >
                    Register
                  </Button>
                  <Text className='mt-2 ml-2'>Dont have an account yet?
                    <NavLink to="/auth/signin" className="ml-2 text-blue-500 decoration-blue-500 underline hover:text-blue-700 hover:decoration-blue-700">Sign In</NavLink>
                    {/* <a href="blank" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { navigate("/auth/signup") }}>Sign up</a> */}
                  </Text>
                </div>

              </Form>
            )}
          </Formik>
      }

    </div>
  );
};

export default SignupForm;
