import { useState } from 'react';
import classNames from 'classnames';
import { Alert, AlertVariant, ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@leanstacks/react-common';

import TextField from 'common/components/Form/TextField';
import FAIcon from 'common/components/Icon/FAIcon';
import Text from 'common/components/Text/Text';
import useSendOtp from '../api/useSendOtp';
import { useOTPVerify } from '../api/useOtpVerifyMobileNumber';

interface MobileFormValues {
  mobileNumber: string;
}

interface OtpFormValues {
  otp: string;
}

const mobileSchema = object<MobileFormValues>({
  mobileNumber: string()
    .matches(/^[0-9]+$/, 'Must contain only numbers')
    .length(10, 'Must be 10 digits')
    .required('Required')
});

const otpSchema = object<OtpFormValues>({
  otp: string()
    .matches(/^[0-9]+$/, 'Must contain only numbers')
    .length(4, 'Must be 4 digits')
    .required('Required')
});

interface UserVerifyProps extends PropsWithClassName, PropsWithTestId {}

const UserVerify = ({ 
  className, 
  testId = 'form-user-verify' 
}: UserVerifyProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutate: verifyOtp, isPending: isVerifying } = useOTPVerify();

  const handleSendOtp = async (values: MobileFormValues) => {
    try {
      setError('');
      await sendOtp(
        { mobileNumber: values.mobileNumber },
        {
          onSuccess: () => {
            setMobileNumber(values.mobileNumber);
            setShowOtpField(true);
          },
          onError: (error: Error) => {
            setError(error.message);
          }
        }
      );
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (values: OtpFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setError('');
      await verifyOtp(
        { 
          mobileNumber,
          otp: values.otp 
        },
        {
          onSuccess: () => {
            setIsVerified(true);
            setSubmitting(false);
          },
          onError: (error: Error) => {
            setError(error.message || 'OTP verification failed. Please try again.');
            setSubmitting(false);
          }
        }
      );
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  const handleSkipPasswordChange = () => {
    // Navigate to dashboard or home page when user skips password change
    navigate('/dashboard');
  };

  const handleChangePassword = () => {
    // Navigate to change password page
    navigate('/app/change-password', { state: { mobileNumber } });
  };

  const renderPasswordChangeOptions = () => (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Verification Successful!</h2>
      <p className="mb-6">Would you like to change your password?</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleChangePassword}
          className="w-full sm:w-40"
          testId={`${testId}-button-change-password`}
        >
          Change Password
        </Button>
        <Button
          variant={ButtonVariant.Outline}
          onClick={handleSkipPasswordChange}
          className="w-full sm:w-40"
          testId={`${testId}-button-skip`}
        >
          Skip for Now
        </Button>
      </div>
    </div>
  );

  const renderMobileForm = () => (
    <Formik<MobileFormValues>
      initialValues={{ mobileNumber: '' }}
      validationSchema={mobileSchema}
      onSubmit={handleSendOtp}
    >
      {({ dirty, isSubmitting }) => (
        <Form data-testid={`${testId}-mobile-form`}>
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            className="mb-4"
            autoComplete="tel"
            maxLength={10}
            disabled={isSubmitting || isSendingOtp}
            testId={`${testId}-text-field-mobile`}
            placeholder="Enter 10-digit mobile number"
          />
          <div className="flex">
            <Button
              type="submit"
              className="w-full sm:w-40"
              disabled={!dirty || isSubmitting || isSendingOtp}
              testId={`${testId}-button-send-otp`}
            >
              {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  const renderOtpForm = () => (
    <Formik<OtpFormValues>
      initialValues={{ otp: '' }}
      validationSchema={otpSchema}
      onSubmit={handleVerifyOtp}
    >
      {({ dirty, isSubmitting }) => (
        <Form data-testid={`${testId}-otp-form`}>
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            className="mb-4"
            value={mobileNumber}
            disabled
            testId={`${testId}-text-field-mobile-disabled`}
          />
          <TextField
            name="otp"
            label="Enter OTP"
            className="mb-4"
            autoComplete="one-time-code"
            maxLength={6}
            disabled={isSubmitting}
            testId={`${testId}-text-field-otp`}
            placeholder="Enter 4-digit OTP"
          />
          <div className="flex items-center">
            <Button
              type="submit"
              className="w-full sm:w-40"
              disabled={isSubmitting || isVerifying || !dirty}
              testId={`${testId}-button-verify`}
            >
              {isSubmitting || isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Button>
            <Text className="ml-4">
              Didn't receive OTP?{' '}
              <button
                type="button"
                className="text-blue-500 decoration-blue-500 underline hover:text-blue-700 hover:decoration-blue-700"
                onClick={() => handleSendOtp({ mobileNumber })}
                disabled={isSendingOtp}
              >
                {isSendingOtp ? 'Sending...' : 'Resend OTP'}
              </button>
            </Text>
          </div>
        </Form>
      )}
    </Formik>
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

      {isVerified ? (
        renderPasswordChangeOptions()
      ) : showOtpField ? (
        renderOtpForm()
      ) : (
        <>
          {renderMobileForm()}
          <Text className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink 
              to="/auth/signin" 
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Sign In
            </NavLink>
          </Text>
        </>
      )}
    </div>
  );
};

export default UserVerify;
