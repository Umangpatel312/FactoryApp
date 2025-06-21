import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import { NavLink } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';

import TextField from 'common/components/Form/TextField';
import Text from 'common/components/Text/Text';
import { useOTPVerify } from '../api/useOtpVerify';

interface OtpFormValues {
  otp: string;
}

interface OtpFormProps extends PropsWithClassName, PropsWithTestId {
  userId: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const otpSchema = object<OtpFormValues>({
  otp: string()
    .matches(/[0-9]/, 'Must have a number.')
    .required('Required.')
});

const OtpForm = ({ 
  className, 
  testId = 'form-otp',
  userId,
  onSuccess,
  onError 
}: OtpFormProps): JSX.Element => {
  const { mutate: verifyOtp } = useOTPVerify();

  return (
    <div className={className} data-testid={testId}>
      <Formik<OtpFormValues>
        initialValues={{ otp: '' }}
        validationSchema={otpSchema}
        onSubmit={(values, { setSubmitting }) => {
          verifyOtp(
            { userId, otp: values.otp },
            {
              onSuccess: () => {
                setSubmitting(false);
                onSuccess();
              },
              onError: (err: Error) => {
                onError(err.message);
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({ dirty, isSubmitting }) => (
          <Form id='otp-form' data-testid={`${testId}-form`}>
            <TextField
              id='otp'
              name='otp'
              label='OTP'
              className='mb-4'
              autoComplete='off'
              maxLength={4}
              disabled={isSubmitting}
              testId={`${testId}-text-field-otp`}
            />
            <div className='flex'>
              <Button
                type='submit'
                className="w-full sm:w-40"
                disabled={isSubmitting || !dirty}
                testId={`${testId}-button-submit`}
              >
                {isSubmitting ? 'Verifying...' : 'Submit'}
              </Button>
              <Text className='mt-2 ml-2'>
                Don't have an account yet?
                <NavLink
                  to='/auth/signin'
                  className='ml-2 text-blue-500 decoration-blue-500 underline hover:text-blue-700 hover:decoration-blue-700'
                >
                  Sign In
                </NavLink>
              </Text>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpForm;
