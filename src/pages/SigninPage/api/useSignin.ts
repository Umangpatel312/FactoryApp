import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import find from 'lodash/find';

import { User } from 'common/api/useGetUser';
import { UserTokens } from 'common/api/useGetUserTokens';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import storage from 'common/utils/storage';
import { QueryKeys, StorageKeys } from 'common/utils/constants';
import { useUserRoles } from './useUserRole';
import { getJwtClaims } from './getJwtClaims';

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

  const { fetchAndCacheUserRoles } = useUserRoles();   // ✅ Use the hook


  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */

  const signin = async (signInRequestPayload: SignInReqestPayload): Promise<User> => {
    // REPLACE: This is a contrived "signin" approach for demonstration purposes.
    //          You should implement authentication functionality in accordance
    //          with your IdP.

    // fetch all users
    // TODO: login api changes
    const response = await axios.request<SignInResponsePayload>({
      url: `${config.VITE_BASE_URL_API}/auth/login`,
      method: 'post',
      data: signInRequestPayload
    });
    console.log(response);
    // if user matching 'username' is found, consider the user to be authenticated.
    const data = response.data.data;
    console.log(data.user);

    if (data) {
      // store current user in localstorage
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

      return data.user;
    } else {
      throw new Error('Authentication failed.');
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
