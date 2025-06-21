import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';

interface ErrorObject {
  errorMsg: string;
  uri: string;
  status: string;
}

interface ApiErrorResponse {
  errorObject?: ErrorObject[];
  message?: string;
};

type ApiError = AxiosError<ApiErrorResponse>;

/**
 * The `useSendOtp` mutation function variables.
 */
export type SendOtpRequestPayload = {
  mobileNumber: string;
};

export type SendOtpResponsePayloadData = {
  message: string;
  success: boolean;
};

export type SendOtpResponsePayload = {
  data: SendOtpResponsePayloadData;
  message: string;
};

/**
 * An API hook which sends OTP to the provided mobile number.
 * @returns Returns a `UseMutationResult` with the OTP response data.
 */
export const useSendOtp = () => {
  const axios = useAxios();
  const config = useConfig();

  /**
   * Sends OTP to the provided mobile number.
   * @param mobileNumber - The mobile number to send OTP to.
   * @returns Returns a Promise which resolves to the OTP response if successful,
   * otherwise throws an Error.
   */
  const sendOtp = async ({ mobileNumber }: SendOtpRequestPayload): Promise<SendOtpResponsePayloadData> => {
    try {
      const response = await axios.request<SendOtpResponsePayload>({
        url: `${config.VITE_BASE_URL_API}/auth/user/${mobileNumber}/resend-otp`,
        method: 'get',
        validateStatus: (status) => status === 200 // Only consider 200 as success
      });
      
      return response.data.data;
    } catch (error) {
      const axiosError = error as ApiError;
      
      if (axiosError.response?.status === 422) {
        const errorData = axiosError.response.data as { errorObject?: ErrorObject[] };
        if (errorData?.errorObject?.[0]?.errorMsg) {
          throw new Error(errorData.errorObject[0].errorMsg);
        }
        throw new Error('Validation failed');
      }
      
      // For other errors, use the error message from the response or a default message
      const errorData = axiosError.response?.data as { message?: string } | undefined;
      throw new Error(errorData?.message || axiosError.message || 'Failed to send OTP');
    }
  };

  return useMutation<SendOtpResponsePayloadData, Error, SendOtpRequestPayload>({
    mutationFn: sendOtp,
    onError: (error) => {
      console.error('Failed to send OTP:', error);
    },
  });
};

export default useSendOtp;
