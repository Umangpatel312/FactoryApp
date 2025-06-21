import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';
import { useSignout } from 'pages/SignoutPage/api/useSignout';

/**
 * The `useResetPassword` mutation function variables.
 */
export type ResetPasswordRequestPayload = {
  userId: number;
  password: string;
};

/**
 * An API hook which handles password reset.
 * @returns Returns a `UseMutationResult` with success/failure status.
 */
export const useResetPassword = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const config = useConfig();
  const queryClient = useQueryClient();
  const { mutate: signout } = useSignout();

  /**
   * Attempts to reset user's password.
   * @param payload - The reset password request payload
   * @returns Returns a Promise which resolves to success/failure status.
   */
  const resetPassword = async (payload: ResetPasswordRequestPayload): Promise<boolean> => {
    try {
      await axios.request({
        url: `${config.VITE_BASE_URL_API}/v1/users/reset-password`,
        method: 'post',
        data: payload
      });
      
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  return useMutation({
    mutationFn: (payload: ResetPasswordRequestPayload) => resetPassword(payload),
    onSuccess: () => {
      // Invalidate any relevant queries
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users] });
      
      // Sign out the user to clear all authentication data
      signout(undefined, {
        onSuccess: () => {
          // Navigate to signin page after successful sign out
          navigate('/signin', { 
            state: { 
              message: 'Password reset successfully. Please login with your new password.' 
            } 
          });
        }
      });
    },
  });
};
