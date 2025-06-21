import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextField from 'common/components/Form/TextField';
import Button from 'common/components/Button/Button';
import { ButtonVariant } from '@leanstacks/react-common';
import { useResetPassword } from '../api/useResetPassword';
import { useToasts } from 'common/hooks/useToasts';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';

// Validation schema for the change password form
const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

interface ChangePasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface LocationState {
  userId?: number;
}

/**
 * ChangePasswordForm component for handling password changes
 * @returns {JSX.Element} The rendered form component
 */
const ChangePasswordForm = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createToast } = useToasts();
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  
  // Get userId from location state or from current user
  const locationState = location.state as LocationState | undefined;
  const userId = locationState?.userId || currentUser?.id;

  const initialValues: ChangePasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    if (!userId) {
      createToast({
        text: 'User not found. Please log in again.',
        isAutoDismiss: true
      });
      return;
    }

    try {
      resetPassword({
        userId,
        password: values.newPassword
      });
    } catch (error) {
      console.error('Error changing password:', error);
      createToast({
        text: 'Failed to change password. Please try again.',
        isAutoDismiss: true
      });
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">Change Password</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid }) => (
          <Form className="space-y-4">
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              required
            />
            
            <TextField
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              required
            />
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant={ButtonVariant.Outline}
                onClick={() => navigate('/app')}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={ButtonVariant.Solid}
                disabled={!dirty || !isValid || isResetting}
              >
                {isResetting ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
