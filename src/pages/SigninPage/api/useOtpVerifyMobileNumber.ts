import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserTokens } from 'common/api/useGetUserTokens';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys, StorageKeys } from 'common/utils/constants';
import storage from 'common/utils/storage';
import { getJwtClaims } from 'pages/SigninPage/api/getJwtClaims';
import { SignInResponsePayload } from 'pages/SigninPage/api/useSignin';

interface ErrorObject {
  errorMsg: string;
  uri: string;
  status: string;
}

interface ErrorResponse {
  errorObject?: ErrorObject[];
  message?: string;
}

interface ApiResponse<T> extends AxiosResponse<T & ErrorResponse> {}

/**
 * The OTP verification request payload
 */
export type OtpVerifyRequestPayload = {
  mobileNumber: string;
  otp: string;
};

/**
 * An API hook which performs OTP verification for mobile number.
 * @returns Returns a `UseMutationResult` with verification result.
 */
export const useOTPVerify = () => {
  const axios = useAxios();
  const config = useConfig();
  const queryClient = useQueryClient();

  /**
   * Attempts to verify OTP for a mobile number.
   * @param payload - The OTP verification payload
   * @returns Returns a Promise which resolves to a success message if successful,
   * otherwise throws an Error.
   */
  const otpVerify = async (payload: OtpVerifyRequestPayload): Promise<string> => {
    try {
      const response = await axios.request<SignInResponsePayload & ErrorResponse>({
        url: `${config.VITE_BASE_URL_API}/auth/verify-otp/mobileNumber`,
        method: 'post',
        data: payload,
        validateStatus: (status) => status === 200 || status === 422
      });

      // Handle successful verification (status 200)
      if (response.status === 200 && response.data.message === 'User is verified successfully!') {
        const data = response.data.data;
        if (!data) {
          throw new Error('Invalid response data');
        }

        // Store user data in local storage
        storage.setItem(StorageKeys.User, JSON.stringify(data.user));

        // Store authentication tokens
        const tokens: UserTokens = {
          access_token: data.token,
          id_token: data.token,
          refresh_token: data.token,
          token_type: 'bearer',
          expires_in: data.expires_in,
          expires_at: data.expires_at,
        };
        storage.setItem(StorageKeys.UserTokens, JSON.stringify(tokens));

        // Store user roles if available
        const decodedClaims = getJwtClaims(data.token);
        if (decodedClaims?.roles) {
          storage.setItem(StorageKeys.UserRoles, JSON.stringify(decodedClaims.roles));
        }

        return response.data.message || 'Verification successful';
      } 
      // Handle validation errors (status 422)
      else if (response.status === 422) {
        const errorMessage = response.data?.errorObject?.[0]?.errorMsg || 'OTP verification failed';
        throw new Error(errorMessage);
      } 
      // Handle other error cases
      else {
        throw new Error('OTP verification failed. Please try again.');
      }
    } catch (error) {
      // Handle Axios errors
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.errorObject?.[0]?.errorMsg) {
        throw new Error(axiosError.response.data.errorObject[0].errorMsg);
      }
      // Re-throw the error if it's already an Error, otherwise create a new one
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  };

  return useMutation({
    mutationFn: otpVerify,
    onSuccess: () => {
      // Invalidate relevant queries on successful verification
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserTokens] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, 'current'] });
    },
  });
};

