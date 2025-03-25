import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserTokens } from 'common/api/useGetUserTokens';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys, StorageKeys } from 'common/utils/constants';
import storage from 'common/utils/storage';
import { getJwtClaims } from 'pages/SigninPage/api/getJwtClaims';
import { SignInResponsePayload } from 'pages/SigninPage/api/useSignin';


/**
 * The `useDeleteTask` mutation function variables.
 */
export type OtpVerifyReqestPayload = {
  userId: number;
  otp: string
};

/**
 * An API hook which performs user authentication.
 * @returns Returns a `UseMutationResult` with `User` data.
 */
export const useOTPVerify = () => {
  const axios = useAxios();
  const config = useConfig();
  const queryClient = useQueryClient();


  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */
  const otpVerify = async (otpVerifyReqestPayload: OtpVerifyReqestPayload): Promise<string> => {
    console.log(otpVerifyReqestPayload);
    // fetch all users
    const response = await axios.request<SignInResponsePayload>({
      url: `${config.VITE_BASE_URL_API}/auth/verify-otp`,
      method: 'post',
      data: otpVerifyReqestPayload
    });
    console.log(response);
    if (response.data.message === 'User is verified successfully!') {
      // store current user in localstorage
      const data = response.data.data;

      storage.setItem(StorageKeys.User, JSON.stringify(data.user));

      // simlate the creation of authentication tokens
      // const expires_at = dayjs().add(1, 'hour').toISOString();
      const tokens: UserTokens = {
        access_token: data.token,
        id_token: data.token,
        refresh_token: data.token,
        token_type: 'bearer',
        expires_in: data.expires_in,
        expires_at: data.expires_at,
      };
      storage.setItem(StorageKeys.UserTokens, JSON.stringify(tokens));

      const decodedClaims = getJwtClaims(data.token);

      storage.setItem(StorageKeys.UserRoles, JSON.stringify(decodedClaims?.roles));

      return response.data.message;
    } else {
      console.error(response.data.message);
      throw new Error('OTP verification failed');
    }
  };

  return useMutation({
    mutationFn: otpVerify,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserTokens] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, 'current'] });
    },
  });
};
