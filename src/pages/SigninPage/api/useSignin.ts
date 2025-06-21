import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import find from 'lodash/find';
import { AxiosError } from 'axios';

import { User } from 'common/api/useGetUser';
import { UserTokens } from 'common/api/useGetUserTokens';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import storage from 'common/utils/storage';
import { QueryKeys, StorageKeys } from 'common/utils/constants';
import { useUserRoles } from './useUserRole';
import { getJwtClaims } from './getJwtClaims';

type ApiErrorResponse = {
  errorObject: Array<{
    errorMsg: string;
    uri: string;
    status: string;
  }>;
};

type ApiError = AxiosError<ApiErrorResponse>;

/**
 * The `useDeleteTask` mutation function variables.
 */
export type SignInReqestPayload = {
  userIdentification: string;
  password: string
};

export type SignInResponsePayloadData = {
  user: User;
  token: string;
  expires_in: number;
  expires_at: string;
}

export type SignInResponsePayload = {
  data: SignInResponsePayloadData;
  message: string;
}

/**
 * An API hook which performs user authentication.
 * @returns Returns a `UseMutationResult` with `User` data.
 */

export const useSignin = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  const config = useConfig();


  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */

  const signin = async (signInRequestPayload: SignInReqestPayload): Promise<User> => {
    try {
      const response = await axios.request<SignInResponsePayload>({
        url: `${config.VITE_BASE_URL_API}/auth/login`,
        method: 'post',
        data: signInRequestPayload,
        validateStatus: (status) => status === 200 // Only consider 200 as success
      });
      
      const data = response.data.data;

      // store current user in localstorage
      storage.setItem(StorageKeys.User, JSON.stringify(data.user));

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

      return data.user;
    } catch (error) {
      const axiosError = error as ApiError;
      
      if (axiosError.response?.status === 422 && axiosError.response.data?.errorObject?.length > 0) {
        // Handle 422 validation errors
        const errorMessage = axiosError.response.data.errorObject[0]?.errorMsg || 'Validation failed';
        throw new Error(errorMessage);
      }
      
      // Handle other types of errors
      const errorMessage = axiosError.response?.status === 401 
        ? 'Invalid credentials. Please check your username and password.'
        : axiosError.message || 'An unexpected error occurred during sign in.';
        
      throw new Error(errorMessage);
    }
  };

  return useMutation({
    mutationFn: signin,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserTokens] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, 'current'] });

      // await fetchAndCacheUserRoles();
      // queryClient.setQueryData([QueryKeys.UserRoles], roles);
      // storage.setItem(StorageKeys.UserRoles, JSON.stringify(roles));

    },
  });
};
